import BaseService, { METHODS } from '~/common/services/BaseService';

import { Products } from '../dtos/products.dto';

const itemList = [
  {
    imageLink: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
    name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    price: 4491000,
    priceRRP: 4491000,
    description: "Thu cũ lên đời - Giá thu tốt nhất - Tặng thêm 2 triệu khi lên đời",
    rated: 4,
    favorite: true,
    quality: 1,
    id: "knjasd1",
    discount: 10,
    imageDetail: [
      "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
      "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
      "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
      "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
      "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
    ],
  },
  {
    imageLink: 'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
    name: 'iPhone 14 Pro Max 128GB | Chính hãng VN/AA',
    price: 4492000,
    priceRRP: 4490000,
    description: 'Thu cũ lên đời - Giá thu tốt nhất - Tặng thêm 2 triệu khi lên đời',
    rated: 4,
    favorite: true,
    quality: 1,
    id: 'inngomsm2',
    discount: 10,
    imageDetail: [
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
    ],
  },
  {
    imageLink: 'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
    name: 'iPhone 14 Pro Max 128GB | Chính hãng VN/AB',
    price: 44490,
    priceRRP: 4490000,
    description: 'Thu cũ lên đời - Giá thu tốt nhất - Tặng thêm 2 triệu khi lên đời',
    rated: 4,
    favorite: true,
    quality: 1,
    id: 'inngom3sm',
    discount: 10,
    imageDetail: [
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
    ],
  },
  {
    imageLink: 'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
    name: 'iPhone 14 Pro Max 128GB | Chính hãng VN/AC',
    price: 44950,
    priceRRP: 4490000,
    description: 'Thu cũ lên đời - Giá thu tốt nhất - Tặng thêm 2 triệu khi lên đời',
    rated: 4,
    favorite: true,
    quality: 1,
    id: 'inngo4msm',
    discount: 10,
    imageDetail: [
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
    ],
  },
  {
    imageLink: 'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
    name: 'iPhone 14 Pro Max 128GB | Chính hãng VN/AD',
    price: 449550,
    priceRRP: 4490000,
    description: 'Thu cũ lên đời - Giá thu tốt nhất - Tặng thêm 2 triệu khi lên đời',
    rated: 4,
    favorite: true,
    quality: 1,
    id: 'inngo214msm',
    discount: 10,
    imageDetail: [
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
    ],
  },
  {
    imageLink: 'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
    name: 'iPhone 14 Pro Max 128GB | Chính hãng VN/AS',
    price: 4490000,
    priceRRP: 4490000,
    description: 'Thu cũ lên đời - Giá thu tốt nhất - Tặng thêm 2 triệu khi lên đời',
    rated: 4,
    favorite: true,
    quality: 1,
    id: 'inngoms6m',
    discount: 10,
    imageDetail: [
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
      'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png',
    ],
  },
] as Products[];
class Services extends BaseService {
  constructor(prefix: string) {
    super(prefix);
  }

  // getData() {
  //   return itemList;
  // }
  async getData() {
    return await this.performRequest(METHODS.GET, 'product');
  }
}
export default new Services('v1');
