<script setup>
  import { ref, onMounted } from 'vue-demi'
  import { showOverlay, hideOverlay } from './use-overlay'
  import Button from '../button/Button.vue'
  import Overlay from './Overlay.vue'

  const overlay = ref()

  function onClick() {
    showOverlay()

    setTimeout(() => {
      hideOverlay()
    }, 3000)
  }

  onMounted(() => {
    overlay.value.show()
  })
</script>

<style scoped lang="postcss">
  .preview {
    @apply relative h-52;

    & > .overlay {
      @apply absolute w-full h-full z-auto;
    }
  }
</style>

# Overlay

## Usage

### Simple Usage

<preview>
  <Overlay ref="overlay" />
</preview>

**Try it:**

<div>
  <Button @click="onClick" color="primary">
    Show
  </Button>
</div>

```ts
import { showOverlay, hideOverlay } from '@privyid/persona/core'

function onClick () {
  showOverlay()

  setTimeout(() => {
    hideOverlay()
  }, 3000)
}
```

## API

### showOverlay

`showOverlay(): Promise<void>`

<table>
  <thead>
    <tr>
      <th>Options</th>
      <th style="text-align:center;">Type</th>
      <th style="text-align:center;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4" class="text-center">There no options here</td>
    </tr>
  </tbody>
</table>

### hideOverlay

`hideOverlay(): Promise<void>`

<table>
  <thead>
    <tr>
      <th>Options</th>
      <th style="text-align:center;">Type</th>
      <th style="text-align:center;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4" class="text-center">There no options here</td>
    </tr>
  </tbody>
</table>

## See Also
- [Spinner](/components/spinner/index)
