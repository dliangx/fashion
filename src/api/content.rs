use sqlx::PgPool;
use poem::web::Json;
use serde::Serialize;
use sqlx;

#[derive(Debug, sqlx::FromRow)]
pub struct Blog {
    id: i32,
    title: String,
    tips: String,
    airtcle: String,
    time: String
}


#[derive(Debug, Serialize)]
struct Page{
    start:i32,
    num: Option<i32>,
    end: Option<i32>,
}

pub async fn list_blog(pool: PgPool) -> Json<Vec<Blog>> {

    let rows = sqlx::query_as::<_,Blog>("select id,title,tips,airtcle,time from content ")
                                                    .fetch_all(&pool).await;
    
    Json(rows.unwrap())
}


pub async fn blog_detail(pool: PgPool,blog_id:i32) -> Json<Blog> {
    let rows = sqlx::query_as::<_,Blog>("select id,title,tips,airtcle,time from content where id=?")
                                                    .bind(blog_id)
                                                    .fetch_one(&pool).await;
    
    Json(rows.unwrap())
   
}

