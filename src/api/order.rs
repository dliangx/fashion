use poem::{
    error::BadRequest,
    handler,
    web::{Data, Json},
    Result,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use sqlx::Row;

#[derive(Serialize, Deserialize)]
pub struct Order {
    user_id: i32,
    order_sn: String,
    user_name: String,
    total_amount: f32,
    pay_amount: f32,
    freight_amount: f32,
    pay_type: String,
    source_type: String,
    delivery_sn: String,
    receiver_name: String,
    receiver_zip_code: String,
    receiver_city: String,
    receiver_state: String,
    receiver_address: String,
    receiver_phone: String,
    items: Vec<OrderItem>,
}

#[derive(Serialize, Deserialize)]
pub struct OrderItem {
    order_id: i32,
    order_sn: String,
    product_id: i32,
    product_pic: String,
    product_name: String,
    product_sn: String,
    product_price: f32,
    product_quantity: i32,
    product_sku_id: i32,
    product_category_id: i32,
    product_attr: String,
    sp1: String,
    sp2: String,
    sp3: String,
}

#[derive(Serialize, Deserialize)]
pub struct PayMent {
    order_id: i32,
    order_sn: String,
    amount: f32,
}

#[derive(Serialize, Deserialize)]
struct Address {
    userid: i32,
    first_name: String,
    second_name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
}

#[derive(Serialize, Deserialize)]
struct PaymentCard {
    userid: i32,
    card_name: String,
    card_num: String,
    exp_mon: String,
    exp_date: String,
    cvv: String,
}

#[handler]
pub async fn create_order(items: Json<OrderItem>, state: Data<&PgPool>) -> Result<Json<Order>> {
    unimplemented!()
}

#[handler]
pub async fn checkout(order: Json<Order>, state: Data<&PgPool>) -> Result<Json<PayMent>> {
    let res = sqlx::query("update order set status = 1 where order_sn = ? returning id")
        .bind(&order.order_sn)
        .fetch_one(state.0)
        .await
        .map_err(BadRequest)?;
    Ok(Json(PayMent {
        order_id: res.get(0),
        order_sn: order.order_sn.clone(),
        amount: order.pay_amount,
    }))
}

#[handler]
pub async fn add_shipping_address(
    address: Json<Address>,
    state: Data<&PgPool>,
) -> Result<Json<i32>> {
    let res = sqlx::query("insert into user_recevie_addres (user_id,firse_name,second_name,address,city,state,zip,phone) values ($1,$2,$3,$4,$5,$6,$7,$8,1) returning id")
        .bind(&address.userid)
        .bind(&address.first_name)
        .bind(&address.second_name)
        .bind(&address.address)
        .bind(&address.city)
        .bind(&address.state)
        .bind(&address.zip)
        .bind(&address.phone)
        .fetch_one(state.0)
        .await
        .map_err(BadRequest)?;
    Ok(Json(res.get("id")))
}

#[handler]
pub async fn add_payment_method(
    payment: Json<PaymentCard>,
    state: Data<&PgPool>,
) -> Result<Json<i32>> {
    let res = sqlx::query("insert into user_payment_type (user_id,card_name,card_number,exp_mon,exp_date,cvv,create_date,status ) values ($1,$2,$3,$4,$5,$6,now(),1) returning id")
        .bind(&payment.userid)
        .bind(&payment.card_name)
        .bind(&payment.card_num)
        .bind(&payment.exp_mon)
        .bind(&payment.exp_date)
        .bind(&payment.cvv)
        .fetch_one(state.0)
        .await
        .map_err(BadRequest)?;
    Ok(Json(res.get("id")))
}
