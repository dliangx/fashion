use poem::{
    get, handler,
    http::Method,
    middleware::{AddData, Cors},
    post, EndpointExt, Route,
};
use shuttle_poem::ShuttlePoem;
use shuttle_runtime::CustomError;
use sqlx::{Executor, PgPool};
mod api;
mod auth;

#[handler]
async fn hello() -> String {
    "fashion backend".to_string()
}
#[shuttle_runtime::main]
async fn poem(
    #[shuttle_shared_db::Postgres(local_uri = "postgres://liang:postgres@localhost:5432/fashion")]
    pool: PgPool,
) -> ShuttlePoem<impl poem::Endpoint> {
    pool.execute(include_str!("../sql/schema.sql"))
        .await
        .map_err(CustomError::new)?;
    let cors = Cors::default()
        .allow_origin("http://localhost:1420")
        .allow_origin("https://openfashion-web.netlify.app")
        .allow_method(Method::GET)
        .allow_method(Method::POST)
        .allow_credentials(true);

    let api = Route::new()
        .at("/recommend", post(api::home::home_recommend))
        .at("/get_payment_method", post(api::order::get_payment_method))
        .at("/add_payment_method", post(api::order::add_payment_method))
        .at(
            "/get_shipping_address",
            post(api::order::get_shipping_address),
        )
        .at(
            "/add_shipping_address",
            post(api::order::add_shipping_address),
        )
        .at("/create_order", post(api::order::create_order))
        .at("/checkout", post(api::order::checkout))
        .at("/refresh_token", post(auth::refresh_token))
        .at("/submit", post(api::user::submit))
        .with(auth::jwt_middleware::JwtMiddleware);

    let app = Route::new()
        .at("/", get(hello))
        .at("/get_category", get(api::product::get_categorys))
        .at("/home_recommend_product", get(api::home::home_recommend))
        .at("/home_new_product", get(api::home::home_new_product))
        .at("/home_new_collection", get(api::home::home_new_collection))
        .at(
            "/get_collection_by_page",
            post(api::product::get_collection_by_page),
        )
        .at("/get_collection/:id", get(api::product::get_collection))
        .at(
            "/get_product_by_category",
            post(api::product::get_product_by_category),
        )
        .at(
            "/get_product_by_page",
            post(api::product::get_product_by_page),
        )
        .at(
            "/get_product_detail/:id",
            get(api::product::get_product_detail),
        )
        .at("/login", post(auth::login))
        .at("/register", post(auth::register))
        .nest("/api", api)
        .with(cors)
        .with(AddData::new(pool));
    Ok(app.into())
}
