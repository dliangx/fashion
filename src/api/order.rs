use poem::web::Json;


struct Order{
    user_id: i32,
    order_sn: String,
    user_name: String,
    total_amount: f32,
    pay_amount: f32,
    freight_amount: f32,
    pay_type:String,
    source_type: String,
    delivery_sn: String,
    receiver_name: String,
    receiver_zip_code: String,
    receiver_city: String,
    receiver_state: String,
    receiver_address: String,
    receiver_phone: String,
    items: Vec<OrderItem>
}

struct OrderItem{
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

struct PayMent{
    order_id: i32,
    order_sn: String,
    amount: f32,
}

struct Address{
    userid: i32,
    first_name: String,
    second_name: String,
    address: String,
    city: String,
    status: String,
    zip: String,
    phone: String
}

struct Payment {
    userid: i32,
    card_name: String,
    card_num: String,
    exp_mon: String,
    exp_date: String,
    cvv: String,
}


pub async fn create_order(items: Json<Vec<OrderItem>>) {


}

pub fn checkout(order: Order)->i32{
    return 0;
}

pub fn add_shipping_address(){

}

pub fn add_payment_method(){

}

