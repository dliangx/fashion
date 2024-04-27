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

#[derive(Debug, Serialize, sqlx::FromRow)]
struct Attribute {
    id: i32,
    name: String,
    value: String,
}

#[derive(Debug, Serialize)]
struct ProductDetail {
    info: ProductInfo,
    pics: Vec<Picture>,
    attr: Vec<Attribute>,
    details: Vec<Detail>,
}

#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Collection {
    id: i32,
    name: String,
    pic: String,
}

#[derive(Debug, Serialize)]
pub struct CollectionDetail {
    collection: Collection,
    products: Vec<ProductInfo>,
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
pub async fn get_collection(
    state: Data<&PgPool>,
    Path(id): Path<i32>,
) -> Result<Json<CollectionDetail>> {
    let collction_rows = sqlx::query_as::<_, Collection>(
        "select id, name,pic from collection where status = true  and id = $1",
    )
    .bind(id)
    .fetch_one(state.0)
    .await
    .map_err(BadRequest)?;

    let products_rows = sqlx::query_as::<_, ProductInfo>(
        "SELECT
        A.ID,
       	A.NAME,
       	A.brand,
       	A.preview_pic AS pic,
       	A.product_category_name AS category,
       	A.rating,
       	A.price
                FROM
       	product
       	A LEFT JOIN collection_product b ON A.ID = b.product_id
       	INNER JOIN collection C ON b.collection_id = C.id
                WHERE
       	C.ID = $1",
    )
    .bind(id)
    .fetch_all(state.0)
    .await
    .map_err(BadRequest)?;
    let detail: CollectionDetail = CollectionDetail {
        collection: collction_rows,
        products: products_rows,
    };

    Ok(Json(detail))
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
    let rows = sqlx::query_as::<_, ProductInfo>(
        "
        SELECT
            ID,
           	brand,
           	NAME,
           	preview_pic AS pic,
           	product_category_name AS category,
           	rating,
           	price
        FROM
            product
        ORDER BY
            ID
        LIMIT $2 OFFSET $1; ",
    )
    .bind(req.start.clone())
    .bind(req.num.clone())
    .fetch_all(state.0)
    .await
    .map_err(BadRequest)?;
    Ok(Json(rows))
}

#[handler]
pub async fn get_product_detail(
    state: Data<&PgPool>,
    Path(id): Path<i32>,
) -> Result<Json<ProductDetail>> {
    let info = sqlx::query_as::<_, ProductInfo>(
        "
        SELECT
           	ID,
           	NAME,
           	brand,
           	preview_pic AS pic,
           	product_category_id,
           	product_category_name AS category,
           	rating,
           	price
        FROM
            product
        WHERE
            ID = $1;
        ",
    )
    .bind(id)
    .fetch_one(state.0)
    .await
    .map_err(BadRequest)?;
    let pics = sqlx::query_as::<_, Picture>(
        "
        SELECT
           	A.TYPE AS T,
           	A.sort,
           	A.url
        FROM
           	product_picture
           	A LEFT JOIN product b ON A.product_id = b.ID
        WHERE
           	A.status = TRUE
           	AND b.ID = $1;
        ",
    )
    .bind(id)
    .fetch_all(state.0)
    .await
    .map_err(BadRequest)?;
    let details = sqlx::query_as::<_, Detail>(
        "
        SELECT
           	A.TYPE as t,
           	A.title,
           	A.detail
        FROM
           	product_detail_template
           	A LEFT JOIN product_detail_template_relation b ON A.ID = b.template_id
           	INNER JOIN product C ON b.product_id = C.ID
        WHERE
       	    C.ID = $1;
        ",
    )
    .bind(id)
    .fetch_all(state.0)
    .await
    .map_err(BadRequest)?;

    let attr = sqlx::query_as::<_, Attribute>(
        "
        SELECT
           	e.ID,
           	b.NAME,
           	A.VALUE
        FROM
           	product_attribute_value
           	A LEFT JOIN product_attribute b ON A.product_attribute_id = b.
           	ID RIGHT JOIN product_category_attribute_relation C ON b.ID = C.attribute_id
           	INNER JOIN product_category d ON d.ID = C.category_id
           	LEFT JOIN product e ON d.ID = e.product_category_id
        WHERE
           	e.ID = $1;
        ",
    )
    .bind(id)
    .fetch_all(state.0)
    .await
    .map_err(BadRequest)?;

    Ok(Json(ProductDetail {
        info,
        attr,
        pics,
        details,
    }))
}
