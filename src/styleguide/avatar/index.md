<script setup>
  import pAvatar from '../../components/avatar/Avatar.vue'
  import pCaption from '../../components/caption/Caption.vue'
  import IconUser from '@carbon/icons-vue/lib/events/16'
</script>

# ![avatar](/assets/images/img-guide-avatar.svg) Avatars

## Avatar

### Usage:

### Available Avatar Set

<div class="flex pt-8 pb-20">
  <div class="w-1/2">
    <ul>
      <li>
        <span class="block font-bold">Small (32p)</span>
        use when the medium size is too big for the layout, or when the avatar has less importance
      </li>
      <li>
        <span class="block font-bold">Medium (40p)</span>
        use as the default size
      </li>
    </ul> 
  </div>
  <div class="w-1/2">
    <div class="flex justify-center space-x-12">
      <div class="text-center">
        <div class="flex justify-center items-end h-12 pb-6">
          <p-avatar size="sm" />
        </div>
        <span class="block text-sm">small</span>
      </div>
      <div class="text-center">
        <div class="flex justify-center items-end h-12 pb-6">
          <p-avatar size="md" />
        </div>
        <span class="block text-sm">medium</span>
        <span class="font-bold text-sm">(Default)</span>
      </div>
    </div>
  </div>
</div>

### Special Avatar Set

<div class="flex pt-8 pb-20">
  <div class="w-1/2">
    <ul>
      <li>
        <span class="block font-bold">Extra small (24p)</span>
        use in tightly condensed layouts e.g. Table
      </li>
      <li>
        <span class="block font-bold">Large (40p) and Extra Large (60p)</span>
        use when an avatar is a focal point, such as on a single customer card or in user profile page
      </li>
    </ul> 
  </div>
  <div class="w-1/2">
    <div class="flex justify-end space-x-12">
      <div class="text-center">
        <div class="flex justify-center items-end h-16 pb-6">
          <p-avatar size="xs" />
        </div>
        <span class="block text-sm">extra small</span>
      </div>
      <div class="text-center">
        <div class="flex justify-center items-end h-16 pb-6">
          <p-avatar size="lg" />
        </div>
        <span class="block text-sm">large</span>
      </div>
      <div class="text-center">
        <div class="flex justify-center items-end h-16 pb-6">
          <p-avatar size="xl" />
        </div>
        <span class="block text-sm">extra large</span>
      </div>
    </div>
  </div>
</div>

### Grouped Avatar Set

<div class="flex py-8">
  <div class="w-1/2">
    Use avatar group when you want to display a collection of avatars. 
    You can also use them for easy collapse states for a set number 
    of avatars and with a dropdown to show hidden avatars. 
    Use extra small size only for this type of set.
  </div>
  <div class="w-1/2">
    <div class="flex justify-center space-x-4">
      <img src="/assets/images/img-guide-avatar-redline-24.svg" />
      <p-avatar size="xs" />
      <p-avatar size="xs" />
      <p-avatar size="xs" />
      <p-avatar size="xs" />
      <p-avatar size="xs" />
    </div>
  </div>
</div>

### Available Avatar Type

<div class="flex pt-8">
  <div class="w-1/2">
    <ul>
      <li>
        <span class="block font-bold">Default (image) dan Default (initial)</span>
        pilihan user, default image avatar ketika user tidak upload image
      </li>
      <li>
        <span class="block font-bold">Icon</span>
        avatar icon hanya digunakan selain untuk profile, misal mewakili bisnis, jenis akun atau enterprise
      </li>
    </ul> 
  </div>
  <div class="w-1/2">
    <div class="flex justify-end space-x-12">
      <div class="text-center">
        <div class="flex justify-center items-end h-12 pb-6">
          <p-avatar />
        </div>
        <span class="block text-sm">default</span>
        <span class="font-bold text-sm">(image)</span>
      </div>
      <div class="text-center">
        <div class="flex justify-center items-end h-12 pb-6">
          <p-avatar name="Fififi Huhuhu" />
        </div>
        <span class="block text-sm">default</span>
        <span class="font-bold text-sm">(initial)</span>
      </div>
      <div class="text-center">
        <div class="flex justify-center items-end h-12 pb-6">
          <p-avatar>
            <IconUser />
          </p-avatar>
        </div>
        <span class="block text-sm">icon</span>
      </div>
    </div>
  </div>
</div>
<div class="flex pb-20">
  <div class="w-1/2">
    <p-caption class="!text-subtle">Users can choose an avatar whether to use an image or initial when using an image whether to use the default or upload their own avatar (proposal)</p-caption>
  </div>
</div>

### Unset/Hover Avatar

<div class="flex pt-8">
  <div class="w-1/2">
    <ul>
      <li>
        <span class="block font-bold">Unset</span>
        this case is a condition where the avatar is not set up yet for the first time or is being removed/unset by the user
      </li>
      <li>
        <span class="block font-bold">Hover</span>
        this case is a condition where the avatar is set up and hovered by the cursor to indicate that the avatar is editable
      </li>
    </ul> 
  </div>
  <div class="w-1/2">
    <div class="flex justify-end space-x-12">
      <div class="text-center">
        <div class="flex justify-center items-end h-12 pb-6">
          <p-avatar />
        </div>
        <span class="block text-sm">default</span>
        <span class="font-bold text-sm">(image)</span>
      </div>
      <div class="text-center">
        <div class="flex justify-center items-end h-12 pb-6">
          <p-avatar name="Fififi Huhuhu" />
        </div>
        <span class="block text-sm">default</span>
        <span class="font-bold text-sm">(initial)</span>
      </div>
      <div class="text-center">
        <div class="flex justify-center items-end h-12 pb-6">
          <p-avatar>
            <IconUser />
          </p-avatar>
        </div>
        <span class="block text-sm">icon</span>
      </div>
    </div>
  </div>
</div>
<div class="flex pb-8">
  <div class="w-1/2">
    <p-caption class="!text-subtle">
      each size avatar has its size camera icon, xsmall and small avatar use 16p icon, medium use 20p icon, large use 24p icon and the xlarge avatar will be use 32p icon size  
    </p-caption>
  </div>
</div>

## Pattern Rule

### Best Practice

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Extra small (24 x 24 px): use in tightly condensed layouts.</li>
      <li>Small (32 × 32 px): use when the medium size is too big for the layout, or when the avatar has less importance.</li>
      <li>Medium (40 × 40 px): use as the default size.</li>
      <li>Large (60 × 60 px): use when an avatar is a focal point, such as on a single customer card.</li>
    </ul> 
  </div>
</div>

### Do

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>Always add the name of the person using the name property.</li>
      <li>For the best results, use square images or images cropped into a square.</li>
    </ul> 
  </div>
</div>

### Don’t

<div class="flex">
  <div class="w-2/3">
    <ul>
      <li>
        Try to avoid using landscape or portrait images as avatars. Let users crop their images 
        before or after uploading if possible.
      </li>
    </ul> 
  </div>
</div>

