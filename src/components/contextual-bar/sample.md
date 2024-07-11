---
layout: false
---

<script setup>
  import pButton from '../button/Button.vue'
  import pModal from '../modal/Modal.vue'
  import pNavbar from '../navbar/Navbar.vue'
  import pNavbarBrand from '../navbar/NavbarBrand.vue'
  import pNavbarNav from '../navbar/NavbarNav.vue'
  import pSidebar from '../sidebar/Sidebar.vue'
  import pSidebarBrand from '../sidebar/SidebarBrand.vue'
  import pSidebarNav from '../sidebar/SidebarNav.vue'
  import pNavItem from '../nav/NavItem.vue'
  import pPage from '../page/Page.vue'
  import pHeading from '../heading/Heading.vue'
  import pContextualBar from './ContextualBar.vue'
  import pDropzone from '../dropzone/Dropzone.vue'
  import pCheckbox from '../checkbox/Checkbox.vue'
  import pSheet from '../sheet/Sheet.vue'
  import pFormGroup from '../form-group/FormGroup.vue'
  import pInput from '../input/Input.vue'
  import IconClose from '@privyid/persona-icon/vue/close/16.vue'
  import IconEdit from '@privyid/persona-icon/vue/edit/16.vue'
  import { usePreview } from '../cropper/utils/use-preview'
  import { reactive, ref } from 'vue-demi'
  import { withBase } from 'vitepress'

  const sample = ref(false)
  const modal = ref(false)
</script>

<p-contextual-bar v-model="sample" title="Hey! This is Title Text">
  <template #action>
    <p-button size="sm" color="info">Button text</p-button>
  </template>
</p-contextual-bar>

<p-navbar fixed>
  <p-navbar-nav align="right">
    <p-nav-item active>Label</p-nav-item>
    <p-nav-item>Label</p-nav-item>
    <p-nav-item>Label</p-nav-item>
  </p-navbar-nav>
</p-navbar>

<div class="flex w-full h-full">
  <p-sidebar toggleable="lg" fixed>
    <template #brand>
      <p-sidebar-brand>
        <img src="../../public/assets/images/icon-privy.svg" />
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>Documents</p-nav-item>
      <p-nav-item>Contacts</p-nav-item>
      <p-nav-item>Structure</p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
  <p-page expand="lg">
    <div class="w-6/12 mx-auto">
      <p-heading element="h5" class="mb-5">
        A wonderful serenity has taken possession
      </p-heading>
      <p class="pb-6">
        <div>
          <p-button color="info" @click="modal=true">Open modal</p-button>
        </div>
        My entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath
        <p-button size="sm" color="info" @click="sample=true">Click</p-button>
      </p>
      <p class="pb-6">
        My entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath
      </p>
      <p>
        My entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath
      </p>
    </div>
  </p-page>
</div>

<p-modal
  v-model="modal"
  title="Modal Title"
  text="This is place holder text. The basic dialog for modals
    should contain only valuable and relevant information."
  size="full"
  header-class="px-6"
  body-class="p-6">
</p-modal>
