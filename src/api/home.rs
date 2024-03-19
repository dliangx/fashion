use poem::{
    error::BadRequest,
    handler,
    web::{Data, Json},
    Result,
};
use serde::Deserialize;
use sqlx::{self, PgPool, Row};

use super::product::{Collection, ProductInfo};

#[derive(Debug,Deserialize)]
struct User {
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
                product_name: row.get("product_name"), 
                product_id: row.get("product_id"), 
                pic: row.get("pic"), 
                category: row.get("category"), 
                rating: row.get("rating"), 
                attr: Vec::new(), 
                price: row.get("price") 
            })
            .collect();
    Ok(Json(rows)) 
}

#[handler]
pub async fn home_recommend(req: Json<User>,state: Data<&PgPool>) -> Result<Json<Vec<ProductInfo>> >{
    let rows = sqlx::query("")
    .bind(req.id)
    .bind(req.name.clone())
    .fetch_all(state.0)
    .await
    .map_err(BadRequest)?
    .iter()
    .map(|row| ProductInfo{ 
        product_name: row.get("product_name"), 
        product_id: row.get("product_id"), 
        pic: row.get("pic"), 
        category: row.get("category"), 
        rating: row.get("rating"), 
        attr: Vec::new(), 
        price: row.get("price") 
    })
    .collect();
Ok(Json(rows)) 
}
