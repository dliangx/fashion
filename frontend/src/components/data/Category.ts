export interface Category {
  id: number;
  name: String;
  level: number;
  collapse: boolean;
  sub: Category[];
}

export interface CategoryResp {
  id: number;
  name: String;
  level: number;
  parent_id: number;
}

export type CategoryItemProps = {
  props: Category;
  onclick:()=>void 
}