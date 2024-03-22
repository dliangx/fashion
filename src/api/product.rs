use poem::{error::BadRequest, handler, web::{Data, Json, Path},Result};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

#[derive(Debug,Serialize, Deserialize,sqlx::FromRow)]
pub struct ProductAttr{
    pub name: String,
    pub value: Vec<String>,
}

#[derive(Debug,Serialize ,Deserialize, sqlx::FromRow)]
pub struct ProductInfo {
    pub product_name: String,
    pub product_id: i32,
    pub pic: String,
    pub category: String,
    pub rating: Option<f32>,
    pub attr: Vec<ProductAttr>,
    pub price: f32,
}


#[derive(Debug,Serialize,Deserialize,sqlx::FromRow)]
struct Category {
    id: i32,
    name: String,
    level: i32,
    parent_id: i32,
}

#[derive(Debug,Serialize)]
struct Detail {
    t: String,
    title: String,
    detail: String,
}

#[derive(Debug,Serialize)]
struct Picture {
    t: i32,
    sort: i32,
    url: String,
}
#[derive(Debug,Serialize)]
struct ProductDetail {
    info: ProductInfo,
    pics: Vec<Picture>,
    details: Vec<Detail>,
}

#[derive(Debug,Serialize, sqlx::FromRow)]
pub struct Collection {
    id: i32,
    name: String,
    pic: String,
    sort: i32,
    // products: Vec<ProductInfo>,
}

#[derive(Debug,Serialize, sqlx::FromRow)]
pub struct Collections {
    id: i32,
    name: String,
    pic: String,
}

#[handler]
pub async fn get_categorys(state:Data<&PgPool>) -> Result<Json<Vec<Category>>>{
    let rows = sqlx::query_as::<_,Category>("select id,parent_id,name,level,nav_status from product_category where status = true")
                                                .fetch_all(state.0)
                                                .await.map_err(BadRequest)?;
 
    Ok(Json(rows))
}

#[handler]
pub fn get_collections(state:Data<&PgPool>,req:Json<i32>) -> Result<Json<Collections>>{
    unimplemented!();
}

#[handler]
pub fn get_collcetion(state:Data<&PgPool>,req:Json<i32>) -> Result<Json<Collection>>{
    unimplemented!();
}

#[handler]
pub fn get_product_by_category(state:Data<&PgPool>,req:Json<Category>) -> Result<Json<ProductInfo>>{
    unimplemented!();
}

#[handler]
pub fn get_product_detail(state:Data<&PgPool>,req:Json<i32>) -> Result<Json<ProductDetail>>{
    unimplemented!()
}


pub fn search_product(){
    
}