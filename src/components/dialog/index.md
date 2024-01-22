---
title: Dialog · Components
description: Instant Modal, alternative of native window.alert, window.confirm, and window.prompt
---

<script setup>
  import Button from '../button/Button.vue'
  import * as dialog from '.'

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

  function example3 () {
    dialog.prompt({
      title: 'Welcome',
      text : 'What is your name?',
    }).then((value) => {
      if (value) {
        dialog.alert({
          title: 'Info',
          text : `Hello ${value}`,
        })
      }
    })
  }
</script>

# Dialog

> Instant Modal, alternative of native window.alert, window.confirm, and window.prompt

## Usage

### Alert

<div class="flex mt-5">
  <Button @click="example1" color="info">Show Alert</Button>
</div>

```ts
import { dialog } from '@privyid/persona/core'

dialog.alert({
  title: 'Dialog',
  text : 'Hello This is Dialog',
})
```

### Confirm

<div class="flex mt-5">
  <Button @click="example2" color="info">Show Confirm</Button>
</div>

```ts
import { dialog } from '@privyid/persona/core'

dialog.confirm({
  title: 'Delete Confirmation',
  text : 'Are you sure?',
  size : 'sm',
}).then((value) => {
  if (value === true) {
    dialog.alert({
      title: 'Info',
      text : 'Deleted',
    })
  }
})
```

### Prompt

<div class="flex mt-5">
  <Button @click="example3" color="info">Show Prompt</Button>
</div>

```ts
import { dialog } from '@privyid/persona/core'

dialog.prompt({
  title: 'Welcome',
  text : 'What is your name?',
}).then((value) => {
  if (value) {
    dialog.alert({
      title: 'Info',
      text : `Hello ${value}`,
    })
  }
})
```


## API

### Confirm

`confirm(options: DialogConfirmOption): Promise<boolean>`

| Options             |      Type      | Default | Description                                                      |
|---------------------|:--------------:|:-------:|------------------------------------------------------------------|
| `title`             |    `String`    |    -    | Dialog title, **required**                                       |
| `text`              |    `String`    |    -    | Dialog text content (support markdown)                           |
| `size`              |    `String`    |    -    | Dialog size, valid value is `sm`, `md`, `lg`, `xl`               |
| `centered`          |   `Boolean`    | `false` | Dialog vertically center in the viewport                         |
| `dismissable`       |   `Boolean`    | `true`  | Show / Hide dismiss button                                       |
| `noCloseOnBackdrop` |   `Boolean`    | `false` | No close dialog while dialog Backdrop was clicked                |
| `footerAlign`       |    `Number`    | `start` | The alignment of dialog footer, valid value is `start` and `end` |
| `cancel`            | `DialogButton` |    -    | Cancel button's options for dialog footer                        |
| `confirm`           | `DialogButton` |    -    | Confirm button's options for dialog footer                       |
| `attrs`             |    `Object`    |    -    | Additional attributes placed modal dialog                        |

`DialogButton`

| Options      |   Type    | Default | Description                                                                                              |
|--------------|:---------:|:-------:|----------------------------------------------------------------------------------------------------------|
| `text`       | `String`  |    -    | Dialog button text                                                                                       |
| `visible`    | `Boolean` | `true`  | Show or hide dialog button                                                                               |
| `className`  | `String`  |   `-`   | Add class to dialog button                                                                               |
| `closeModal` | `Boolean` | `true`  | Close dialog modal when dialog button was clicked                                                        |
| `color`      | `String`  |    -    | Dialog button color variant, valid value is `default`, `primary`, `info`, `success`, `danger`, `warning` |
| `variant`    | `String`  |    -    | Dialog button style variant, valid value is `solid`, `outline`, `ghost`, and `link`                      |
| `attrs`      | `Object`  |    -    | Additional attributes placed on button                                                                   |

### Alert

`alert(options: DialogAlertOption): Promise<void>`

| Options       |      Type      | Default | Description                                                      |
|---------------|:--------------:|:-------:|------------------------------------------------------------------|
| `title`       |    `String`    |    -    | Dialog title, **required**                                       |
| `text`        |    `String`    |    -    | Dialog text content                                              |
| `size`        |    `String`    |    -    | Dialog size, valid value is `sm`, `md`, `lg`, `xl`               |
| `centered`    |   `Boolean`    | `false` | Dialog vertically center in the viewport                         |
| `footerAlign` |    `Number`    | `start` | The alignment of dialog footer, valid value is `start` and `end` |
| `confirm`     | `DialogButton` |    -    | Confirm button's options for dialog footer                       |
| `attrs`       |    `Object`    |    -    | Additional attributes placed on modal dialog                     |

### Prompt

`prompt(options: DialogPromptOption): Promise<string>`

| Options             |      Type      | Default | Description                                                      |
|---------------------|:--------------:|:-------:|------------------------------------------------------------------|
| `title`             |    `String`    |    -    | Dialog title, **required**                                       |
| `text`              |    `String`    |    -    | Dialog text content (support markdown)                           |
| `size`              |    `String`    |    -    | Dialog size, valid value is `sm`, `md`, `lg`, `xl`               |
| `centered`          |   `Boolean`    | `false` | Dialog vertically center in the viewport                         |
| `dismissable`       |   `Boolean`    | `true`  | Show / Hide dismiss button                                       |
| `noCloseOnBackdrop` |   `Boolean`    | `false` | No close dialog while dialog Backdrop was clicked                |
| `footerAlign`       |    `Number`    | `start` | The alignment of dialog footer, valid value is `start` and `end` |
| `cancel`            | `DialogButton` |    -    | Cancel button's options for dialog footer                        |
| `confirm`           | `DialogButton` |    -    | Confirm button's options for dialog footer                       |
| `input`             | `DialogInput`  |    -    | Input's options                                                  |
| `value`             |    `String`    |    -    | Default input value                                              |
| `attrs`             |    `Object`    |    -    | Additional attributes placed on modal dialog                     |

`DialogInput`

| Options       |   Type    | Default | Description                                             |
|---------------|:---------:|:-------:|---------------------------------------------------------|
| `type`        | `String`  | `text`  | Input type                                              |
| `size`        | `String`  |  `md`   | Input size variant, valid value: `xs`, `sm`, `md`, `lg` |
| `placeholder` | `String`  |   `-`   | Input placeholder                                       |
| `clearable`   | `Boolean` | `false` | Enable clear button                                     |
| `accept`      | `String`  |   `-`   | Whitelist character can be inputted                     |
| `attrs`       | `Object`  |    -    | Additional attributes placed on input                   |
