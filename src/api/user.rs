use poem::handler;
use poem::web::Json;
use poem::web:: Data;
use poem::Result;
use serde::Deserialize;
use sqlx::PgPool;

#[derive(Deserialize)]
struct SubmitInfo {
    name: String,
    email: String,
}


#[handler]
pub async fn submit(state:Data<&PgPool>,user:Json<SubmitInfo>) -> Result<String>{
    let res = sqlx::query("update User set email=? where username=?")
                                                .bind(&user.email)
                                                .bind(&user.name)
                                                .fetch_one(state.0)
                                                .await;
    match res {
        Ok(_) => Ok(String::from("success")),
        Err(err) => {
            println!("err message: {:?}",err);
            Ok(String::from("fail"))
        } 
    }
    
}