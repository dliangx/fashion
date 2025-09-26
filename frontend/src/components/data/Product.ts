export type ProductInfo = {
  id: number;
  name: string;
  category: string;
  pic: string;
  brand: string;
  rating: number;
  price: number;
};

export type Detail = {
  t: number;
  title: string;
  detail: string;
};

export type Picture = {
  t: number;
  sort: number;
  url: string;
};

export type Attribute = {
  name: string;
  value: string;
};

export type AttributeProps = {
  attrs: Attribute[];
};

export type ProductDetail = {
  info: ProductInfo;
  pics: Picture[];
  attr: Attribute[];
  details: Detail[];
};

export type CollectionInfo = {
  id: number;
  pic: string;
  name: string;
};

export type ImageSlide = {
  src: string;
  alt: string;
};

export type Page = {
  start: number;
  num: number;
};

export type CollectionDetailInfo = {
  collection: CollectionInfo;
  products: ProductInfo[];
};
