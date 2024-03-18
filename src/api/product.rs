use serde::{Deserialize, Serialize};
use sqlx;

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

struct ProductCategory {
    id: i32,
    name: String,
    level: i32,
    sort: i32,
    children: Vec<ProductCategory>,
}

struct Detail {
    t: String,
    title: String,
    detail: String,
}

struct Picture {
    t: i32,
    sort: i32,
    url: String,
}
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

pub fn get_collections(){

}

pub fn get_categorys(){

}

pub fn get_product_by_category(){

}

pub fn get_product_detail(){

}

pub fn search_product(){
    
}