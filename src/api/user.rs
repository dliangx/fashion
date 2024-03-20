use poem::web::headers::Date;

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

struct User {
    id: i32,
    username: String,
    nickname: Option<String>,
    phone: Option<String>,
    email: Option<String>,
    gender: Option<String>,
    job: Option<String>,
    create_time: Option<Date>
}



pub fn submit(){
    
}