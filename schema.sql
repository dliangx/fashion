DROP TABLE IF EXISTS "cart_item";
DROP TABLE IF EXISTS "collection";
DROP TABLE IF EXISTS "collection_product";
DROP TABLE IF EXISTS "content";
DROP TABLE IF EXISTS "content_category_relation";
DROP TABLE IF EXISTS "order_item";
DROP TABLE IF EXISTS "order_operate_history";
DROP TABLE IF EXISTS "order_return_apply";
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS "product_attribute";
DROP TABLE IF EXISTS "product_attribute_value";
DROP TABLE IF EXISTS "product_category";
DROP TABLE IF EXISTS "product_detail_template";
DROP TABLE IF EXISTS "product_detail_template_relation";
DROP TABLE IF EXISTS "product_picture";
DROP TABLE IF EXISTS "product_recommend";
DROP TABLE IF EXISTS "product_sku";
DROP TABLE IF EXISTS "product";
DROP TABLE IF EXISTS "role_permission_relation";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "user_favourite";
DROP TABLE IF EXISTS "user_login_history";
DROP TABLE IF EXISTS "user_payment_type";
DROP TABLE IF EXISTS "user_permission";
DROP TABLE IF EXISTS "user_recevie_address";
DROP TABLE IF EXISTS "user_role";
DROP TABLE IF EXISTS "user_role_relation";

CREATE TABLE "cart_item" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "product_id" int4 NOT NULL,
  "product_category_id" int4,
  "product_sku_id" int4,
  "user_id" int4,
  "quantity" int2,
  "price" decimal(10,2),
  "sp1" varchar(30),
  "sp2" varchar(30),
  "sp3" varchar(30),
  "product_pic" varchar(50),
  "product_name" varchar(50),
  "product_sn" varchar(50),
  "product_sku_code" varchar(50),
  "user_nickname" varchar(30),
  "create_date" date,
  "modify_date" date,
  "delete_status" bool,
  "product_attr" varchar(255),
  PRIMARY KEY ("id")
);

CREATE TABLE "collection" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "name" varchar(30) NOT NULL,
  "pic" varchar(50),
  "create_time" date,
  "sort" int2,
  "status" bool,
  "recommend_status" bool,
  "level" int2,
  "parent_id" int4,
  PRIMARY KEY ("id")
);

CREATE TABLE "collection_product" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "collection_id" int4,
  "product_id" int4,
  "sort" int2,
  "status" bool,
   PRIMARY KEY ("id")
);

CREATE TABLE "content" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "type" varchar(10),
  "article" text,
  "create_time" date,
  "sort" varchar(10),
  "status" bool,
  "title" varchar(30),
  "tips" varchar(255),
  "pic" varchar(50),
  PRIMARY KEY ("id")
);

CREATE TABLE "content_category_relation" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "content_id" int4,
  "category_id" int4,
  "category_name" varchar(30),
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "order" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "user_id" int4 NOT NULL,
  "order_sn" varchar(50),
  "create_time" date,
  "user_name" varchar(30),
  "total_amount" decimal(10,2),
  "pay_amount" decimal(10,2),
  "freight_amount" decimal(10,2),
  "pay_type" varchar(10),
  "source_type" varchar(10),
  "delivery_sn" varchar(50),
  "receiver_name" varchar(30),
  "receiver_zip_code" varchar(10),
  "receiver_city" varchar(20),
  "receiver_state" varchar(20),
  "receiver_address" varchar(255),
  "receiver_phone" varchar(20),
  "confirm_status" varchar(10),
  "delete_status" bool,
  "payment_time" date,
  "delivery_time" date,
  "receive_time" date,
  "update_time" date,
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "order_item" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "order_id" int4,
  "order_sn" varchar(50),
  "product_id" int4,
  "product_pic" varchar(50),
  "product_name" varchar(30),
  "product_sn" varchar(50),
  "product_price" decimal(10,2),
  "product_quantity" int4,
  "product_sku_id" int4,
  "product_category_id" int4,
  "product_attr" varchar(30),
  "sp1" varchar(30),
  "sp2" varchar(30),
  "sp3" varchar(30),
  PRIMARY KEY ("id")
);

CREATE TABLE "order_operate_history" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "order_id" int4 NOT NULL,
  "operater" varchar(50),
  "create_time" date,
  "order_status" varchar(10),
  "note" varchar(255),
  PRIMARY KEY ("id")
);

