---
title: Components > PDF Objects
description: Add object to PDF Viewer
---

<script setup>
  import pPdfViewer from '../pdf-viewer/PdfViewer.vue'
  import pPdfObject from './PdfObject.vue'
  import pPdfObjectAddon from './PdfObjectAddon.vue'
  import pButton from '../button/Button.vue'
  import FILE from '../pdf-viewer/assets/Calibrator-v3.pdf?url'
  import IconClose from '@carbon/icons-vue/lib/close/16'
  import { reactive, ref, nextTick } from 'vue-demi'
  import { random } from 'lodash-es'

  const object1 = reactive({
    page  : undefined,
    x     : undefined,
    y     : undefined,
    width : undefined,
    height: undefined,
  })

  const object2 = reactive({
    page  : undefined,
    x     : undefined,
    y     : undefined,
    width : undefined,
    height: undefined,
  })

  const object3 = reactive({
    page  : undefined,
    x     : undefined,
    y     : undefined,
    width : undefined,
    height: undefined,
  })

  const objects = reactive([])

  function add () {
    objects.push({
      _id   : Symbol('ObjectId'),
      page  : undefined,
      x     : undefined,
      y     : undefined,
      width : undefined,
      height: undefined,
    })
  }

  function remove (index) {
    objects.splice(index, 1)
  }

  const isShow = ref(false)
  const page   = ref(random(6, 11, 0))

  function show () {
    if (isShow.value)
      isShow.value = false

    nextTick(() => {
      page.value   = random(6, 11, 0)
      isShow.value = true
    })
  }
</script>

<style lang="postcss">
  .preview > .pdf {
    @apply z-[2];
  }
</style>

# PDF Object

> Add object to PDF Viewer

## Usage

### Simple Usage

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object1.page"
      v-model:x="object1.x"
      v-model:y="object1.y"
      v-model:width="object1.width"
      v-model:height="object1.height">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue
<template>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</template>

<script setup lang="ts">
  import FILE from '~/assets/Calibrator-v3.pdf?url'

  interface PDFObject {
    page?: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  }

  const object = reactive<PDFObject>({
    page  : undefined,
    x     : undefined,
    y     : undefined,
    width : undefined,
    height: undefined,
  })
</script>
```

## Object Addon

You can add additional element like action button using `<p-object-addon>` component.

<preview>
  <p-pdf-viewer :src="FILE">
    <template #header>
      <p-button color="primary" class="float-right my-4" @click="add">
        Add Object
      </p-button>
    </template>
    <p-pdf-object
      v-for="(object, i) in objects"
      :key="object._id"
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
      <p-pdf-object-addon>
        <p-button size="sm" icon color="danger" @click="remove(i)">
          <IconClose />
        </p-button>
      </p-pdf-object-addon>
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue
<template>
  <p-pdf-viewer :src="FILE">
    <template #header>
      <p-button color="primary" class="float-right my-4" @click="add">
        Add Object
      </p-button>
    </template>
    <p-pdf-object
      v-for="(object, i) in objects"
      :key="object._id"
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
      <p-pdf-object-addon>
        <p-button size="sm" icon color="danger" @click="remove(i)">
          <IconClose />
        </p-button>
      </p-pdf-object-addon>
    </p-pdf-object>
  </p-pdf-viewer>
</template>

<script setup lang="ts">
  import FILE from '~/assets/Calibrator-v3.pdf?url'

  interface PDFObject {
    _id: symbol,
    page?: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  }

  const objects = reactive<PDFObject[]>([])

  function add () {
    objects.push({
      _id   : Symbol('ObjectId'),
      page  : undefined,
      x     : undefined,
      y     : undefined,
      width : undefined,
      height: undefined,
    })
  }

  function remove (index: number) {
    objects.splice(index, 1)
  }
</script>
```

### Addon Position

You can also change addon position using prop `position`. valid value is: `left`, `top`, `right`, and `bottom`. Default is `right`

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      :page="1"
      :x="100"
      :y="100"
      :width="198"
      :height="106">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/198x106/23B242/ffffff" />
      <p-pdf-object-addon position="left">
        This is Addon
      </p-pdf-object-addon>
      <p-pdf-object-addon position="top">
        Drag to move
      </p-pdf-object-addon>
      <p-pdf-object-addon position="right">
        <p-button size="sm" icon color="danger">
          <IconClose />
        </p-button>
      </p-pdf-object-addon>
      <p-pdf-object-addon position="bottom">
        Drag the handle to resize
      </p-pdf-object-addon>
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue
<template>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      :page="1"
      :x="100"
      :y="100"
      :width="198"
      :height="106">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/198x106/23B242/ffffff" />
      <p-pdf-object-addon position="left">
        This is Addon
      </p-pdf-object-addon>
      <p-pdf-object-addon position="top">
        Drag to move
      </p-pdf-object-addon>
      <p-pdf-object-addon position="right">
        <p-button size="sm" icon color="danger">
          <IconClose />
        </p-button>
      </p-pdf-object-addon>
      <p-pdf-object-addon position="bottom">
        Drag the handle to resize
      </p-pdf-object-addon>
    </p-pdf-object>
  </p-pdf-viewer>
