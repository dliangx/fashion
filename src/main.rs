use poem::{get, handler, middleware::AddData, post, EndpointExt, Route};
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
async fn poem(#[shuttle_shared_db::Postgres] pool: PgPool) -> ShuttlePoem<impl poem::Endpoint> {
    pool.execute(include_str!("../schema.sql"))
        .await
        .map_err(CustomError::new)?;

    let api = Route::new()
        .at("/", get(hello))
        .at("/recommend", post(api::home::home_recommend))
        .at("/submit", post(api::user::submit))
        .at("/get_categorys", post(api::product::get_categorys))
        .at("/get_collcetion", post(api::product::get_collcetion))
        .at("/get_collections", post(api::product::get_collections))
        .at(
            "/get_product_by_category",
            post(api::product::get_product_by_category),
        )
        .at(
            "/get_product_detail",
            post(api::product::get_product_detail),
        )
        .at("/add_payment_method", post(api::order::add_payment_method))
        .at(
            "/add_shipping_address",
            post(api::order::add_shipping_address),
        )
        .at("/create_order", post(api::order::create_order))
        .at("/checkout", post(api::order::checkout))
        .at("/create_token", post(auth::create_token))
        .at("/refresh_token", post(auth::refresh_token))
        .with(auth::jwt_middleware::JwtMiddleware);

    let app = Route::new()
        .at("/home_new_product", get(api::home::home_new_product))
        .at("/new_product", get(api::home::home_new_product))
        .at("/new_collection", get(api::home::home_new_collection))
        .at("/list_blog", get(api::content::list_blog))
        .at("/blog_detail", get(api::content::blog_detail))
        .at("/login", post(auth::login))
        .at("/register", post(auth::register))
        .nest("/api", api)
        .with(AddData::new(pool));
    Ok(app.into())
}
