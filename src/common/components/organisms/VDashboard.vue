<template>
  <main class="h-full flex-[1] bg-black p-6">
    <div class="flex flex-col gap-6 bg-black">
      <div class="flex h-full w-full gap-6 bg-black">
        <div class="flex flex-1 justify-between rounded-md bg-bgBlack p-6">
          <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
          <div class="flex flex-col">
            <span class="text-textBlack">Today Sale</span>
            <span class="font-bold text-white">$1234</span>
          </div>
        </div>
        <div class="flex flex-1 justify-between rounded-md bg-bgBlack p-6">
          <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
          <div class="flex flex-col">
            <span class="text-textBlack">Today Sale</span>
            <span class="font-bold text-white">$1234</span>
          </div>
        </div>
        <div class="flex flex-1 justify-between rounded-md bg-bgBlack p-6">
          <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
          <div class="flex flex-col">
            <span class="text-textBlack">Today Sale</span>
            <span class="font-bold text-white">$1234</span>
          </div>
        </div>
        <div class="flex flex-1 justify-between rounded-md bg-bgBlack p-6">
          <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
          <div class="flex flex-col">
            <span class="text-textBlack">Today Sale</span>
            <span class="font-bold text-white">$1234</span>
          </div>
        </div>
      </div>
      <div class="flex h-full w-full flex-1 gap-6 bg-black pb-6">
        <div
          class="flex h-full flex-1 flex-col gap-6 rounded-md bg-bgBlack p-6"
        >
          <div class="flex flex-1 justify-between">
            <span class="font-bold text-white">Recent Salse</span>
          </div>
          <table class="w-full overflow-auto border border-black">
            <thead>
              <tr>
                <th class="border border-black py-2 text-white">Date</th>
                <th class="border border-black py-2 text-white">
                  Invoice Customer
                </th>
                <th class="border border-black py-2 text-white">Amount</th>
                <th class="border border-black py-2 text-white">Status</th>
                <th class="border border-black py-2 text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="truncate border border-black p-2 text-textBlack">
                  Indiana
                </td>
                <td class="truncate border border-black p-2 text-textBlack">
                  Indianapolis
                </td>
                <td class="truncate border border-black p-2 text-textBlack">
                  Indianapolis
                </td>
                <td class="truncate border border-black p-2 text-textBlack">
                  Indianapolis
                </td>
                <td class="truncate border border-black p-2 text-textBlack">
                  Indianapolis
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>