<script setup>
  import Heading from '../../components/heading/Heading.vue'
  import { ref } from 'vue-demi'
  import pNavbar from '../../components/navbar/Navbar.vue'
  import pNavbarBrand from '../../components/navbar/NavbarBrand.vue'
  import pNavbarNav from '../../components/navbar/NavbarNav.vue'
  import pNavbarToggle from '../../components/navbar/NavbarToggle.vue'
  import pNavItem from '../../components/nav/NavItem.vue'
  import pNavItemDropdown from '../../components/nav/NavItemDropdown.vue'
  import pDropdownItem from '../../components/dropdown/DropdownItem.vue'
  import pNavForm from '../../components/nav/NavForm.vue'
  import pNavText from '../../components/nav/NavText.vue'
  import pInput from '../../components/input/Input.vue'
  import pInputGroup from '../../components/input-group/InputGroup.vue'
  import pInputGroupAddon from '../../components/input-group/InputGroupAddon.vue'
  import pDivider from '../../components/divider/Divider.vue'
  import pButton from '../../components/button/Button.vue'
  import pAvatar from '../../components/avatar/Avatar.vue'
  import pCollapse from '../../components/collapse/Collapse.vue'
  import pCaption from '../../components/caption/Caption.vue'
  import pSidebar from '../../components/sidebar/Sidebar.vue'
  import pSidebarNav from '../../components/sidebar/SidebarNav.vue'
  import pSidebarBrand from '../../components/sidebar/SidebarBrand.vue'
  import pNavSubItem from '../../components/nav/NavSubItem.vue'
  import IconDocument from '@carbon/icons-vue/lib/document/20'
  import IconGroup from '@carbon/icons-vue/lib/group/20'
  import IconDataStructured from '@carbon/icons-vue/lib/data--structured/20'
  import IconSettings from '@carbon/icons-vue/lib/settings--adjust/20'
  import IconDashboard from '@carbon/icons-vue/lib/dashboard/20'
  import IconMenu from '@carbon/icons-vue/lib/overflow-menu--horizontal/20'
  import IconBee from '@carbon/icons-vue/lib/bee/20'
  import IconView from '@carbon/icons-vue/lib/view/20'
  import IconUser from '@carbon/icons-vue/lib/events/16'
  import IconChevron from '@carbon/icons-vue/lib/chevron--sort/20'
  import IconNotif from '@carbon/icons-vue/lib/notification/20'
  import IconSearch from '@carbon/icons-vue/lib/search/20'

  const menu = ref(false)
</script>

<style scoped lang="postcss">
  .sidebar {
    &&--fixed {
      @apply absolute;
    }
  }
  /* h1, h2, h3, h4, h5, h6 {
    &[class^='h'] {
      @apply mt-0;
      font-weight: inherit;
    }
  }

  h2 {
    &[class^='h'] {
      @apply m-0 p-0 border-b-0;
    }
  } */
</style>

# ![navigation](/assets/images/img-guide-navbar.svg) Navigation

## Navigation

### Usage

The navigation component is used to display the primary navigation in the sidebar or top bar of the frame of an platform. Navigation includes a list of links that user use to move between sections of the platform.

### Type

#### Sidebar

<div class="relative h-[50rem] flex my-6">
  <p-sidebar fixed>
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDashboard />
        </template>
        Dashboard
      </p-nav-item>
      <p-nav-sub-item text="Documents">
        <template #icon>
          <IconDocument />
        </template>
        <p-sidebar-nav id="chld-1">
          <p-nav-item disabled>
            Need Action
          </p-nav-item>
          <p-nav-item>
            In Progress
          </p-nav-item>
          <p-nav-item>
            Others
          </p-nav-item>
        </p-sidebar-nav>
      </p-nav-sub-item>
      <p-nav-sub-item text="Contacts">
        <template #icon>
          <IconGroup />
        </template>
        <p-sidebar-nav id="chld-1">
          <p-nav-item disabled>
            Structure
          </p-nav-item>
        </p-sidebar-nav>
      </p-nav-sub-item>
    </p-sidebar-nav>
    <p-sidebar-nav title="Quick Jump" condensed class="!mt-10">
      <p-nav-item>
        Rejected
      </p-nav-item>
      <p-nav-item>
        Archives
      </p-nav-item>
    </p-sidebar-nav>
    <p-sidebar-nav bottom>
      <p-nav-item>
        <template #icon>
          <IconSettings />
        </template>
        Settings
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <img src="/assets/images/icon-flag.svg"/>
        </template>
        English
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</div>
<p-caption class="!text-subtle">Usage : Sidebar navigation menu is a list of primary menu that usualy used or have a high priority functions. This navigation is always shown, and the menu is static.</p-caption>

