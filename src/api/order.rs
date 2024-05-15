use poem::{
    error::{BadRequest, NotFound},
    handler,
    http::StatusCode,
    web::{Data, Json},
    Error, Result,
};
use serde::{Deserialize, Serialize};
use sqlx::Row;
use sqlx::{FromRow, PgPool};

#[derive(Serialize, Deserialize)]
pub struct Order {
    order_sn: String,
    user_name: String,
    total_amount: i64,
    pay_amount: i64,
    freight_amount: i64,
    pay_type: i32,
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

#[derive(Serialize, Deserialize, FromRow)]
pub struct OrderResp {
    order_sn: String,
    total_amount: i64,
    freight_amount: i64,
    source_type: String,
    pay_type: i32,
    delivery_sn: String,
    receiver_name: String,
    receiver_city: String,
    receiver_state: String,
    receiver_address: String,
    receiver_phone: String,
}

#[derive(Serialize, Deserialize, FromRow, Clone)]
pub struct OrderItem {
    order_id: i32,
    order_sn: String,
    product_id: i32,
    product_pic: String,
    product_name: String,
    product_sn: String,
    product_price: i64,
    product_quantity: i32,
    product_sku_id: i32,
    product_category_id: i32,
    product_attr: String,
}
#[derive(Serialize, Deserialize)]
pub struct OrderInfo {
    user_name: String,
    order_sn: String,
}

#[derive(Serialize, Deserialize)]
pub struct PayMent {
    order_id: i32,
    order_sn: String,
}

#[derive(Serialize, Deserialize)]
struct User {
    username: String,
}

#[derive(Serialize, Deserialize, FromRow)]
struct Address {
    username: String,
    first_name: String,
    second_name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
}

#[derive(Serialize, Deserialize, FromRow)]
struct PaymentCard {
    id: i32,
    username: String,
    card_type: i32,
    card_name: String,
    card_num: String,
    exp_mon: String,
    exp_year: String,
    cvv: String,
}

#[handler]
pub async fn create_order(order: Json<Order>, state: Data<&PgPool>) -> Result<Json<PayMent>> {
    let mut transaction = state.0.begin().await.unwrap();
    let insert_order = sqlx::query(
        "insert into \"order\" (order_sn,user_name,total_amount,pay_amount,
        freight_amount,pay_type,source_type,delivery_sn,receiver_name,receiver_zip_code,receiver_city,
        receiver_state,receiver_address,receiver_phone,create_time,order_status,status)
        values (gen_random_uuid(), $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,now(),1,'t') returning id,order_sn ",
    )
    .bind(&order.user_name)
    .bind(order.total_amount)
    .bind(order.pay_amount)
    .bind(order.freight_amount)
    .bind(order.pay_type)
    .bind(&order.source_type)
    .bind(&order.delivery_sn)
    .bind(&order.receiver_name)
    .bind(&order.receiver_zip_code)
    .bind(&order.receiver_city)
    .bind(&order.receiver_state)
    .bind(&order.receiver_address)
    .bind(&order.receiver_phone)
    .fetch_one(&mut *transaction)
    .await;

    match insert_order {
        Ok(it) => {
            let order_id = it.get(0);
            let order_sn = it.get(1);

            let mut sql = "insert into order_item (order_id,order_sn,product_id,product_pic,product_name,product_sn,product_price,product_quantity,product_sku_id,product_category_id,product_attr) values ".to_string();
            let mut values = String::new();
            for item in &order.items {
                values.push_str(&format!(
                    "({}, '{}',{},'{}','{}','{}',{},{},{},{},'{}'),",
                    order_id,
                    order_sn,
                    item.product_id,
                    item.product_pic,
                    item.product_name,
                    item.product_sn,
                    item.product_price,
                    item.product_quantity,
                    item.product_sku_id,
                    item.product_category_id,
                    item.product_attr
                ));
            }
            values.pop();

            sql.push_str(&values);

            let insert_order_item = sqlx::query(&sql)
                .execute(&mut *transaction)
                .await
                .map_err(|e| Error::from_string(e.to_string(), StatusCode::BAD_REQUEST));
            insert_order_item.ok();
            transaction.commit().await.unwrap();
            Ok(Json(PayMent { order_id, order_sn }))
        }
        Err(sqlx::Error::Database(e)) => {
            Err(Error::from_string(e.to_string(), StatusCode::BAD_REQUEST))
        }
        _ => Err(Error::from_string("unknow error", StatusCode::BAD_REQUEST)),
    }
}

