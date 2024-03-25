use chrono::{Duration, Utc};
use poem::{handler, web::{Data, Json},Result};
use serde::Deserialize;
use sqlx::PgPool;

use self::claims::Claims;

mod claims;
mod jwt_middleware;

#[derive(Debug, Deserialize)]
struct LoginInfo{
    name: String,
    password: String,
}

#[handler]
fn login(info:Json<LoginInfo>,state: Data<&PgPool>) -> Result<String>{
    Ok(String::from("success"))
}

#[handler]
fn register(info:Json<LoginInfo>,state: Data<&PgPool>) -> Result<String> {
    Ok(String::from("success"))
}

#[handler]
fn refresh_token(token: String) -> poem::Result<String>{
    let mut claims =  claims::decode_jwt(&token).unwrap();
    claims.exp =  (Utc::now() + Duration::try_hours(claims::JWT_EXPIRATION_HOURS).unwrap()).timestamp();
    claims::create_jwt(claims)
}

#[handler]
pub async fn create_token(username: String) -> poem::Result<String> {
    // Create a JWT
    let claims = Claims::new(username);
    claims::create_jwt(claims)
}