CREATE TABLE "order_return_apply" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "order_id" int4,
  "order_sn" varchar(50),
  "product_id" int4,
  "create_time" date,
  "user_name" varchar(30),
  "return_amount" decimal(10,2),
  "return_name" varchar(30),
  "return_phone" varchar(20),
  "status" varchar(10),
  "product_name" varchar(30),
  "product_attr" varchar(255),
  "product_pic" varchar(50),
  "product_count" varchar(10),
  "product_price" decimal(10,2),
  "reason" varchar(255),
  "description" varchar(255),
  "handle_time" date,
  "handle_note" varchar(255),
  PRIMARY KEY ("id")
);

CREATE TABLE "product" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "product_category_id" int4,
  "product_category_name" varchar(20),
  "name" varchar(30),
  "brand" varchar(20),
  "product_sn" varchar(50),
  "delete_status" bool,
  "publish_status" bool,
  "new_status" bool,
  "sort" int4,
  "sale" int4,
  "price" decimal(10,2),
  "rating" float4,
  "preview_pic" varchar(50),
  "description" varchar(255),
  "stock" int4,
  "low_stock" int4,
  "unit" varchar(10),
  "weight" float8,
  "keywords" varchar(20),
  "note" varchar(255),
  "feight_type" varchar(20),
  "detail_title" varchar(20),
  "detail_desc" varchar(255),
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "product_attribute" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "name" varchar(30),
  "product_id" int4,
  "select_type" int2,
  "sort" int2,
  "filter_type" int2,
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "product_attribute_value" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "product_attribute_id" int4,
  "product_id" int4,
  "value" varchar(255),
  PRIMARY KEY ("id")
);

CREATE TABLE "product_category" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "parent_id" int4,
  "name" varchar(30),
  "level" int2,
  "nav_status" int2,
  "sort" int4,
  "keywords" varchar(20),
  "description" varchar(255),
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "product_detail_template" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "type" varchar(10),
  "title" varchar(30),
  "detail" text,
  PRIMARY KEY ("id")
);
COMMENT ON COLUMN "product_detail_template"."type" IS 'html or text';

CREATE TABLE "product_detail_template_relation" (
  "id" int4 GENERATED ALWAYS AS IDENTITY,
  "product_id" int4,
  "template_id" int4
);

CREATE TABLE "product_picture" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "product_id" int4,
  "type" int2,
  "sort" varchar(10),
  "url" varchar(50),
  "status" bool,
  PRIMARY KEY ("id")
);
COMMENT ON COLUMN "product_picture"."type" IS 'album or detail or gallery';

CREATE TABLE "product_recommend" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "product_id" int4 NOT NULL,
  "product_name" varchar(30),
  "sort" int2,
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "product_sku" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "product_id" int4,
  "sku_code" varchar(255),
  "price" decimal(10,2),
  "stock" int4,
  "low_stock" int4,
  "sale" int4,
  "sp1" varchar(30),
  "sp2" varchar(30),
  "sp3" varchar(30),
  "pic" varchar(50),
  "lock_stock" int4,
  PRIMARY KEY ("id")
);

CREATE TABLE "role_permission_relation" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "role_id" int4,
  "permission_id" int4,
  PRIMARY KEY ("id")
);

CREATE TABLE "user" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "username" varchar(30) NOT NULL,
  "password" varchar(30),
  "email" varchar(50),
  "create_time" date,
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_favourite" (
  "id" int4 NOT NULL,
  "user_id" int4 NOT NULL,
  "collection_id" int4,
  "product_id" int4,
  "category_id" int4,
  "create_time" date,
  "delete_flag" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_login_history" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "user_id" int4,
  "create_time" date,
  "ip" varchar(20),
  "city" varchar(20),
  "login_type" int2,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_payment_type" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "user_id" int4,
  "card_name" varchar(50),
  "card_number" varchar(50),
  "exp_mon" int2,
  "exp_date" varchar(10),
  "cvv" varchar(10),
  "create_date" date,
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_permission" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "name" varchar(30),
  "value" varchar(255),
  "status" bool,
  "sort" int2,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_recevie_address" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "user_id" int4 NOT NULL,
  "fist_name" varchar(30),
  "second_name" varchar(30),
  "address" varchar(255),
  "city" varchar(20),
  "state" varchar(20),
  "zipcode" varchar(10),
  "phone" varchar(20),
  "create_time" date,
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_role" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "name" varchar(30),
  "description" varchar(255),
  "create_time" date,
  "status" int2,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_role_relation" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "role_id" int4 NOT NULL,
  "user_id" int4 NOT NULL,
  PRIMARY KEY ("id")
);

ALTER TABLE "order_item" ADD CONSTRAINT "fk_order_item_order_1" FOREIGN KEY ("order_id") REFERENCES "order" ("id");
ALTER TABLE "product_sku" ADD CONSTRAINT "fk_product_sku_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
