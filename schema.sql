CREATE TABLE "cart_item" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "product_id" int4 NOT NULL,
  "product_category_id" int4,
  "product_sku_id" int4,
  "user_id" int4,
  "quantity" int2,
  "price" decimal(10,2),
  "sp1" varchar(255),
  "sp2" varchar(255),
  "sp3" varchar(255),
  "product_pic" varchar(255),
  "product_name" varchar(255),
  "product_sn" varchar(255),
  "product_sku_code" varchar(255),
  "user_nickname" varchar(255),
  "create_date" date,
  "modify_date" date,
  "delete_status" varchar(255),
  "product_attr" varchar(255),
  PRIMARY KEY ("id")
);

CREATE TABLE "collection" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "name" varchar(255) NOT NULL,
  "pic" varchar(255),
  "create_time" date,
  "sort" int2,
  "status" bool,
  "recommend_status" bool,
  CONSTRAINT "_copy_2" PRIMARY KEY ("id")
);

CREATE TABLE "collection_product" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "collection_id" int4,
  "product_id" int4,
  "sort" int2,
  "status" bool,
  CONSTRAINT "_copy_1" PRIMARY KEY ("id")
);

CREATE TABLE "content" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "type" varchar(255),
  "article" text,
  "create_time" date,
  "sort" varchar(255),
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "content_product" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "content_id" int4 NOT NULL,
  "product_id" int4,
  PRIMARY KEY ("id")
);

CREATE TABLE "home_new_product" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "product_id" int4,
  "product_name" varchar(255),
  "sort" int2,
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "home_recommend_product" (
  "id" int4 GENERATED ALWAYS AS IDENTITY,
  "product_id" int4,
  "product_name" varchar(255),
  "sort" int2,
  "status" bool
);

CREATE TABLE "order" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "user_id" int4 NOT NULL,
  "order_sn" varchar(255),
  "create_time" date,
  "user_name" varchar(255),
  "total_amount" decimal(10,2),
  "pay_amount" decimal(10,2),
  "freight_amount" decimal(10,2),
  "pay_type" varchar(255),
  "source_type" varchar(255),
  "delivery_sn" varchar(255),
  "receiver_name" varchar(255),
  "receiver_zip_code" varchar(255),
  "receiver_city" varchar(255),
  "receiver_state" varchar(255),
  "receiver_address" varchar(255),
  "receiver_phone" varchar(255),
  "confirm_status" varchar(255),
  "delete_status" bool,
  "payment_time" date,
  "delivery_time" date,
  "receive_time" date,
  "comment_time" varchar(255),
  "update_time" date,
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "order_item" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "order_id" int4,
  "order_sn" varchar(255),
  "product_id" int4,
  "product_pic" varchar(255),
  "product_name" varchar(255),
  "product_sn" varchar(255),
  "product_price" decimal(10,2),
  "product_quantity" int4,
  "product_sku_id" int4,
  "product_category_id" int4,
  "product_attr" varchar(255),
  "sp1" varchar(255),
  "sp2" varchar(255),
  "sp3" varchar(255),
  PRIMARY KEY ("id")
);

CREATE TABLE "order_operate_history" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "order_id" int4 NOT NULL,
  "operater" varchar(255),
  "create_time" date,
  "order_status" varchar(255),
  "note" varchar(255),
  PRIMARY KEY ("id")
);

CREATE TABLE "order_return_apply" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "order_id" int4,
  "order_sn" varchar(255),
  "product_id" int4,
  "create_time" date,
  "user_name" varchar(255),
  "return_amount" varchar(255),
  "return_name" varchar(255),
  "return_phone" varchar(255),
  "status" varchar(255),
  "product_name" varchar(255),
  "product_attr" varchar(255),
  "product_pic" varchar(255),
  "product_count" varchar(255),
  "product_price" decimal(10,2),
  "reason" varchar(255),
  "description" varchar(255),
  "handle_time" date,
  "handle_note" varchar(255),
  PRIMARY KEY ("id")
);

CREATE TABLE "permission" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "name" varchar(255),
  "value" varchar(255),
  "status" bool,
  "sort" int2,
  PRIMARY KEY ("id")
);

CREATE TABLE "product" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "product_category_id" int4,
  "name" varchar(255),
  "product_sn" varchar(255),
  "delete_status" bool,
  "publish_status" bool,
  "new_status" bool,
  "recommend_status" bool,
  "sort" int4,
  "sale" int4,
  "price" decimal(10,2),
  "preview_pic" varchar(255),
  "description" varchar(255),
  "stock" int4,
  "low_stock" int4,
  "unit" varchar(255),
  "weight" float8,
  "keywords" varchar(255),
  "note" varchar(255),
  "feight_type" varchar(255),
  "detail_title" varchar(255),
  "detail_desc" varchar(255),
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "product_attribute" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "name" varchar(255),
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
  CONSTRAINT "_copy_3" PRIMARY KEY ("id")
);

CREATE TABLE "product_category" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "parent_id" int4,
  "name" varchar(255),
  "level" int2,
  "nav_status" int2,
  "sort" int4,
  "keywords" varchar(255),
  "description" varchar(255),
  "status" bool,
  CONSTRAINT "_copy_4" PRIMARY KEY ("id")
);

CREATE TABLE "product_comment" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "product_id" int4 NOT NULL,
  "user_id" int4,
  "rating " int2,
  "time" date,
  PRIMARY KEY ("id")
);

