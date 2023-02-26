<template>
  <header class="absolute transition-width duration-200 ease-in-out hover:w-72 w-16 left-0 top-0 h-screen bg-gray-900 border-r border-gray-800">
    <nav class="h-screen px-1 pt-10">
      <ul class="text-white">
        <a href="">
          <li class="flex align-middle hover:bg-gray-800 p-4 rounded">
            <div>
              <figure class="w-5 h-5 mt-[1px] bg-gray-100">
                X
              </figure>
            </div>
            <p class="ml-8 transition-all delay-50 whitespace-nowrap" href="#">Enlace 1</p>
          </li>
          <li class="flex align-middle hover:bg-gray-800 p-4 rounded">
            <div>
              <figure class="w-5 h-5 mt-[1px] bg-gray-100">
                X
              </figure>
            </div>
            <p class="ml-8 transition-all delay-50 whitespace-nowrap" href="#">Enlace 1</p>
          </li>
          <li class="flex align-middle hover:bg-gray-800 p-4 rounded">
            <div>
              <figure class="w-5 h-5 mt-[1px] bg-gray-100">
                X
              </figure>
            </div>
            <p class="ml-8 transition-all delay-50 whitespace-nowrap" href="#">Enlace 1</p>
          </li>
          <li class="flex align-middle hover:bg-gray-800 p-4 rounded">
            <div>
              <figure class="w-5 h-5 mt-[1px] bg-gray-100">
                X
              </figure>
            </div>
            <p class="ml-8 transition-all delay-50 whitespace-nowrap" href="#">Enlace 1</p>
          </li>
        </a>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
  nav p {
  opacity: 0;
  }
  header:hover p {
    opacity: 1;
  }
</style>