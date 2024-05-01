use poem::handler;
use poem::http::StatusCode;
use poem::web::Data;
use poem::web::Json;
use poem::Error;
use poem::Result;
use serde::Deserialize;
use sqlx::PgPool;

#[derive(Deserialize, sqlx::FromRow)]
pub struct UserInfo {
    pub id: i32,
    pub name: String,
    pub password: Option<String>,
    pub email: String,
}

#[handler]
pub async fn submit(state: Data<&PgPool>, user: Json<UserInfo>) -> Result<String> {
    let res = sqlx::query("update \"user\" set email=$1 where username=$2 returning id;")
        .bind(&user.email)
        .bind(&user.name)
        .fetch_one(state.0)
        .await;
    match res {
        Ok(_) => Ok(String::from("success")),
        Err(err) => Err(Error::from_string(err.to_string(), StatusCode::BAD_GATEWAY)),
    }
}
