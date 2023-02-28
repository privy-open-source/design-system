<script setup>
  import pPage from './Page.vue'
  import pSidebarMenu from '../sidebar-menu/SidebarMenu.vue'
  import pSidebarBrand from '../sidebar/SidebarBrand.vue'
  import pCheckbox from '../checkbox/Checkbox.vue'
  import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
  import IconDocument from '@carbon/icons-vue/lib/document/20'
  import IconUsers from '@carbon/icons-vue/lib/group/20'
  import IconSettings from '@carbon/icons-vue/lib/settings--adjust/20'
  import IconEN from '../sidebar-menu/assets/images/img-flag.svg'
  import { defineMenu } from '../sidebar-menu'
  import { ref } from 'vue-demi'

  const modelA   = ref(false)

  const basic = defineMenu([
    {
      items: [
        {
          name : 'dashboard',
          label: 'Dashboard',
          url  : '/',
          icon : IconDashboard,
        },
        {
          name       : 'document',
          label      : 'Documents',
          url        : '/',
          icon       : IconDocument,
          collapsible: true,
          submenu    : [
            {
              name : 'need-action',
              label: 'Need Action',
              url  : '/'
            },
            {
              name : 'in-progress',
              label: 'In Progress',
              url  : '/'
            },
            {
              name : 'others',
              label: 'Others',
              url  : '/'
            }
          ]
        },
        {
          name : 'contact',
          label: 'Contacts',
          url  : '/',
          icon : IconUsers
        }
      ]
    },
    {
      condensed: true,
      title: 'Quick Jump',
      items: [
        {
          name : 'rejects',
          label: 'Rejects',
          url  : '/',
        },
        {
          name: 'archives',
          label: 'Archives',
          url: '/',
        },
      ]
    },
    {
      bottom: true,
      items: [
        {
          name : 'settings',
          label: 'Settings',
          icon : IconSettings,
          url  : '/',
        },
        {
          name : 'english',
          label: 'English',
          url  : '/',
          icon : IconEN
        },
      ]
    },
  ])
</script>
<style scoped lang="postcss">
  .preview {
    @apply block h-[28rem] overflow-hidden;

    &.higher {
      @apply h-[35rem];
    }

    .sidebar--fixed {
      @apply absolute;
    }
  }
</style>

<preview class="higher">
  <div class="flex h-full min-h-screen">
    <p-sidebar-menu :menus="basic" fixed toggleable="all" v-model="modelA">
      <p-sidebar-brand>
        <img src="../sidebar/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </p-sidebar-menu>
    <p-page>
      <div class="flex justify-end mt-10">
        <p-checkbox v-model="modelA">!Expand</p-checkbox>
      </div>
      <p>
      A wonderful <strong>serenity</strong> has taken possession of my <em>entire</em> soul, <small>like</small> these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath
      </p>
    </p-page>
  </div>
</preview>

<preview class="higher">
  <div class="flex h-full min-h-screen">
    <p-sidebar-menu :menus="basic" fixed toggleable="all" v-model="modelA">
      <p-sidebar-brand>
        <img src="../sidebar/assets/images/logo-privy.svg" alt="" />
      </p-sidebar-brand>
    </p-sidebar-menu>
    <p-page expand="all" v-model="modelA">
      <div class="flex justify-end mt-10">
        <p-checkbox v-model="modelA">!Expand</p-checkbox>
      </div>
      <p>
      A wonderful <strong>serenity</strong> has taken possession of my <em>entire</em> soul, <small>like</small> these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath
      </p>
    </p-page>
  </div>
</preview>