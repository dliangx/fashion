
use sqlx::PgPool;
use poem::{error::BadRequest, web::Json};

use super::product::{Collection, ProductInfo};

struct UserId {
    pub id: i32,
    pub name: Option<String>
}

pub async fn home_new_collections(pool: &PgPool)->Json<Vec<Collection>>{
    let rows = sqlx::query_as::<_,Collection>("sql")
                                                    .fetch_all(pool).await.map_err(BadRequest);
    Json(rows.unwrap())

}

// pub fn home_new(pool: PgPool) -> Json<Vec<ProductInfo>> {
     
// }

// pub fn home_recommend(req: Json<UserId>) ->  Json<Vec<ProductInfo>> {

// }
