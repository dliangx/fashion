export type User = {
  username: string;
  user_token: string;
};

export type Address = {
  username: string;
  first_name: string;
  second_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

export type PaymentCard = {
  id: number;
  username: string;
  card_type: number;
  card_name: string;
  card_num: string;
  exp_mon: string;
  exp_year: string;
  cvv: string;
};
