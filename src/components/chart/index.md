---
title: Chart · Components
description: Show chart data, Powered by ChartJS
---

<script setup>
  import pChart from './Chart.vue'
  import pChartSet from './ChartSet.vue'
  import pChartVal from './ChartVal.vue'
  import { computed } from 'vue-demi'

  const data = computed(() => {
    return {
      labels: [
        'January',
        'February',
        'March',
        'April'
      ],
      datasets: [{
        type           : 'bar',
        label          : 'Bar Dataset',
        data           : [10, 20, 30, 40],
        borderColor    : 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
      }, {
        type       : 'line',
        label      : 'Line Dataset',
        data       : [10, 20, 30, 40],
        fill       : false,
        borderColor: 'rgb(54, 162, 235)'
      }]
    }
  })

  const options = computed(() => {
    return {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })

  const dataSales = computed(() => {
    return {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June'
      ],
      datasets: [{
        label                    : 'Data',
        data                     : [65, 55, 60, 45, 50, 30],
        borderColor              : 'rgb(2, 174, 197)',
        backgroundColor          : 'rgba(2, 174, 197, 0.2)',
        fill                     : true,
        pointBorderWidth         : 0,
        pointHoverBorderWidth    : 0,
        pointBackgroundColor     : 'transparent',
        pointHoverBackgroundColor: 'rgb(2, 174, 197)',
        tension                  : 0.35,
      }]
    }
  })

  const salesOptions = computed(() => {
    return {
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        }
      }
    }
  })
</script>

# Chart

