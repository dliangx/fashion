use serde::Deserialize;

pub mod order;
pub mod product;
pub mod user;
pub mod content;
pub mod home;

#[derive(Debug, Deserialize)]
struct Page{
    start:i32,
    num: i32,
}