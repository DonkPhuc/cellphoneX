import { Products } from '~/home/dtos';
export class Orders {
  _id = '';
  orderNumber = '';
  orderDelivery = '';
  customerName = '';
  orderAddress = '';
  orderTotal = 0;
  status = '';
  orderDate = Date;
  items: Products[] = [];
  __v = 0;
}
