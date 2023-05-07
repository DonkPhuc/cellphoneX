import { Expose } from 'class-transformer';
export class Products {
  _id = '';
  name = '';
  title = '';
  price = 0;
  priceRRP = 0;
  imageLink = '';
  description = '';
  rated = 0;
  favorite = false;
  quality = 1;
  discount = 0;
  label = '';
  value = 0 || '';
  imageDetail = [];
}
