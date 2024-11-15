use poem::{
    get, handler,
    http::Method,
    listener::TcpListener,
    middleware::{AddData, Cors},
    post, EndpointExt, Route, Server,
};

use sqlx::{Executor, PgPool};
mod api;
mod auth;

#[handler]
async fn hello() -> String {
    "fashion backend".to_string()
}

// #[shuttle_runtime::main]
#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let pool = PgPool::connect("postgres://liang:postgres@localhost:5432/fashion")
        .await
        .unwrap();
    pool.execute(include_str!("../sql/schema.sql"))
        .await
        .unwrap();

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
        .at("/get_order_detail", post(api::order::get_order_detail))
        .at("/checkout", post(api::order::checkout))
        .at("/refresh_token", post(auth::refresh_token))
        .at("/submit", post(api::user::submit))
        .with(auth::jwt_middleware::JwtMiddleware);

    let app = Route::new()
        .at("/", get(hello))
        .at("/get_category", get(api::product::get_categorys))
        .at("/home_recommend_product", post(api::home::home_recommend))
        .at("/home_new_product", get(api::home::home_new_product))
        .at("/home_new_collection", get(api::home::home_new_collection))
        .at(
            "/get_collection_by_page",
            post(api::product::get_collection_by_page),
        )
        .at("/get_collection/:id", get(api::product::get_collection))
        .at("/get_product_count", get(api::product::get_product_count))
        .at(
            "/get_product_by_category",
            post(api::product::get_product_by_category),
        )
        .at(
            "/get_product_by_page",
            post(api::product::get_product_by_page),
        )
        .at(
            "get_product_by_search",
            post(api::product::get_product_by_search),
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
    Server::new(TcpListener::bind("0.0.0.0:8000"))
        .run(app)
        .await
}
