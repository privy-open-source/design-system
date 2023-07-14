---
title: Carousel · Components
description: Slideshow for cycling through a series of content.
---

<script setup>
  import pCarousel from './Carousel.vue'
  import pCarouselItem from './CarouselItem.vue'
  import pCard from '../card/Card.vue'
  import pCaption from '../caption/Caption.vue'
  import pBanner from '../banner/Banner.vue'
  import IconRight from '@privyid/persona-icon/vue/chevron-right/32.vue'
  import { ref } from 'vue-demi'

  const active = ref(1)
  const check  = ref(false)
</script>

# Carousel

> Slideshow for cycling through a series of content.

## Usage

### Simple Usage

<button @click="check = !check">Check ({{ check }})</button>

<preview>
  <p-carousel>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/34/600/400" />
    </p-carousel-item>
    <p-carousel-item v-if="check">
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/57/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/70/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/83/600/400" />
    </p-carousel-item>
  </p-carousel>
</preview>

```vue
<template>
  <p-carousel>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/34/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/57/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/70/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/83/600/400" />
    </p-carousel-item>
  </p-carousel>
</template>
```

### With Card Component

<preview>
  <p-carousel direction="vertical" height="5rem" >
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          PrivyBalance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          E-materai Balance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
  </p-carousel>
</preview>

```vue
<template>
  <p-carousel direction="vertical" height="5rem" >
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          PrivyBalance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          E-materai Balance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
  </p-carousel>
</template>
```

## Vertical Mode

Set prop `direction` to `vertical` to enable Vertical Mode.

<p-banner variant="danger">
  In <b>Vertical Mode</b>, the height must be set
</p-banner>

<preview>
  <p-carousel direction="vertical" height="400px">
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/34/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/57/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/70/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/83/600/400" />
    </p-carousel-item>
  </p-carousel>
</preview>

```vue
<template>
  <p-carousel direction="vertical" height="400px">
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/34/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/57/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/70/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/83/600/400" />
    </p-carousel-item>
  </p-carousel>
</template>
```

## Progress Alignment

You can set position of progress indicator using prop `align`, `start` or `end`. default value is `end`.

<preview>
  <p-carousel direction="vertical" height="5rem" align="start" >
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          PrivyBalance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          E-materai Balance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
  </p-carousel>

  <p-carousel direction="vertical" height="5rem" align="end" >
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          PrivyBalance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          E-materai Balance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
  </p-carousel>
</preview>

```vue
<template>
  <p-carousel direction="vertical" height="5rem" align="start" >
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          PrivyBalance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          E-materai Balance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
  </p-carousel>

  <p-carousel direction="vertical" height="5rem" align="end" >
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          PrivyBalance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
    <p-carousel-item>
      <p-card
        element="div"
        class="flex items-center w-full h-full p-4 space-x-4 bg-default dark:bg-dark-default text-default dark:text-dark-default"
        sectioned>
        <div class="flex-grow">
          E-materai Balance
          <div class="text-lg font-bold text-info">
            999999
          </div>
        </div>
        <IconRight />
      </p-card>
    </p-carousel-item>
  </p-carousel>
</template>
```

## Loop Over

<preview>
  <p-carousel loop>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/6/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="300" height="100" src="https://picsum.photos/id/6/300/100" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/7/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/8/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/9/600/400" />
    </p-carousel-item>
  </p-carousel>
</preview>

```vue
<template>
  <p-carousel loop>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/6/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="300" height="100" src="https://picsum.photos/id/6/300/100" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/7/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/8/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/9/600/400" />
    </p-carousel-item>
  </p-carousel>
</template>
```

## Autoplay

<preview>
  <p-carousel loop autoplay autoplay-interval="3000">
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/34/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/57/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/70/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/83/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/59/600/400" />
    </p-carousel-item>
  </p-carousel>
</preview>

```vue
<template>
  <p-carousel loop autoplay autoplay-interval="3000">
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/34/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/57/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/70/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/83/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/59/600/400" />
    </p-carousel-item>
  </p-carousel>
</template>
```

## Binding v-model

You can binding current active with v-model

<preview>
  <p-carousel v-model="active">
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/34/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/57/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/70/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/83/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/59/600/400" />
    </p-carousel-item>
  </p-carousel>
</preview>

**Active :**

<pre><code>{{ active }}</code></pre>

```vue
<template>
  <p-carousel v-model="active">
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/34/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/57/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/70/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/83/600/400" />
    </p-carousel-item>
    <p-carousel-item>
      <img class="object-cover w-full h-full" width="600" height="400" src="https://picsum.photos/id/59/600/400" />
    </p-carousel-item>
  </p-carousel>
</template>
```

## API

### Props

| Props              |   Type    |   Default    | Description                                                                      |
|--------------------|:---------:|:------------:|----------------------------------------------------------------------------------|
| `direction`        | `String`  | `horizontal` | Carousel direction, valid values is `horizontal`, `vertical`                     |
| `align`            | `String`  |    `end`     | Carousel's progress indicator position, valid values is `horizontal`, `vertical` |
| `width`            | `String`  |    `100%`    | Carousel's width                                                                 |
| `height`           | `String`  |     `-`      | Carousel's height, <b>required if using direction `vertical`</b>                 |
| `loop`             | `Boolean` |   `false`    | Enable loop mode                                                                 |
| `autoplay`         | `Boolean` |   `false`    | Enable autoplay                                                                  |
| `autoplayInterval` | `Number`  |    `5000`    | Autoplay interval, in milliseconds                                               |
| `noProgress`       | `Boolean` |   `false`    | Hide progress indicator                                                          |
| `splideOptions`    | `Object`  |     `-`      | Override splide options, see [here][splide-options]                              |
| `modelValue`       | `Number`  |     `1`      | v-model active value                                                             |

### Slots

| Name      | Description                                 |
|-----------|---------------------------------------------|
| `default` | Content to place in the `<p-carousel-item>` |

### Events

| Name     | Arguments     | Description         |
|----------|---------------|---------------------|
| `change` | Slide's index | Event slide changed |

[splide-options]: https://splidejs.com/guides/options/
