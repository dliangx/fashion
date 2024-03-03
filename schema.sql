DROP table product_category;
create table product_category (
  "id" int4 NOT NULL DEFAULT nextval('product_category_id_seq'::regclass),
  "parent_id" int4,
  "name" varchar(50) COLLATE "pg_catalog"."default",
  "level" int2,
  "nav_status" bool,
  "show_status" bool,
  "sort" int2,
  "keywords" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default",
  PRIMARY KEY ("id")
);

drop table product_attribute;

drop table product_attribute;

drop table product_attribute_value;

drop table product;

drop table product_sku;

drop table product_comment;

drop table product_collection;;

drop table order;

drop table order_item;

drop table cart_item;

drop table order_operate_history;

drop table order_return_apply;

drop table content;

drop table content_product;

drop table user;

drop table user_recevie_address;

drop table user_payment_type;

drop table role;

drop table permission;

drop table role_permission_relation;

drop table user_role;

drop table user_login_history;

drop table home_collection;

drop table home_new_product;

drop table home_recommend_product;
