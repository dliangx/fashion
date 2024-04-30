use poem::handler;
use poem::web::Data;
use poem::web::Json;
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
    let res = sqlx::query("update User set email=? where username=? or id=?")
        .bind(&user.email)
        .bind(&user.name)
        .bind(user.id)
        .fetch_one(state.0)
        .await;
    match res {
        Ok(_) => Ok(String::from("success")),
        Err(err) => {
            println!("err message: {:?}", err);
            Ok(String::from("fail"))
        }
    }
}