#### Navigation Tab

<div class="flex my-6">
  <p-sidebar variant="tabs">
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDashboard />
        </template>
        Dashboard
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconDocument />
        </template>
        Document
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</div>
<p-caption class="!text-subtle">Usage : Navigation tab menu is a list of secondary menu that usually used as a sub menu of sidebar navigation. This menu usually flexible, and on each page can be different.</p-caption>

#### Navigation Bar - Dashboard

<div class="flex-grow my-6">
  <p-navbar>
    <div class="flex flex-row">
      <div class="transition-all duration-200 ease-in-out basis-2/4 focus-within:basis-full">
        <p-navbar-nav>
          <p-input-group>
            <p-input-group-addon>
              <IconSearch />
            </p-input-group-addon>
            <p-input placeholder="Search" />
          </p-input-group>
        </p-navbar-nav>
      </div>
    </div>
     <p-navbar-nav align="right">
      <p-nav-item>
        <template #icon>
          <IconNotif />
        </template>
      </p-nav-item>
      <p-nav-item-dropdown no-caret size="xs" variant="outline">
        <template #button-content>
          <span class="flex items-center space-x-2">
            <p-avatar size="xs">
              <IconUser />
            </p-avatar>
            <span class="block text-left">
              <span class="text-sm">Tarjono Sujono</span>
              <p-caption size="xs">Personal Account</p-caption>
            </span>
            <IconChevron />
          </span>
        </template>
        <p-dropdown-item>Edit Profile</p-dropdown-item>
        <p-dropdown-item>Preference</p-dropdown-item>
        <p-dropdown-item>Sign out</p-dropdown-item>
      </p-nav-item-dropdown>
      <p-nav-text>
        <p-avatar src="https://picsum.photos/50" />
      </p-nav-text>
    </p-navbar-nav>
  </p-navbar>
</div>
<p-caption class="!text-subtle">Usage: This type is a navigation bar usually for the after-login pages and is placed at the top of the screen in the desktop screen.</p-caption>

#### Navigation Bar - Landing

<div class="flex-grow my-6">
  <p-navbar>
    <p-navbar-brand>
      <img src="../../public/assets/images/logo-privy.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Home</p-nav-item>
      <p-nav-item>Products</p-nav-item>
    </p-navbar-nav>
    <p-navbar-nav align="right">
      <p-nav-form>
        <p-button href="#" variant="link">Login</p-button>
        <p-button href="#" color="primary">Create Free Account</p-button>
      </p-nav-form>
    </p-navbar-nav>
  </p-navbar>
</div>
<p-caption class="!text-subtle">Usage: This type is a navigation bar usually for the landing pages and is placed at the top of the desktop screen.</p-caption>

### Sidebar Navigation Variant

#### Wide

<div class="relative h-[50rem] flex my-6">
  <p-sidebar fixed>
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy.svg" alt="" />
    </p-sidebar-brand>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDashboard />
        </template>
        Dashboard
      </p-nav-item>
      <p-nav-sub-item text="Documents">
        <template #icon>
          <IconDocument />
        </template>
        <p-sidebar-nav id="chld-1">
          <p-nav-item disabled>
            Need Action
          </p-nav-item>
          <p-nav-item>
            In Progress
          </p-nav-item>
          <p-nav-item>
            Others
          </p-nav-item>
        </p-sidebar-nav>
      </p-nav-sub-item>
      <p-nav-sub-item text="Contacts">
        <template #icon>
          <IconGroup />
        </template>
        <p-sidebar-nav id="chld-1">
          <p-nav-item disabled>
            Structure
          </p-nav-item>
        </p-sidebar-nav>
      </p-nav-sub-item>
    </p-sidebar-nav>
    <p-sidebar-nav title="Quick Jump" condensed class="!mt-10">
      <p-nav-item>
        Rejected
      </p-nav-item>
      <p-nav-item>
        Archives
      </p-nav-item>
    </p-sidebar-nav>
    <p-sidebar-nav bottom>
      <p-nav-item>
        <template #icon>
          <IconSettings />
        </template>
        Settings
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <img src="/assets/images/icon-flag.svg"/>
        </template>
        English
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</div>
<p-caption class="!text-subtle">
Usage : Use this variant sidebar for more clear context of the menu, if the icon unfamiliar with the user.</p-caption>


