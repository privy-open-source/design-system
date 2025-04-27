<script setup>
  import '@privyid/persona-icon/font/persona-icon.css'
  import META from '@privyid/persona-icon/font/persona-icon.json'

  function getURL (name, size = 16) {
    return new URL(`../../../packages/persona-icon/svg/${name}/${size}.svg`, import.meta.url).href
  }
</script>

<div class="grid grid-cols-3 gap-4">
  <template v-for="item in META" :key="item.name">
    <div class="flex flex-col items-center justify-center px-2 py-4 space-y-4 border border-default dark:border-dark-default">
      <div class="flex flex-shrink-0 divide-x ">
        <i :class="`pi-${item.name}`" class="text-[32px] text-base-black dark:text-base-white px-1" />
        <img width="32" height="32" :src="getURL(item.name)" :alt="item.name" class="w-[32px] h-[32px] dark:invert box-content px-1" />
      </div>
      <div class="flex-grow text-center">
        {{ item.name }}
      </div>
    </div>
  </template>
</div>