#[handler]
pub async fn get_order_detail(order: Json<OrderInfo>, state: Data<&PgPool>) -> Result<Json<Order>> {
    let mut order_itmes: Vec<OrderItem> = Vec::new();

    let mut items = sqlx::query_as::<_,OrderItem> ("select order_id,order_sn,product_id,product_pic,product_name,product_sn,product_price,product_quantity,product_sku_id,product_category_id,product_attr from \"order_item\" where order_sn=$1;")
        .bind(&order.order_sn)
        .fetch_all(state.0)
        .await
        .map_err(|e| Error::from_string(e.to_string(), StatusCode::BAD_REQUEST))?;
    print!("end query order_item ,start quey order");
    let rows =
        sqlx::query("select order_sn,user_name,total_amount,pay_amount,
        freight_amount,pay_type,source_type,delivery_sn,receiver_name,receiver_zip_code,receiver_city,
        receiver_state,receiver_address,receiver_phone from \"order\" where order_sn=$1 and user_name = $2 and status=true;")
            .bind(&order.order_sn)
            .bind(&order.user_name)
            .fetch_one(state.0)
            .await
        .map(|row| {
            for item in items {
                order_itmes.push(item);
            }
            Order{ order_sn: row.get(0),
                user_name: row.get(1),
                total_amount: row.get(2),
                pay_amount: row.get(3),
                freight_amount: row.get(4),
                pay_type: row.get(5),
                source_type: row.get(6),
                delivery_sn: row.get(7),
                receiver_name: row.get(8),
                receiver_zip_code: row.get(9),
                receiver_city: row.get(10),
                receiver_state: row.get(11),
                receiver_address: row.get(12),
                receiver_phone:row.get(13),
             items: order_itmes }

        })
            .map_err(|e| Error::from_string(e.to_string(), StatusCode::BAD_REQUEST))?;

    Ok(Json(rows))
}

#[handler]
pub async fn checkout(order: Json<OrderInfo>, state: Data<&PgPool>) -> Result<Json<PayMent>> {
    let res = sqlx::query(
        "update \"order\" set order_status = 2 where order_sn = $1 and user_name= $2 returning id;",
    )
    .bind(&order.order_sn)
    .bind(&order.user_name)
    .fetch_one(state.0)
    .await
    .map_err(BadRequest)?;
    Ok(Json(PayMent {
        order_id: res.get("id"),
        order_sn: order.order_sn.clone(),
    }))
}

#[handler]
pub async fn get_shipping_address(
    user: Json<User>,
    state: Data<&PgPool>,
) -> Result<Json<Vec<Address>>> {
    let rows =
        sqlx::query_as::<_, Address>("select user_name as username,first_name,second_name,address,city,state,zipcode as zip,phone from user_recevie_address where user_name = $1 and status=true;")
            .bind(&user.username)
            .fetch_all(state.0)
            .await
            .map_err(NotFound)?;
    Ok(Json(rows))
}

#[handler]
pub async fn add_shipping_address(address: Json<Address>, state: Data<&PgPool>) -> Result<String> {
    let res = sqlx::query("insert into user_recevie_address (user_name ,first_name,second_name,address,city,state,zipcode,phone,status) values ($1,$2,$3,$4,$5,$6,$7,$8,true) returning id")
        .bind(&address.username)
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
    let id: i32 = res.get("id");
    println!("id:{}", id);
    Ok(String::from("success"))
}

#[handler]
pub async fn get_payment_method(
    user: Json<User>,
    state: Data<&PgPool>,
) -> Result<Json<Vec<PaymentCard>>> {
    let rows =
        sqlx::query_as::<_, PaymentCard>("select id, user_name as username,card_name,card_number as card_num,exp_mon,exp_year,cvv,card_type from user_payment_type where user_name = $1 and status=true;")
            .bind(&user.username)
            .fetch_all(state.0)
            .await
            .map_err(NotFound)?;
    Ok(Json(rows))
}

#[handler]
pub async fn add_payment_method(
    payment: Json<PaymentCard>,
    state: Data<&PgPool>,
) -> Result<String> {
    let res = sqlx::query("insert into user_payment_type (user_name,card_name,card_number,exp_mon,exp_year,cvv,card_type,create_date,status ) values ($1,$2,$3,$4,$5,$6,$7,now(),true) returning id")
        .bind(&payment.username)
        .bind(&payment.card_name)
        .bind(&payment.card_num)
        .bind(&payment.exp_mon)
        .bind(&payment.exp_year)
        .bind(&payment.cvv)
        .bind(&payment.card_type)
        .fetch_one(state.0)
        .await
        .map_err(BadRequest)?;
    let id: i32 = res.get("id");
    println!("id:{}", id);
    Ok(String::from("success"))
}
