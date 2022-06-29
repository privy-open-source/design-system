<script setup>
  import Button from '../button/Button.vue'
  import dialog from './use-dialog'

  function example1 () {
    dialog.alert({
      title: 'Dialog',
      text : 'Hello This is Dialog',
    })
  }

  function example2 () {
    dialog.confirm({
      title: 'Delete Confirmation',
      text : 'Are you sure?',
    }).then((value) => {
      if (value === true) {
        dialog.alert({
          title: 'Info',
          text : 'Deleted',
        })
      }
    })
  }
</script>

# Dialog (Instant Modal)

## Usage

### Alert

<div class="flex mt-5">
  <Button @click="example1">Show Alert</Button>
</div>

```ts
import dialog from './use-dialog'

dialog.alert({
  title: 'Dialog',
  text : 'Hello This is Dialog',
})
```

### Confirm

<div class="flex mt-5">
  <Button @click="example2">Show Confirm</Button>
</div>

```ts
import dialog from './use-dialog'

dialog.confirm({
  title: 'Delete Confirmation',
  text : 'Are you sure?',
}).then((value) => {
  if (value === true) {
    dialog.alert({
      title: 'Info',
      text : 'Deleted',
    })
  }
})
```
