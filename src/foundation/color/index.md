<script setup>
  import Colors from './Colors.vue'
  import { ref, computed } from "vue-demi"
  import items from './Colors.json'
</script>

# Color

<div class="p-0 mt-8">
  <template v-for="item of items">
    <Colors :item="item">
      {{ item.title }}
    </Colors>
  </template>
</div>

## Usage
At the element level, everything in HTML can have color applied to it. Instead, let's look at things in terms of the kinds of things that are drawn in the elements, such as text and borders and so forth.

At a fundamental level, the color property defines the foreground color of an HTML element's content and the background-color property defines the element's background color. These can be used on just about any element. Color are specified using predefined color names, or RGB, HEX, HSL, RGBA, HSLA values.

##### Example

<p style="color:#0065d1;">Color</p>
<p style="border:2px solid #0065d1">Color</p>
<p style="background-color:#0065d1;color:#ffffff;">Color</p>
