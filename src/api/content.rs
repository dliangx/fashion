use serde::Serialize;
use sqlx::PgPool;
use poem::{handler, web::{Data, Json, Path}};
use sqlx;

use super::Page;

#[derive(Debug,Serialize,sqlx::FromRow)]
pub struct Blog {
    id: i32,
    title: String,
    tips: String,
    airtcle: String,
    time: String
}

#[handler]
pub async fn list_blog(page:Json<Page> ,state:Data<&PgPool>) -> Json<Vec<Blog>> {

    let rows = sqlx::query_as::<_,Blog>("select id,title,tips,airtcle,time from content ")
                                                    .fetch_all(state.0).await;
    
    Json(rows.unwrap())
}

#[handler]
pub async fn blog_detail(Path(id): Path<i32>,state: Data<&PgPool>) -> Json<Blog> {
    let rows = sqlx::query_as::<_,Blog>("select id,title,tips,airtcle,time from content where id=?")
                                                    .bind(id)
                                                    .fetch_one(state.0).await;
    
    Json(rows.unwrap())
   
}

