use poem::{
    error::BadRequest,
    handler,
    web::{Data, Json, Path},
    Result,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

use super::Page;

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct ProductAttr {
    pub name: String,
    pub value: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct ProductInfo {
    pub name: String,
    pub id: i32,
    pub brand: String,
    pub pic: String,
    pub category: String,
    pub rating: f32,
    pub price: i32,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
struct Category {
    id: i32,
    name: String,
    level: i32,
    parent_id: i32,
}

#[derive(Debug, Serialize, sqlx::FromRow)]
struct Detail {
    t: String,
    title: String,
    detail: String,
}

#[derive(Debug, Serialize, sqlx::FromRow)]
struct Picture {
    t: i32,
    sort: i32,
    url: String,
}
#[derive(Debug, Serialize)]
struct ProductDetail {
    info: ProductInfo,
    pics: Vec<Picture>,
    details: Vec<Detail>,
}

#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Collection {
    id: i32,
    name: String,
    pic: String,
}

#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Collections {
    id: i32,
    name: String,
    pic: String,
}

#[handler]
pub async fn get_categorys(state: Data<&PgPool>) -> Result<Json<Vec<Category>>> {
    let rows = sqlx::query_as::<_, Category>(
        "select id,parent_id,name,level from product_category where status = true order by id",
    )
    .fetch_all(state.0)
    .await
    .map_err(BadRequest)?;

    Ok(Json(rows))
}

#[handler]
pub async fn get_collection_by_page(
    state: Data<&PgPool>,
    req: Json<Page>,
) -> Result<Json<Vec<Collection>>> {
    let rows = sqlx::query_as::<_, Collection>(
        "select id, name,pic from collection where status = true LIMIT $2 OFFSET $1",
    )
    .bind(req.start.clone())
    .bind(req.num.clone())
    .fetch_all(state.0)
    .await
    .map_err(BadRequest)?;
    Ok(Json(rows))
}

#[handler]
pub async fn get_collcetion(state: Data<&PgPool>, Path(id): Path<i32>) -> Result<Json<Collection>> {
    let rows = sqlx::query_as::<_, Collection>(
        "select id, name,pic from collection where status = true  and id = ?",
    )
    .bind(id)
    .fetch_one(state.0)
    .await
    .map_err(BadRequest)?;
    Ok(Json(rows))
}

#[handler]
pub async fn get_product_by_category(
    state: Data<&PgPool>,
    req: Json<Category>,
) -> Result<Json<Vec<ProductInfo>>> {
    let rows = sqlx::query_as::<_,ProductInfo>("SELECT b.ID,b.brand,b.NAME,b.preview_pic AS pic,b.product_category_name AS category,b.rating,b.price FROM product_category A LEFT JOIN product b ON b.product_category_id=A.ID WHERE b.product_category_name= $1 ")
                                    .bind(req.name.clone())
                                    .fetch_all(state.0)
                                    .await.map_err(BadRequest)?;
    Ok(Json(rows))
}

#[handler]
pub async fn get_product_by_page(
    state: Data<&PgPool>,
    req: Json<Page>,
) -> Result<Json<Vec<ProductInfo>>> {
    let rows = sqlx::query_as::<_,ProductInfo>("SELECT ID,brand,NAME,preview_pic AS pic,product_category_name AS category,rating,price FROM product LIMIT $2 OFFSET $1; ")
                                    .bind(req.start.clone())
                                    .bind(req.num.clone())
                                    .fetch_all(state.0)
                                    .await.map_err(BadRequest)?;
    Ok(Json(rows))
}

#[handler]
pub async fn get_product_detail(
    state: Data<&PgPool>,
    Path(id): Path<i32>,
) -> Result<Json<ProductDetail>> {
    let info = sqlx::query_as::<_,ProductInfo>("SELECT ID,NAME,preview_pic,product_category_id,product_category_name,rating,price  from product_category where id=?")
                            .bind(id)
                            .fetch_one(state.0)
                            .await.map_err(BadRequest)?;
    let pics = sqlx::query_as::<_, Picture>("sql")
        .bind(id)
        .fetch_all(state.0)
        .await
        .map_err(BadRequest)?;
    let details = sqlx::query_as::<_, Detail>("sql")
        .bind(id)
        .fetch_all(state.0)
        .await
        .map_err(BadRequest)?;

    Ok(Json(ProductDetail {
        info,
        pics,
        details,
    }))
}
