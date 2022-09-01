<script setup>
  import Button from '../button/Button.vue'
  import dialog from './use-dialog'

  function example1 () {
    dialog.alert({
      title: 'Dialog Title',
      text : 'Dialog description should here',
    })
  }

  function exampleButton () {
    dialog.alert({
      title: 'Whoa! Take it easy',
      text : 'Now signature placement is mandatory for every document, you will be asked to place a signature for each recipient',
      footerAlign: 'right',
      confirm: {
        text: 'Got it',
        color: 'primary',
        variant: 'link',
      }
    })
  }

  function example2 () {
    dialog.confirm({
      title: 'Delete Confirmation',
      text : 'Are you sure?',
    }).then((value) => {
      if (value === true) {
        dialog.alert({
          title: 'Deleted',
          text : 'Signature image was successfully deleted.',
        })
      }
    })
  }

  function exampleConfirm () {
    dialog.confirm({
      title: 'Upload Non-PDF File',
      text : 'Uploading a non-PDF file format would take more time. Do you want to upload this file?',
      cancel: {
        variant: 'link',
        color: 'secondary',
      },
      confirm: {
        text: 'Continue',
        color: 'danger',
      }
    }).then((value) => {
      if (value === true) {
        dialog.alert({
          title: 'Identity Verification',
          text : 'It will verify if the recipient has a digital certificate from Privy that is certified by the Indonesian Ministry of Communication & Informatics (Kominfo). By turning it off, the recipient will sign the document via PrivyNow.',
          footerAlign: 'right',
        })
      }
    })
  }
</script>

# Dialog (Instant Modal)

## Usage

### Basic Alert

<div class="flex mt-5">
  <Button @click="example1">Show Alert</Button>
</div>

```ts
import dialog from './use-dialog'

dialog.alert({
  title: 'Dialog Title',
  text : 'Dialog description should here',
})
```

### Custom Button

<div class="flex mt-5">
  <Button @click="exampleButton">Show Alert</Button>
</div>

```ts
import dialog from './use-dialog'

dialog.alert({
  title: 'Whoa! Take it easy',
  text : 'Now signature placement is mandatory for every document, you will be asked to place a signature for each recipient',
  footerAlign: 'right',
  confirm: {
    text: 'Got it',
    color: 'primary',
    variant: 'link',
  }
})
```

### Basic Confirm

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
      title: 'Deleted',
      text : 'Signature image was successfully deleted.',
    })
  }
})
```

### Custom Confirm

<div class="flex mt-5">
  <Button @click="exampleConfirm">Show Confirm</Button>
</div>

```ts
import dialog from './use-dialog'

dialog.confirm({
  title: 'Upload Non-PDF File',
  text : 'Uploading a non-PDF file format would take more time. Do you want to upload this file?',
  cancel: {
    variant: 'link',
    color: 'secondary'
  },
  confirm: {
    text: 'Continue',
    color: 'danger'
  }
}).then((value) => {
  if (value === true) {
    dialog.alert({
      title: 'Identity Verification',
      text : 'It will verify if the recipient has a digital certificate from Privy that is certified by the Indonesian Ministry of Communication & Informatics (Kominfo). By turning it off, the recipient will sign the document via PrivyNow.',
      footerAlign: 'right',
    })
  }
})
```
