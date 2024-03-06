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

pub fn list_blog() -> Json<serde_json(String)> {

}

pub fn blog_detail(req: Json<ReqBlog>) -> Json<serde_json::Value> {
    
}