> Show chart data, Powered by [ChartJS](https://chartjs.org)

## Usage

### Simple Usage

<preview>
  <p-chart>
    <p-chart-set name="January">
      <p-chart-val name="success" color="#23b242" value="30"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="February">
      <p-chart-val name="success" color="#23b242" value="20"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="March">
      <p-chart-val name="success" color="#23b242" value="100"  />
      <p-chart-val name="failed" color="#e42e2c" value="25" />
    </p-chart-set>
    <p-chart-set name="April">
      <p-chart-val name="success" color="#23b242" value="80"  />
      <p-chart-val name="failed" color="#e42e2c" value="20" />
    </p-chart-set>
    <p-chart-set name="May">
      <p-chart-val name="success" color="#23b242" value="150"  />
      <p-chart-val name="failed" color="#e42e2c" value="30" />
    </p-chart-set>
  </p-chart>
</preview>

```vue
<template>
  <p-chart>
    <p-chart-set name="January">
      <p-chart-val name="success" color="#23b242" value="30"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="February">
      <p-chart-val name="success" color="#23b242" value="20"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="March">
      <p-chart-val name="success" color="#23b242" value="100"  />
      <p-chart-val name="failed" color="#e42e2c" value="25" />
    </p-chart-set>
    <p-chart-set name="April">
      <p-chart-val name="success" color="#23b242" value="80"  />
      <p-chart-val name="failed" color="#e42e2c" value="20" />
    </p-chart-set>
    <p-chart-set name="May">
      <p-chart-val name="success" color="#23b242" value="150"  />
      <p-chart-val name="failed" color="#e42e2c" value="30" />
    </p-chart-set>
  </p-chart>
</template>
```

### Advance Usage

<preview>
  <p-chart :data="dataSales" :options="salesOptions" />
</preview>

```vue
<template>
  <p-chart :data="dataSales" :options="salesOptions" />
</template>

<script lang="ts" setup>
  const dataSales = computed(() => {
    return {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June'
      ],
      datasets: [{
        label                    : 'Data',
        data                     : [65, 55, 60, 45, 50, 30],
        borderColor              : 'rgb(2, 174, 197)',
        backgroundColor          : 'rgba(2, 174, 197, 0.2)',
        fill                     : true,
        pointBorderWidth         : 0,
        pointHoverBorderWidth    : 0,
        pointBackgroundColor     : 'transparent',
        pointHoverBackgroundColor: 'rgb(2, 174, 197)',
        tension                  : 0.35,
      }]
    }
  })

  const salesOptions = computed(() => {
    return {
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        }
      }
    }
  })
</script>
```

## Variants

Support all chart types provided by [ChartJS](https://chartjs.org):
  - `line`
  - `bar`
  - `radar`
  - `pie`
  - `doughnut`
  - `polarArea`
  - `scatter`
  - `bubble`

Default is `line`.

### type `line`

<preview>
  <p-chart variant="line">
    <p-chart-set name="January">
      <p-chart-val name="success" color="#23b242" value="30"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="February">
      <p-chart-val name="success" color="#23b242" value="20"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="March">
      <p-chart-val name="success" color="#23b242" value="100"  />
      <p-chart-val name="failed" color="#e42e2c" value="25" />
    </p-chart-set>
    <p-chart-set name="April">
      <p-chart-val name="success" color="#23b242" value="80"  />
      <p-chart-val name="failed" color="#e42e2c" value="20" />
    </p-chart-set>
    <p-chart-set name="May">
      <p-chart-val name="success" color="#23b242" value="150"  />
      <p-chart-val name="failed" color="#e42e2c" value="30" />
    </p-chart-set>
  </p-chart>
</preview>

```vue
<template>
  <p-chart variant="line">
    <p-chart-set name="January">
      <p-chart-val name="success" color="#23b242" value="30"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="February">
      <p-chart-val name="success" color="#23b242" value="20"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="March">
      <p-chart-val name="success" color="#23b242" value="100"  />
      <p-chart-val name="failed" color="#e42e2c" value="25" />
    </p-chart-set>
    <p-chart-set name="April">
      <p-chart-val name="success" color="#23b242" value="80"  />
      <p-chart-val name="failed" color="#e42e2c" value="20" />
    </p-chart-set>
    <p-chart-set name="May">
      <p-chart-val name="success" color="#23b242" value="150"  />
      <p-chart-val name="failed" color="#e42e2c" value="30" />
    </p-chart-set>
  </p-chart>
</template>
```

### type `bar`

<preview>
  <p-chart variant="bar">
    <p-chart-set name="January">
      <p-chart-val name="success" color="#23b242" value="30"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="February">
      <p-chart-val name="success" color="#23b242" value="20"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="March">
      <p-chart-val name="success" color="#23b242" value="100"  />
      <p-chart-val name="failed" color="#e42e2c" value="25" />
    </p-chart-set>
    <p-chart-set name="April">
      <p-chart-val name="success" color="#23b242" value="80"  />
      <p-chart-val name="failed" color="#e42e2c" value="20" />
    </p-chart-set>
    <p-chart-set name="May">
      <p-chart-val name="success" color="#23b242" value="150"  />
      <p-chart-val name="failed" color="#e42e2c" value="30" />
    </p-chart-set>
  </p-chart>
</preview>

```vue
<template>
  <p-chart variant="bar">
    <p-chart-set name="January">
      <p-chart-val name="success" color="#23b242" value="30"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="February">
      <p-chart-val name="success" color="#23b242" value="20"  />
      <p-chart-val name="failed" color="#e42e2c" value="10" />
    </p-chart-set>
    <p-chart-set name="March">
      <p-chart-val name="success" color="#23b242" value="100"  />
      <p-chart-val name="failed" color="#e42e2c" value="25" />
    </p-chart-set>
    <p-chart-set name="April">
      <p-chart-val name="success" color="#23b242" value="80"  />
      <p-chart-val name="failed" color="#e42e2c" value="20" />
    </p-chart-set>
    <p-chart-set name="May">
      <p-chart-val name="success" color="#23b242" value="150"  />
      <p-chart-val name="failed" color="#e42e2c" value="30" />
    </p-chart-set>
  </p-chart>
</template>
```

### type `radar`

<preview>
  <div class="w-1/2">
    <p-chart variant="radar">
      <p-chart-set name="Eating">
        <p-chart-val name="male" color="#408bdd" fill="#408bdd4f" value="65"  />
        <p-chart-val name="female" color="#eb6261" fill="#eb62614f" value="28" />
      </p-chart-set>
      <p-chart-set name="Drinking">
        <p-chart-val name="male" color="#408bdd" fill="#408bdd4f" value="59"  />
        <p-chart-val name="female" color="#eb6261" fill="#eb62614f" value="48" />
      </p-chart-set>
      <p-chart-set name="Sleeping">
        <p-chart-val name="male" color="#408bdd" fill="#408bdd4f" value="90"  />
        <p-chart-val name="female" color="#eb6261" fill="#eb62614f" value="40" />
      </p-chart-set>
      <p-chart-set name="Designing">
        <p-chart-val name="male" color="#408bdd" fill="#408bdd4f" value="81"  />
        <p-chart-val name="female" color="#eb6261" fill="#eb62614f" value="19" />
      </p-chart-set>
      <p-chart-set name="Coding">
        <p-chart-val name="male" color="#408bdd" fill="#408bdd4f" value="56"  />
        <p-chart-val name="female" color="#eb6261" fill="#eb62614f" value="96" />
      </p-chart-set>
    </p-chart>
  </div>
</preview>

```vue
<template>
  <div class="w-1/2">
    <p-chart variant="radar">
      <p-chart-set name="Eating">
        <p-chart-val name="male" color="#408bdd" fill="#408bdd4f" value="65"  />
        <p-chart-val name="female" color="#eb6261" fill="#eb62614f" value="28" />
      </p-chart-set>
      <p-chart-set name="Drinking">
        <p-chart-val name="male" color="#408bdd" fill="#408bdd4f" value="59"  />
        <p-chart-val name="female" color="#eb6261" fill="#eb62614f" value="48" />
      </p-chart-set>
      <p-chart-set name="Sleeping">
        <p-chart-val name="male" color="#408bdd" fill="#408bdd4f" value="90"  />
        <p-chart-val name="female" color="#eb6261" fill="#eb62614f" value="40" />
      </p-chart-set>
      <p-chart-set name="Designing">
        <p-chart-val name="male" color="#408bdd" fill="#408bdd4f" value="81"  />
        <p-chart-val name="female" color="#eb6261" fill="#eb62614f" value="19" />
      </p-chart-set>
      <p-chart-set name="Coding">
        <p-chart-val name="male" color="#408bdd" fill="#408bdd4f" value="56"  />
        <p-chart-val name="female" color="#eb6261" fill="#eb62614f" value="96" />
      </p-chart-set>
    </p-chart>
  </div>
</template>
```

### type `pie`

<preview>
  <div class="w-1/2">
    <p-chart variant="pie">
      <p-chart-set name="Gender">
        <p-chart-val name="male" value="49" color="#408bdd" />
        <p-chart-val name="female" value="61" color="#eb6261" />
      </p-chart-set>
    </p-chart>
  </div>
</preview>

```vue
<template>
  <div class="w-1/2">
    <p-chart variant="pie">
      <p-chart-set name="Gender">
        <p-chart-val name="male" value="49" color="#408bdd" />
        <p-chart-val name="female" value="61" color="#eb6261" />
      </p-chart-set>
    </p-chart>
  </div>
</template>
```

### type `doughnut`

<preview>
  <div class="w-1/2">
    <p-chart variant="doughnut">
      <p-chart-set name="Gender">
        <p-chart-val name="male" value="49" color="#408bdd" />
        <p-chart-val name="female" value="61" color="#eb6261" />
      </p-chart-set>
    </p-chart>
  </div>
</preview>

```vue
<template>
  <div class="w-1/2">
    <p-chart variant="doughnut">
      <p-chart-set name="Gender">
        <p-chart-val name="male" value="49" color="#408bdd" />
        <p-chart-val name="female" value="61" color="#eb6261" />
      </p-chart-set>
    </p-chart>
  </div>
</template>
```

### type `polarArea`

<preview>
  <div class="w-1/2">
    <p-chart variant="polarArea">
      <p-chart-set name="Area">
        <p-chart-val name="red" value="11" color="rgb(255, 99, 132)" />
        <p-chart-val name="green" value="16" color="rgb(75, 192, 192)" />
        <p-chart-val name="yellow" value="7" color="rgb(255, 205, 86)" />
        <p-chart-val name="grey" value="3" color="rgb(201, 203, 207)" />
        <p-chart-val name="blue" value="14" color="rgb(54, 162, 235" />
      </p-chart-set>
    </p-chart>
  </div>
</preview>

```vue
<template>
  <div class="w-1/2">
    <p-chart variant="polarArea">
      <p-chart-set name="Area">
        <p-chart-val name="red" value="11" color="rgb(255, 99, 132)" />
        <p-chart-val name="green" value="16" color="rgb(75, 192, 192)" />
        <p-chart-val name="yellow" value="7" color="rgb(255, 205, 86)" />
        <p-chart-val name="grey" value="3" color="rgb(201, 203, 207)" />
        <p-chart-val name="blue" value="14" color="rgb(54, 162, 235" />
      </p-chart-set>
    </p-chart>
  </div>
</template>
```

### type `bubble`

<preview>
  <p-chart variant="bubble">
    <p-chart-set name="Area" color="#408bdd">
      <p-chart-val :value="[11, 11, 3]" />
      <p-chart-val :value="[15, 2, 8]" />
      <p-chart-val :value="[25, 5, 30]" />
      <p-chart-val :value="[19, 10, 4]" />
    </p-chart-set>
  </p-chart>
</preview>

```vue
<template>
  <p-chart variant="bubble">
    <p-chart-set name="Area" color="#408bdd">
      <p-chart-val :value="[11, 11, 3]" />
      <p-chart-val :value="[15, 2, 8]" />
      <p-chart-val :value="[25, 5, 30]" />
      <p-chart-val :value="[19, 10, 4]" />
    </p-chart-set>
  </p-chart>
</template>
```

### type `scatter`

<preview>
  <p-chart variant="scatter">
    <p-chart-set name="Area" color="#408bdd">
      <p-chart-val :value="[11, 11]" />
      <p-chart-val :value="[15, 2]" />
      <p-chart-val :value="[25, 8]" />
      <p-chart-val :value="[19, 2]" />
    </p-chart-set>
  </p-chart>
</preview>

```vue
<template>
  <p-chart variant="scatter">
    <p-chart-set name="Area" color="#408bdd">
      <p-chart-val :value="[11, 11]" />
      <p-chart-val :value="[15, 2]" />
      <p-chart-val :value="[25, 8]" />
      <p-chart-val :value="[19, 2]" />
    </p-chart-set>
  </p-chart>
</template>
```

## Legend position

You can set position of label using prop `legend`, valid value is `top`, `left`, `bottom`, `right`, `chartArea` and `none` to disabled.
Default is `bottom`.

<preview>
  <div class="grid w-full grid-cols-2 gap-2">
    <p-chart variant="pie" legend="left">
      <p-chart-set name="Gender">
        <p-chart-val name="male" value="49" color="#408bdd" />
        <p-chart-val name="female" value="61" color="#eb6261" />
      </p-chart-set>
    </p-chart>
    <p-chart variant="pie" legend="right">
      <p-chart-set name="Gender">
        <p-chart-val name="male" value="49" color="#408bdd" />
        <p-chart-val name="female" value="61" color="#eb6261" />
      </p-chart-set>
    </p-chart>
  </div>
</preview>

```vue
<template>
  <div class="grid w-full grid-cols-2 gap-2">
    <p-chart variant="pie" legend="left">
      <p-chart-set name="Gender">
        <p-chart-val name="male" value="49" color="#408bdd" />
        <p-chart-val name="female" value="61" color="#eb6261" />
      </p-chart-set>
    </p-chart>
    <p-chart variant="pie" legend="right">
      <p-chart-set name="Gender">
        <p-chart-val name="male" value="49" color="#408bdd" />
        <p-chart-val name="female" value="61" color="#eb6261" />
      </p-chart-set>
    </p-chart>
  </div>
</template>
```

## Customization

If renderless not satisfies your needs, you can manually set the datasets and options via props `data` and `options`.

<preview>
  <p-chart
    variant="scatter"
    :data="data"
    :options="options" />
</preview>

```vue
<template>
  <p-chart
    variant="scatter"
    :data="data"
    :options="options" />
</template>

<script lang="ts" setup>
  const data = computed(() => {
    return {
      labels: [
        'January',
        'February',
        'March',
        'April'
      ],
      datasets: [{
        type           : 'bar',
        label          : 'Bar Dataset',
        data           : [10, 20, 30, 40],
        borderColor    : 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
      }, {
        type       : 'line',
        label      : 'Line Dataset',
        data       : [10, 20, 30, 40],
        fill       : false,
        borderColor: 'rgb(54, 162, 235)'
      }]
    }
  })

  const options = computed(() => {
    return {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
</script>
```

## API

### Props `<p-chart>`

| Props     |   Type   | Default  | Description                                                                                            |
|-----------|:--------:|:--------:|--------------------------------------------------------------------------------------------------------|
| `variant` | `String` |  `line`  | Chart type, valid value is `line`, `bar`, `radar`, `pie`, `doughnut`, `polarArea`, `scatter`, `bubble` |
| `legend`  | `String` | `bottom` | Legend position, valid value is  `top`, `left`, `bottom`, `right`, `chartArea`, `none`                 |
| `data`    | `Object` |   `-`    | Extends Chart's dataset                                                                                |
| `options` | `Object` |   `-`    | Extends Chart's options                                                                                |

### Slots `<p-chart>`

| Name      | Description                             |
|-----------|-----------------------------------------|
| `default` | Content to place in the `<p-chart-set>` |

### Props `<p-chart-set>`

| Props     |   Type   | Default | Description                                                             |
|-----------|:--------:|:-------:|-------------------------------------------------------------------------|
| `name`    | `String` |   `-`   | Chart's dataset label                                                   |
| `value`   | `Number` |   `-`   | Chart's dataset series value **(for `bubble` and `scatter` only)**      |
| `color`   | `String` |   `-`   | Chart's dataset series color **(for `bubble` and `scatter` only)**      |
| `fill`    | `String` |   `-`   | Chart's dataset series fill color **(for `bubble` and `scatter` only)** |
| `options` | `Object` |   `-`   | Chart's dataset options                                                 |

### Slots `<p-chart-set>`

| Name      | Description                             |
|-----------|-----------------------------------------|
| `default` | Content to place in the `<p-chart-val>` |

### Props `<p-chart-val>`

| Props     |   Type   | Default | Description                       |
|-----------|:--------:|:-------:|-----------------------------------|
| `name`    | `String` |   `-`   | Chart's dataset series name       |
| `value`   | `Number` |   `-`   | Chart's dataset series value      |
| `color`   | `String` |   `-`   | Chart's dataset series color      |
| `fill`    | `String` |   `-`   | Chart's dataset series fill color |
| `options` | `Object` |   `-`   | Chart's dataset options           |

### Slots `<p-chart-val>`

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2" class="text-center">There no slots here</td>
    </tr>
  </tbody>
</table>

