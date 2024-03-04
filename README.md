# Fashion

openfashion rust backend implement, using shuttle sass platform.

## Database Desgin && Business Design

1.product

- product_category
- product_attribute
- product_attribute_value
- product
- product_picture
- product_detail_template
- product_sku
- product_comment
- collection
- collection_product

2.order

- order
- order_item
- cart_item
- order_operate_history
- order_return_apply

3.content

- content
- content_product

4.user

- user
- user_recevie_address
- user_payment_type
- role
- permission
- role_permission_relation
- user_role
- user_login_history

5.home

- home_new_product
- home_recommend_product

using navicat premium to design database model,export file is "fashion-physic.ndm2"

create table sql is in "schema.sql".

## Software Architecture

## Rust Server Implement

## Develop ,Build and Publish