#### Compact

<div class="relative h-[35rem] flex my-6">
  <p-sidebar type="narrow" fixed>
    <p-sidebar-brand>
      <img src="/assets/images/logo-privy-icon.svg" alt="" />
    </p-sidebar-brand>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <IconDashboard />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconDocument />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconGroup />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <IconMenu />
        </template>
      </p-nav-item>
    </p-sidebar-nav>
    <p-sidebar-nav bottom>
      <p-nav-item>
        <template #icon>
          <IconSettings />
        </template>
      </p-nav-item>
      <p-nav-item>
        <template #icon>
          <img src="/assets/images/icon-flag.svg"/>
        </template>
        ENG
      </p-nav-item>
    </p-sidebar-nav>
  </p-sidebar>
</div>
<p-caption class="!text-subtle">
Usage : Use this variant sidebar for more clear context of the menu, if the icon unfamiliar with the user.</p-caption>

#### Navtab - Default
<div class="flex flex-row">
  <div class="w-1/2">
    <div class="relative h-64 flex my-6">
      <p-sidebar variant="tabs" type="narrow" fixed>
        <p-sidebar-nav>
          <p-nav-item active>
            <template #icon>
              <IconDashboard />
            </template>
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconDocument />
            </template>
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconGroup />
            </template>
          </p-nav-item>
        </p-sidebar-nav>
      </p-sidebar>
    </div>
  </div>
  <div class="w-1/2">
    <div class="relative h-64 flex my-6">
      <p-sidebar variant="tabs" fixed>
        <p-sidebar-nav>
          <p-nav-item active>
            <template #icon>
              <IconDashboard />
            </template>
            Dashboard
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconDocument />
            </template>
            Document
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconGroup />
            </template>
            Users
          </p-nav-item>
        </p-sidebar-nav>
      </p-sidebar>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
Usage : Nav tab is a secondary navigation menu after side bar. It has 2 varian (Compact & Wide). 
The position of this nav tab can be place on right left, or top. It can be only icon, only text, icon with text.</p-caption>

#### Navtab - Skeleton
<div class="flex flex-row">
  <div class="w-1/2">
    <div class="relative h-64 flex my-6">
      <p-sidebar variant="lines" type="narrow" fixed>
        <p-sidebar-nav>
          <p-nav-item active>
            <template #icon>
              <IconDashboard />
            </template>
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconDocument />
            </template>
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconGroup />
            </template>
          </p-nav-item>
        </p-sidebar-nav>
      </p-sidebar>
    </div>
  </div>
  <div class="w-1/2">
    <div class="relative h-64 flex my-6">
      <p-sidebar variant="lines" fixed>
        <p-sidebar-nav>
          <p-nav-item active>
            <template #icon>
              <IconDashboard />
            </template>
            Dashboard
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconDocument />
            </template>
            Document
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconGroup />
            </template>
            Users
          </p-nav-item>
        </p-sidebar-nav>
      </p-sidebar>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage : Nav tab is a secondary navigation menu after side bar. It has 2 varian (Compact & Wide). The position of this nav tab can be place on right left, or top. At this variant the indicator of active tab using a line. It can be only icon, only text, icon with text.
</p-caption>

#### Navtab - Floating
<div class="flex flex-row">
  <div class="w-1/2">
    <div class="relative h-64 flex my-6">
      <p-sidebar variant="pills" type="narrow" class="border-r" fixed>
        <p-sidebar-nav>
          <p-nav-item active>
            <template #icon>
              <IconDashboard />
            </template>
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconDocument />
            </template>
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconGroup />
            </template>
          </p-nav-item>
        </p-sidebar-nav>
      </p-sidebar>
    </div>
  </div>
  <div class="w-1/2">
    <div class="relative h-64 flex my-6">
      <p-sidebar variant="pills" class="border-r" fixed>
        <p-sidebar-nav>
          <p-nav-item active>
            <template #icon>
              <IconDashboard />
            </template>
            Dashboard
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconDocument />
            </template>
            Document
          </p-nav-item>
          <p-nav-item>
            <template #icon>
              <IconGroup />
            </template>
            Users
          </p-nav-item>
        </p-sidebar-nav>
      </p-sidebar>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage : Nav tab is a secondary navigation menu after side bar. It has 2 varian (Compact & Wide). The position of this nav tab can be place on right left, or top. At this variant the indicator of active tab using filled grey background. It can be only icon, only text, icon with text.
