# Fashion

openfashion rust backend implement, using shuttle sass platform.

## Database Desgin && Business Design

### 1.collection

- collection
- collection_product

### 2.product

- product_category
- product_category_attribute_relation
- product_attribute
- product_attribute_value
- product_category_attribute_relation
- product
- product_picture
- product_detail_template
- product_detail_template_relation
- product_sku
- product_recommend
- product_sku
- product_sku_attr_relation

### 3.order

- order
- order_item
- order_operate_history
- order_return_apply

### 4.user

- user
- user_cart_item
- user_recevie_address
- user_payment_type
- role
- permission
- role_permission_relation
- user_role
- user_login_history

create table sql is in "schema.sql".

## Software Architecture

hosting in shuttle sass platform,Shuttle is a Rust-native cloud development platform that lets you deploy your Rust apps for free. you can handle all development operation only using terminal,without web configuration. it supply a free shared database for you development. if you publish you service you can using you own database.It can be well integrated with AI through hugeface's candle framework, and recommendation services will be implemented through it in the future.

## Rust Server Implement

using poem middleware impl jwt authorization. it's a full-featured and easy-to-use web framework with the Rust programming language.Debugging time is drastically reduced after the code is written. I rarely used debugging in the whole process of this project.

## Develop ,Build and Publish

develop: cargo shuttle run
