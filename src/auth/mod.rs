use chrono::{Duration, Utc};
use poem::{
    error::BadRequest,
    handler,
    http::StatusCode,
    web::{Data, Json},
    Error, Result,
};
use serde::Deserialize;
use sqlx::PgPool;

use crate::api::user::UserInfo;

use self::claims::Claims;

pub mod claims;
pub mod jwt_middleware;

#[derive(Debug, Deserialize)]
struct LoginInfo {
    pub name: String,
    pub password: String,
}

#[handler]
pub async fn login(info: Json<LoginInfo>, state: Data<&PgPool>) -> Result<String> {
    let user: UserInfo =
        sqlx::query_as::<_, UserInfo>("insert username,password from user where username=?")
            .bind(&info.name)
            .bind(&info.password)
            .fetch_one(state.0)
            .await
            .map_err(BadRequest)?;
    if info.password.eq(&user.password.unwrap()) {
        claims::create_jwt(claims::Claims::new(info.name.clone()))
    } else {
        Err(Error::from_string(
            "user don't exist!",
            StatusCode::BAD_REQUEST,
        ))
    }
}

#[handler]
pub async fn register(info: Json<LoginInfo>, state: Data<&PgPool>) -> Result<String> {
    let ids =  sqlx::query("INSERT INTO 'user' ('username', 'password', 'create_time', 'status') VALUES ( ?, ?, now(), TRUE); ")
                    .bind(&info.name)
                    .bind(&info.password)
                    .fetch_one(state.0)
                    .await
                    .map_err(BadRequest);
    match ids {
        Ok(_) => Ok(String::from("success")),
        Err(err) => Err(err),
    }
}

#[handler]
pub fn refresh_token(token: String) -> poem::Result<String> {
    let mut claims = claims::decode_jwt(&token).unwrap();
    claims.exp =
        (Utc::now() + Duration::try_hours(claims::JWT_EXPIRATION_HOURS).unwrap()).timestamp();
    claims::create_jwt(claims)
}

#[handler]
pub async fn create_token(username: String) -> poem::Result<String> {
    // Create a JWT
    let claims = Claims::new(username);
    claims::create_jwt(claims)
}
