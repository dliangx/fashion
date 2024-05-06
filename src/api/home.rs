use poem::{
    error::BadRequest,
    handler,
    web::{Data, Json},
    Result,
};
use serde::Deserialize;
use sqlx::{self, PgPool, Row};

use super::product::{Collection, ProductInfo};

#[derive(Debug, Deserialize)]
struct User {
    pub name: String,
}

#[handler]
pub async fn home_new_collection(state: Data<&PgPool>) -> Result<Json<Vec<Collection>>> {
    let rows = sqlx::query_as::<_,Collection>("select id,name,pic from collection where status = true and recommend_status = true  order by sort  desc limit 5")
                                                    .fetch_all(state.0).await.map_err(BadRequest)?;
    Ok(Json(rows))
}

#[handler]
pub async fn home_new_product(state: Data<&PgPool>) -> Result<Json<Vec<ProductInfo>>> {
    let rows = sqlx::query("SELECT ID,NAME,brand,preview_pic,product_category_name,price,rating FROM product WHERE new_status=TRUE ORDER BY sort LIMIT 10")
            .fetch_all(state.0)
            .await
            .map_err(BadRequest)?
            .iter()
            .map(|row| ProductInfo{
                name: row.get("name"),
                id: row.get("id"),
                pic: row.get("preview_pic"),
                category: row.get("product_category_name"),
                rating: row.get("rating"),
                brand: row.get("brand"),
                price: row.get("price")
            })
            .collect();
    Ok(Json(rows))
}

#[handler]
pub async fn home_recommend(
    req: Json<User>,
    state: Data<&PgPool>,
) -> Result<Json<Vec<ProductInfo>>> {
    let rows = sqlx::query("SELECT A.product_name AS NAME, B.brand,A.product_id AS ID,b.preview_pic AS pic,b.product_category_name AS category,b.rating,b.price FROM product_recommend A INNER JOIN product b ON A.product_id=b.ID ORDER BY A.sort ASC ")
    .bind(req.name.clone())
    .fetch_all(state.0)
    .await
    .map_err(BadRequest)?
    .iter()
    .map(|row| ProductInfo{
        name: row.get("name"),
        id: row.get("id"),
        pic: row.get("pic"),
        category: row.get("category"),
        rating: row.get("rating"),
        brand: row.get("brand"),
        price: row.get("price")
    })
    .collect();
    Ok(Json(rows))
}