CREATE TABLE "product_detail_template" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "type" varchar(255),
  "title" varchar(255),
  "detail" varchar(255),
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
  "sort" varchar(255),
  "url" varchar(255),
  "status" bool,
  PRIMARY KEY ("id")
);
COMMENT ON COLUMN "product_picture"."type" IS 'album or detail or gallery';

CREATE TABLE "product_sku" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "product_id" int4,
  "sku_code" varchar(255),
  "price" decimal(10,2),
  "stock" int4,
  "low_stock" int4,
  "sale" int4,
  "sp1" varchar(255),
  "sp2" varchar(255),
  "sp3" varchar(255),
  "pic" varchar(255),
  "lock_stock" int4,
  PRIMARY KEY ("id")
);

CREATE TABLE "role" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "name" varchar(255),
  "description" varchar(255),
  "create_time" date,
  "status" int2,
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
  "username" varchar(255),
  "password" varchar(255),
  "nickname" varchar(255),
  "phone" varchar(255),
  "gender" varchar(255),
  "birthday" varchar(255),
  "city" varchar(255),
  "job" varchar(255),
  "create_time" date,
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_login_history" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "user_id" int4,
  "create_time" date,
  "ip" varchar(255),
  "city" varchar(255),
  "login_type" int2,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_payment_type" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "user_id" int4,
  "card_name" varchar(255),
  "card_number" varchar(255),
  "exp_mon" int2,
  "exp_date" varchar(255),
  "cvv" varchar(255),
  "create_date" date,
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_recevie_address" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "user_id" int4 NOT NULL,
  "fist_name" varchar(255),
  "second_name" varchar(255),
  "address" varchar(255),
  "city" varchar(255),
  "state" varchar(255),
  "zipcode" varchar(255),
  "phone" varchar(255),
  "create_time" date,
  "status" bool,
  PRIMARY KEY ("id")
);

CREATE TABLE "user_role" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "role_id" int4 NOT NULL,
  "user_id" int4 NOT NULL,
  PRIMARY KEY ("id")
);

ALTER TABLE "cart_item" ADD CONSTRAINT "fk_cart_item_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "collection_product" ADD CONSTRAINT "fk_collection_product_collection_1" FOREIGN KEY ("collection_id") REFERENCES "collection" ("id");
ALTER TABLE "collection_product" ADD CONSTRAINT "fk_collection_product_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "content_product" ADD CONSTRAINT "fk_content_product_content_1" FOREIGN KEY ("content_id") REFERENCES "content" ("id");
ALTER TABLE "content_product" ADD CONSTRAINT "fk_content_product_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "home_new_product" ADD CONSTRAINT "fk_home_new_product_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "home_recommend_product" ADD CONSTRAINT "fk_home_recommend_product_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "order" ADD CONSTRAINT "fk_order_user_1" FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "order_item" ADD CONSTRAINT "fk_order_item_order_1" FOREIGN KEY ("order_id") REFERENCES "order" ("id");
ALTER TABLE "order_item" ADD CONSTRAINT "fk_order_item_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "order_operate_history" ADD CONSTRAINT "fk_order_operate_history_order_1" FOREIGN KEY ("order_id") REFERENCES "order" ("id");
ALTER TABLE "order_return_apply" ADD CONSTRAINT "fk_order_return_apply_order_1" FOREIGN KEY ("order_id") REFERENCES "order" ("id");
ALTER TABLE "product" ADD CONSTRAINT "fk_product_product_category_1" FOREIGN KEY ("product_category_id") REFERENCES "product_category" ("id");
ALTER TABLE "product_attribute" ADD CONSTRAINT "fk_product_attribute_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "product_attribute_value" ADD CONSTRAINT "fk_product_attribute_value_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "product_attribute_value" ADD CONSTRAINT "fk_product_attribute_value_product_attribute_1" FOREIGN KEY ("product_attribute_id") REFERENCES "product_attribute" ("id");
ALTER TABLE "product_comment" ADD CONSTRAINT "fk_product_comment_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "product_detail_template_relation" ADD CONSTRAINT "fk_product_detail_template_relation_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "product_detail_template_relation" ADD CONSTRAINT "fk_product_detail_template_relation_product_detail_template_1" FOREIGN KEY ("template_id") REFERENCES "product_detail_template" ("id");
ALTER TABLE "product_picture" ADD CONSTRAINT "fk_product_picture_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "product_sku" ADD CONSTRAINT "fk_product_sku_product_1" FOREIGN KEY ("product_id") REFERENCES "product" ("id");
ALTER TABLE "role_permission_relation" ADD CONSTRAINT "fk_role_permission_relation_permission_1" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id");
ALTER TABLE "role_permission_relation" ADD CONSTRAINT "fk_role_permission_relation_role_1" FOREIGN KEY ("role_id") REFERENCES "role" ("id");
ALTER TABLE "user_login_history" ADD CONSTRAINT "fk_user_login_history_user_1" FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "user_payment_type" ADD CONSTRAINT "fk_user_payment_type_user_1" FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "user_recevie_address" ADD CONSTRAINT "fk_user_recevie_address_user_1" FOREIGN KEY ("user_id") REFERENCES "user" ("id");
ALTER TABLE "user_role" ADD CONSTRAINT "fk_user_role_role_1" FOREIGN KEY ("role_id") REFERENCES "role" ("id");
ALTER TABLE "user_role" ADD CONSTRAINT "fk_user_role_user_1" FOREIGN KEY ("user_id") REFERENCES "user" ("id");

