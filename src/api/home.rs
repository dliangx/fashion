use poem::{
    error::BadRequest,
    handler,
    web::{Data, Json},
    Result,
};
use sqlx;
use sqlx::PgPool;

use super::product::{Collection, ProductInfo};

struct UserId {
    pub id: i32,
    pub name: String,
}

#[handler]
pub async fn home_new_collections(state: Data<&PgPool>) -> Result<Json<Vec<Collection>>> {
    let rows = sqlx::query_as::<_,Collection>("select id,name,pic from collection where status = true and recommend_status = true order by create_time desc limit 3")
                                                    .fetch_all(state.0).await.map_err(BadRequest)?;
    Ok(Json(rows))
}

#[handler]
pub async fn home_new_product(state: Data<&PgPool>) -> Result<Json<Vec<ProductInfo>>> {
    let rows = sqlx::query("")
            .fetch_all(state.0)
            .await
            .map_err(BadRequest)?
            .iter()
            .map(|row| ProductInfo{ 
                product_name: todo!(), 
                product_id: todo!(), 
                pic: todo!(), 
                category: todo!(), 
                rating: todo!(), 
                attr: todo!(), 
                price: todo!() }
            )
            .collect();
    Ok(Json(rows)) 
}

// pub fn home_recommend(req: Json<UserId>) ->  Json<Vec<ProductInfo>> {

// }
