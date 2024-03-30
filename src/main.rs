use poem::{get, middleware::AddData, EndpointExt, Route};
use shuttle_poem::ShuttlePoem;
use shuttle_runtime::CustomError;
use sqlx::{Executor, PgPool};
mod api;
mod auth;

#[shuttle_runtime::main]
async fn poem(#[shuttle_shared_db::Postgres] pool: PgPool) -> ShuttlePoem<impl poem::Endpoint> {
    pool.execute(include_str!("../schema.sql"))
        .await
        .map_err(CustomError::new)?;

    let app = Route::new()
        .nest("/home", home_route())
        .with(AddData::new(pool));
    Ok(app.into())
}

fn home_route() -> Route {
    Route::new()
        .at("/new_product", get(api::home::home_new_product))
        .at("/recommend", get(api::home::home_recommend))
        .at("/new_collection", get(api::home::home_new_collection))
}
