use poem::web::{headers::Date, Json};
use crate::Serialize;
struct Blog {
    id: i32,
    title: String,
    tips: String,
    airtcle: String,
    time: Date
}

struct ReqBlog {
    id: i32
}

#[derive(Debug, Serialize)]
struct Page{
    start:i32,
    num: i32,
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


pub fn blog_detail(req: Json<ReqBlog>) -> Json<serde_json::Value> {
    Json(serde_json::json! ({
        "code": 0,
        "message": "msg",
    }))
}