</template>
```

## Autofocus

Add prop `autofocus` focus on object when the object mounted.

**Try it**

<p-button @click="show">Test</p-button>

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-if="isShow"
      :page="page"
      :x="100"
      :y="100"
      :width="198"
      :height="106"
      autofocus>
      <img class="w-full h-full rounded" src="https://via.placeholder.com/198x106/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue{10}
<template>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-if="isShow"
      :page="page"
      :x="100"
      :y="100"
      :width="198"
      :height="106"
      autofocus>
      <img class="w-full h-full rounded" src="https://via.placeholder.com/198x106/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</template>
```

## Debug Mode

Add prop `debug` to enable debug mode.

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object2.page"
      v-model:x="object2.x"
      v-model:y="object2.y"
      v-model:width="object2.width"
      v-model:height="object2.height"
      debug>
      <img class="w-full h-full rounded" src="https://via.placeholder.com/198x106/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue{9}
<template>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height"
      debug>
      <img class="w-full h-full rounded" src="https://via.placeholder.com/198x106/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</template>
```


## Disabled Move

To disable object move, set prop `moveable` to `false`.

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      :page="1"
      :x="400"
      :y="300"
      :width="198"
      :height="106"
      :moveable="false">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue{9}
<template>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      :page="1"
      :x="400"
      :y="300"
      :width="198"
      :height="106"
      :moveable="false">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</template>
```

## Disabled Resize

To disable object resize, set prop `resizable` to `false`.

<preview>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object3.page"
      v-model:x="object3.x"
      v-model:y="object3.y"
      v-model:width="object3.width"
      v-model:height="object3.height"
      :resizable="false">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</preview>

```vue{9}
<template>
  <p-pdf-viewer :src="FILE">
    <p-pdf-object
      v-model:page="object.page"
      v-model:x="object.x"
      v-model:y="object.y"
      v-model:width="object.width"
      v-model:height="object.height"
      :resizable="false">
      <img class="w-full h-full rounded" src="https://via.placeholder.com/430x230/23B242/ffffff" />
    </p-pdf-object>
  </p-pdf-viewer>
</template>
```

## API

### Props `<p-pdf-object>`

| Props       |   Type    | Default | Description                                                             |
|-------------|:---------:|:-------:|-------------------------------------------------------------------------|
| `x`         | `Number`  |   `-`   | Object x position                                                       |
| `y`         | `Number`  |   `-`   | Object y position                                                       |
| `page`      | `Number`  |   `-`   | Object page position                                                    |
| `width`     | `Number`  |  `198`  | Object width                                                            |
| `height`    | `Number`  |  `106`  | Object height                                                           |
| `minWidth`  | `Number`  |   `-`   | Minimum object width when resized, default is half of object's width    |
| `minHeight` | `Number`  |   `-`   | Minimum object height when resized, default is half of object's height  |
| `maxWidth`  | `Number`  |   `-`   | Maximum object width when resized, default is twice of object's width   |
| `maxHeight` | `Number`  |   `-`   | Maximum object height when resized, default is twice of object's height |
| `moveable`  | `Boolean` | `true`  | Enable object to move                                                   |
| `resizable` | `Boolean` | `true`  | Enable object to resize                                                 |
| `autofocus` | `Boolean` | `false` | Focus on object when object mounted                                     |
| `debug`     | `Boolean` | `false` | Enable object debugger                                                  |

### Slots `<p-pdf-object>`

| Name      | Description                                  |
|-----------|----------------------------------------------|
| `default` | Content to place inside the `<p-pdf-object>` |

### Props `<p-pdf-object-addon>`

| Props      |   Type   | Default | Description                                                   |
|------------|:--------:|:-------:|---------------------------------------------------------------|
| `position` | `String` | `right` | Addon position, valid value: `left`, `right`, `top`, `bottom` |

### Slots `<p-pdf-object-addon>`

| Name      | Description                                        |
|-----------|----------------------------------------------------|
| `default` | Content to place inside the `<p-pdf-object-addon>` |

## See Also

- [PDF Viewer](/components/pdf-viewer/)
