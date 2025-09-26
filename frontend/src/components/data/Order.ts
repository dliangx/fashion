export type Order = {
  order_sn: string;
  user_name: string;
  total_amount: number;
  pay_amount: number;
  freight_amount: number;
  pay_type: number;
  source_type: string;
  delivery_sn: string;
  receiver_name: string;
  receiver_zip_code: string;
  receiver_city: string;
  receiver_state: string;
  receiver_address: string;
  receiver_phone: string;
  order_status: number;
  items: Array<OrderItem>;
};

export type OrderItem = {
  order_id: number;
  order_sn: string;
  product_id: number;
  product_pic: string;
  product_name: string;
  product_sn: string;
  product_price: number;
  product_quantity: number;
  product_sku_id: number;
  product_category_id: number;
  product_attr: string;
};