</p-caption>

### Navigation Bar Variant

#### Navigation Bar – Landing
<div class="flex-grow my-6">
  <p-navbar>
    <p-navbar-brand>
      <img src="../../public/assets/images/logo-privy.svg" />
    </p-navbar-brand>
    <p-navbar-nav>
      <p-nav-item active>Home</p-nav-item>
      <p-nav-item>Products</p-nav-item>
    </p-navbar-nav>
    <p-navbar-nav align="right">
      <p-nav-form>
        <p-button href="#" variant="link">Login</p-button>
        <p-button href="#" color="primary">Create Free Account</p-button>
      </p-nav-form>
    </p-navbar-nav>
  </p-navbar>
</div>

<div class="flex flex-row">
  <div class="w-1/2">
    <div class="flex-grow my-6">
      <p-navbar toggleable="all">
        <p-navbar-brand>
          <img src="../../public/assets/images/logo-privy-icon.svg" />
        </p-navbar-brand>
        <p-navbar-toggle @click="menu =! menu" />
        <p-collapse v-model="menu" is-nav>
          <p-navbar-nav>
            <p-nav-item active>Home</p-nav-item>
            <p-nav-item>Products</p-nav-item>
          </p-navbar-nav>
          <p-navbar-nav align="right">
            <p-nav-form>
              <p-button href="#" variant="link">Login</p-button>
              <p-button href="#" color="primary">Create Free Account</p-button>
            </p-nav-form>
          </p-navbar-nav>
        </p-collapse>
      </p-navbar>
    </div>
  </div>
</div>
<p-caption class="!text-subtle">
  Usage: This type of navigation bar has two variants, the full desktop view, and the responsive mobile view. Each variant has 2 themes, light and dark.
</p-caption>

#### Navigation Bar – Dashboard

<div class="flex-grow my-6">
  <p-navbar>
    <div class="flex flex-row">
      <div class="transition-all duration-200 ease-in-out basis-2/4 focus-within:basis-full">
        <p-navbar-nav>
          <p-input-group>
            <p-input-group-addon>
              <IconSearch />
            </p-input-group-addon>
            <p-input placeholder="Search" />
          </p-input-group>
        </p-navbar-nav>
      </div>
    </div>
     <p-navbar-nav align="right">
      <p-nav-item>
        <template #icon>
          <IconNotif />
        </template>
      </p-nav-item>
      <p-nav-item-dropdown no-caret size="xs" variant="outline">
        <template #button-content>
          <span class="flex items-center space-x-2">
            <p-avatar size="xs">
              <IconUser />
            </p-avatar>
            <span class="block text-left">
              <span class="text-sm">Tarjono Sujono</span>
              <p-caption size="xs">Personal Account</p-caption>
            </span>
            <IconChevron />
          </span>
        </template>
        <p-dropdown-item>Edit Profile</p-dropdown-item>
        <p-dropdown-item>Preference</p-dropdown-item>
        <p-dropdown-item>Sign out</p-dropdown-item>
      </p-nav-item-dropdown>
      <p-nav-text>
        <p-avatar src="https://picsum.photos/50" />
      </p-nav-text>
    </p-navbar-nav>
  </p-navbar>
</div>
<p-caption class="!text-subtle">
  Usage: This type of navigation bar has only one variant only. The mobile view as much as possible will have the look and layout of the native mobile apps
</p-caption>

## Pattern Rule
### Best Practice

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>
      Contain primary navigation items that perform an action when clicked. 
      Each action should navigate to a URL or trigger another action 
      like a modal overlay.
      </li>
      <li>Only use secondary actions for supplementary actions to the primary actions.</li>
      <li>Provide a non-primary link or action as a secondary action to a section or an item.</li>
      <li>Group navigation items into sections based on related categories.</li>
      <li>Use a section title to clarify the category of a section.</li>
      <li>Use a major icon for item actions.</li>
      <li>Use a minor icon for secondary actions.</li>
      <li>Use the provided navigation section component to group navigation items.</li>
    </ul> 
  </div>
</div>

