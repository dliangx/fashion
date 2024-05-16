use serde::Deserialize;

pub mod home;
pub mod order;
pub mod product;
pub mod user;

#[derive(Debug, Deserialize)]
pub struct Page {
    start: i32,
    num: i32,
}

#[derive(Debug, Deserialize)]
pub struct SearchParam {
    search: String,
    page: Page,
}
