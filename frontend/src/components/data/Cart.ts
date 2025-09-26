import { Attribute } from "./Product";

export type CartItem = {
  id: number;
  pic: string;
  brand: string;
  name: string;
  num: number;
  price: number;
  attr: Attribute[];
};

export type FavoriteItem = {
  id: number;
  pic: string;
  brand: string;
  name: string;
  price: number;
};
