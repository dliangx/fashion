use sqlx::PgPool;
use poem::web::Json;
use serde::{Serialize, Deserialize};
use sqlx;

#[derive(Debug, sqlx::FromRow)]
struct Blog {
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

pub fn list_blog() -> Json<serde_json::Value> {

    Json(serde_json::json! ({
        "id": 0,
        "title": "",
        "tips": "String",
        "airtcle": "String",
        "time": 19870909
    }))
}


pub async fn blog_detail(pool: PgPool,blog_id:i32) -> Json<Vec<Blog>> {
    let rows = sqlx::query_as::<_,Blog>("select id,title,tips,airtcle,time from content where id=?")
                                                    .bind(blog_id)
                                                    .fetch_all(&pool).await;
    
    Json(rows.unwrap())
   
}

