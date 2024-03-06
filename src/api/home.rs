use poem::web::Json;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct BriefProduct {
    product_name: String,
    product_id: i32,
    pic: String,
    category: String,
    price: f32,
}

struct UserId {
    id: Option<i32>,
}

pub fn home_new() -> Json<serde_json::Value> {
    Json(serde_json::json! ({
        "code": 0,
        "message": "msg",
    }))
}

pub fn home_recommend(req: Json<UserId>) -> Json<serde_json::Value> {
    Json(serde_json::json! ({
        "code": 0,
        "message": "msg",
    })) 
}
