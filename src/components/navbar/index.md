<script setup>
  import { ref } from 'vue-demi'
  import pNavbar from './Navbar.vue'
  import pNavbarBrand from './NavbarBrand.vue'
  import pNavbarNav from './NavbarNav.vue'
  import pNavbarToggle from './NavbarToggle.vue'
  import pNavItem from '../nav/NavItem.vue'
  import pNavItemDropdown from '../nav/NavItemDropdown.vue'
  import pDropdownItem from '../dropdown/DropdownItem.vue'
  import pNavForm from '../nav/NavForm.vue'
  import pInput from '../input/Input.vue'
  import pInputGroup from '../input/InputGroup.vue'
  import pButton from '../button/Button.vue'
  import pAvatar from '../avatar/Avatar.vue'
  import pCollapse from '../collapse/Collapse.vue'
  import IconBee from '@carbon/icons-vue/lib/bee/20'
  import IconView from '@carbon/icons-vue/lib/view/16'

  const ex = ref(false)
</script>

<style scoped>
  .preview {
    @apply block;
  }
</style>

<preview class="flex-grow">
  <p-navbar fixed>
    <p-navbar-brand>
      <img src="../../public/assets/images/logo-privy.svg" />
    </p-navbar-brand>
    <p-navbar-toggle @click="ex =! ex">
      <template #default="{ expanded }">
        <IconBee v-if="expanded" />
        <IconView v-else />
      </template>
    </p-navbar-toggle>
    <p-collapse v-model="ex" is-nav>
      <p-navbar-nav align="left">
        <p-nav-item>Label</p-nav-item>
      </p-navbar-nav>
      <p-navbar-nav align="right">
        <p-nav-form>
          <p-input-group>
            <p-input placeholder="Input Here" />
            <p-button variant="input" color="secondary">Search</p-button>
          </p-input-group>
        </p-nav-form>
        <p-nav-form>
          <p-avatar src="https://picsum.photos/50" />
        </p-nav-form>
      </p-navbar-nav>
    </p-collapse>
  </p-navbar>
</preview>
