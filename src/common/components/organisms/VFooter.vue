<script lang="ts" setup>
const listInfo1st = [
  'Gọi mua hàng 1800.2044 (7h30 - 22h00)',
  'Gọi khiếu nại 1800.2063 (8h00 - 21h30)',
  'Gọi bảo hành 1800.2064 (8h00 - 21h00)',
];

const listInfo2nd = [
  'Mua hàng và thanh toán Online',
  'Mua hàng trả góp Online',
  'Tra thông tin đơn hàng',
  'Tra điểm Smember',
  'Xem ưu đãi Smember',
  'Tra thông tin bảo hành',
  'Tra cứu hoá đơn điện tử',
  'Thông tin hoá đơn mua hàng',
  'Trung tâm bảo hành chính hãng',
  'Quy định về việc sao lưu dữ liệu',
];

const listInfo3rd = [
  'Khách hàng doanh nghiệp (B2B)',
  'Ưu đãi thanh toán',
  'Quy chế hoạt động',
  'Chính sách Bảo hành',
  'Liên hệ hợp tác kinh doanh',
  'Tuyển dụng',
  'Dịch vụ bảo hành điện thoại',
  'Dịch vụ bảo hành mở rộng',
];
</script>

<template>
  <footer class="w-full border-t-2 pt-10">
    <div class="flex">
      <div class="hidden flex-[0.35] lg:flex"></div>
      <div class="flex flex-1">
        <div class="flex flex-1 flex-col gap-4">
          <h1>Tổng đài hỗ trợ miễn phí</h1>
          <div>
            <div v-for="item in listInfo1st" :key="item" class="py-1 pl-2 text-xs font-normal">
              <span>{{ item }}</span>
            </div>
          </div>
          <h1>Phương thức thanh toán</h1>
          <div class="flex flex-wrap gap-2 pl-2 pt-2">
            <img class="border" src="https://image.cellphones.com.vn/x35/media/logo/payment/alepay-logo.png" alt="" />
            <img class="border" src="https://image.cellphones.com.vn/x35/media/logo/payment/alepay-logo.png" alt="" />
            <img class="border" src="https://image.cellphones.com.vn/x35/media/logo/payment/alepay-logo.png" alt="" />
            <img class="border" src="https://image.cellphones.com.vn/x35/media/logo/payment/alepay-logo.png" alt="" />
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-4">
          <h1>Thông tin và chính sách</h1>
          <div>
            <div v-for="item in listInfo2nd" :key="item" class="py-1 pl-2 text-xs font-normal">
              <span>{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-4">
          <h1>Dịch vụ và thông tin khác</h1>
          <div>
            <div v-for="item in listInfo3rd" :key="item" class="py-1 pl-2 text-xs font-normal">
              <span>{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-4">
          <h1>Kết nối với CellphoneS</h1>
          <div class="flex flex-wrap gap-2">
            <img src="https://image.cellphones.com.vn/44x/media/logo/social/cellphones-youtube.png" alt="" />
            <img src="https://image.cellphones.com.vn/44x/media/logo/social/cellphones-youtube.png" alt="" />
            <img src="https://image.cellphones.com.vn/44x/media/logo/social/cellphones-youtube.png" alt="" />
            <img src="https://image.cellphones.com.vn/44x/media/logo/social/cellphones-youtube.png" alt="" />
            <img src="https://image.cellphones.com.vn/44x/media/logo/social/cellphones-youtube.png" alt="" />
          </div>
          <h1>Website thành viên</h1>
          <img
            class="h-7 w-32"
            src="https://image.cellphones.com.vn/x30/media/logo/corp-members/dienthoaivui.png"
            alt=""
          />
          <img
            class="h-7 w-32"
            src="https://image.cellphones.com.vn/x30/media/logo/corp-members/dienthoaivui-asp.png"
            alt=""
          />
          <img class="h-7 w-32" src="https://image.cellphones.com.vn/x30/media/logo/corp-members/sforum.png" alt="" />
        </div>
      </div>
      <div class="hidden flex-[0.35] lg:flex"></div>
    </div>

    <div class="w-full bg-slate-100 py-4">
      <span class="flex flex-1 justify-center pb-4 text-[10px]"
        >@dmca_copyright_protected150c by leduykhanh @dmca_copyright_protected150c 000997728821.
        @dmca_copyright_protected150c @dmca_copyright_protected150c @dmca_copyright_protected150c</span
      >
      <div class="flex flex-1 justify-center">
        <img class="h-[20px]" src="https://cdn2.cellphones.com.vn/80x,webp/media/logo/logoSaleNoti.png" alt="" />
        <img
          class="h-[20px]"
          src="https://images.dmca.com/Badges/dmca_copyright_protected150c.png?ID=158f5667-cce3-4a18-b2d1-826225e6b022"
          alt=""
        />
      </div>
    </div>
  </footer>
</template>
