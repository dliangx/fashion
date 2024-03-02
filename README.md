# Fashion

openfashion rust backend implement, using shuttle sass platform.

## Database Desgin && Business Design

1.product

- product_category

```sql
create table product_category (
    "id" int4 NOT NULL DEFAULT nextval('product_category_id_seq'::regclass),
    "parent_id" int4 NOT NULL DEFAULT nextval('product_category_parent_id_seq'::regclass),
    name varchar(50),
    level char(1),
    nav_status bool,
    show_status bool,
    sort inet,
    keywords varchar(50),
    description text(255)
)
```

- product_attribute
- product_attribute_value
- product
- product_sku
- product_comment
- collection

2.order

- order
- order_item
- cart_item
- order_operate_history
- order_return_apply

3.content

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

- home_collection
- home_new_product
- home_recommend_product

## Software Architecture

## Rust Server Implement

```js
sdfsfd
```

## Develop ,Build and Publish
