use poem::{error::BadGateway, get, middleware::AddData, EndpointExt, Route};
use shuttle_poem::ShuttlePoem;
use shuttle_runtime::CustomError;
use sqlx::{Executor, PgPool};
mod api;
mod auth;

#[shuttle_runtime::main]
async fn poem(#[shuttle_shared_db::Postgres] pool: PgPool) -> ShuttlePoem<impl poem::Endpoint> {
    pool.execute(include_str!("../drop.sql"))
        .await
        .map_err(CustomError::new)?;

    let app = Route::new()
        .at("/list_blog", get(api::content::list_blog))
        .at("/blog/:id", get(api::content::list_blog))
        .with(AddData::new(pool));
    Ok(app.into())
}
