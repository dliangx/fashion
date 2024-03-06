use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct ProductInfo {
    pub product_name: String,
    pub product_id: i32,
    pub pic: String,
    pub category: String,
    pub price: f32,
}