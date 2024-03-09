
use sqlx::PgPool;
use poem::web::Json;

use super::product::ProductInfo;

struct UserId {
    pub id: i32,
    pub name: Option<String>
}


pub fn home_new(pool: PgPool) -> Json<Vec<ProductInfo>> {
    
}

pub fn home_recommend(req: Json<UserId>) ->  Json<Vec<ProductInfo>> {

}
