<script lang="ts" setup>
const selected = ref(0);

function selectedMode(value: number) {
    selected.value = value
}
</script>

<template>
    <div class="flex h-full">
        <div class="flex-[0.17] bg-bgBlack h-full">
            <div class="flex flex-col ">
                <span class=" flex w-full h-20 justify-center items-center text-3xl font-extrabold text-main">CPhoneX</span>

                <div class="flex flex-col gap-6 px-6 mt-6">
                    <form class="flex items-center space-x-6">
                        <div class="shrink-0">
                            <img class="h-12 w-12 object-cover rounded-full"
                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                                alt="Current profile photo" />
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-white">Jhon Doe </span>
                            <span class="text-textBlack">Admin</span>
                        </div>
                    </form>
                </div>

                <div @click="selectedMode(0)"
                    :class="selected === 0 ? ' border-main border-l-4 !text-main [&_>span]:!text-main [&_div]:bg-bgBlack bg-black ' : ''"
                    class="text-textBlack [&_>span]:text-textBlack [&_>div]:hover:!bg-bgBlack flex items-center gap-2 px-6 cursor-pointer mt-6 py-2 rounded-r-full w-[90%] hover:border-main hover:border-l-4 hover:text-main hover:[&_div]:bg-bgBlack hover:bg-black ">
                    <div class="rounded-full h-10 w-10 bg-black flex items-center justify-center">
                        <VIcon icon="fa-tachometer " />
                    </div>
                    <span class="text-textBlack text-xl">Dashboard</span>
                </div>
                <div @click="selectedMode(1)"
                    :class="selected === 1 ? ' border-main border-l-4 !text-main [&_>span]:!text-main [&_div]:bg-bgBlack bg-black ' : ''"
                    class="text-textBlack [&_>span]:text-textBlack [&_>div]:hover:!bg-bgBlack flex items-center gap-2 px-6 cursor-pointer py-2 rounded-r-full w-[90%] hover:border-main hover:border-l-4 hover:text-main hover:[&_div]:bg-bgBlack hover:bg-black ">
                    <div class="rounded-full h-10 w-10 bg-black flex items-center justify-center">
                        <VIcon icon="fa-product-hunt " />
                    </div>
                    <span class="text-textBlack text-xl">Products</span>
                </div>
                <div @click="selectedMode(2)"
                    :class="selected === 2 ? ' border-main border-l-4 !text-main [&_>span]:!text-main [&_div]:bg-bgBlack bg-black ' : ''"
                    class="text-textBlack [&_>span]:text-textBlack [&_>div]:hover:!bg-bgBlack flex items-center gap-2 px-6 cursor-pointer py-2 rounded-r-full w-[90%] hover:border-main hover:border-l-4 hover:text-main hover:[&_div]:bg-bgBlack hover:bg-black ">
                    <div class="rounded-full h-10 w-10 bg-black flex items-center justify-center">
                        <VIcon icon="fa-user " />
                    </div>
                    <span class="text-textBlack text-xl">Users</span>
                </div>
                <div @click="selectedMode(3)"
                    :class="selected === 3 ? ' border-main border-l-4 !text-main [&_>span]:!text-main [&_div]:bg-bgBlack bg-black ' : ''"
                    class="text-textBlack [&_>span]:text-textBlack [&_>div]:hover:!bg-bgBlack flex items-center gap-2 px-6 cursor-pointer py-2 rounded-r-full w-[90%] hover:border-main hover:border-l-4 hover:text-main hover:[&_div]:bg-bgBlack hover:bg-black ">
                    <div class="rounded-full h-10 w-10 bg-black flex items-center justify-center">
                        <VIcon icon="fa-bar-chart " />
                    </div>
                    <span class="text-textBlack text-xl">Charts</span>
                </div>
            </div>
        </div>

        <div class="flex-col flex flex-1">
            <div class="flex w-full bg-bgBlack h-20">
                <div class="flex-1 flex items-center text-textBlack">
                    <div class="flex">
                        <div class="hidden group w-72 md:w-80 lg:w-96">
                            <label for="4"
                                class="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-main">Outline
                                icon inline prefix</label>
                            <div class="relative flex items-center">
                                <input id="4" type="text"
                                    class="peer relative h-10 w-full rounded-md bg-gray-50 pl-10 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-main focus:drop-shadow-lg" />
                                <span
                                    class="material-symbols-outlined absolute left-2 transition-all duration-200 ease-in-out group-focus-within:text-main">mail</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1 flex items-center text-textBlack"></div>
                <div class="flex-1 flex items-center text-textBlack"></div>
                <div class="flex-1 flex items-center text-textBlack"></div>
                <div class="flex-1 flex items-center text-textBlack"></div>
                <div class="flex-1 flex items-center text-textBlack"></div>
                <div class="flex-1 flex items-center text-textBlack"> Message </div>
                <div class="flex-1 flex items-center text-textBlack"> Notifications</div>
                <div class="flex-1 flex items-center text-textBlack"> John Doe</div>
            </div>

            <template v-if="selected === 0">
                <VDashboard />
            </template>
            <template v-if="selected === 1">
                <VProducts />
            </template>
            <template v-if="selected === 2">
                <VUser />
            </template>
            <template v-if="selected === 3">
                <VCharts />
            </template>
        </div>
    </div>
</template>