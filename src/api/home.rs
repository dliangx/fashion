use poem::web::Json;

struct UserId {
    pub id: Option<i32>,
}

pub fn home_new() -> Json<serde_json::Value> {
    Json(serde_json::json! ({
        "product_name": "name", 
        "product_id":1,
        "pic":"",
        "category":"",
        "price":0.00,
    }))
}

pub fn home_recommend(req: Json<UserId>) -> Json<serde_json::Value> {
    Json(serde_json::json! ({
        "product_name": "name", 
        "product_id":1,
        "pic":"",
        "category":"",
        "price":0.00,
    }))
}
