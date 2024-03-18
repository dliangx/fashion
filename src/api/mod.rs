use serde::{Deserialize, Serialize};

pub mod order;
pub mod product;
pub mod user;
pub mod content;
pub mod home;

#[derive(Debug, Deserialize)]
struct Page{
    start:i32,
    num: Option<i32>,
    end: Option<i32>,
}

pub fn search(){

}

pub fn get_propular_search(){
    
}