use poem::web::{headers::Date, Json};

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

pub fn list_blog() -> Json<serde_json::Value> {
    Json(serde_json::json! ({
        "code": 0,
        "message": "msg",
    }))
}

pub fn blog_detail(req: Json<ReqBlog>) -> Json<serde_json::Value> {
    Json(serde_json::json! ({
        "code": 0,
        "message": "msg",
    }))
}