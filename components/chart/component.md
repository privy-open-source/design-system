<script setup>
  import pChart from './Chart.vue'
  import pChartSet from './ChartSet.vue'
  import pChartVal from './ChartVal.vue'
  import { ref } from 'vue-demi'
</script>

# Chart

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

## Variants

There 3 variant chart: `line`, `bar`, `pie`. default is `line`

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
      <p-chart-set name="Genre">
        <p-chart-val name="male" value="49" color="#408bdd" />
        <p-chart-val name="female" value="61" color="#eb6261" />
      </p-chart-set>
    </p-chart>
  </div>
</template>
```

## Legend location

You can set position of label using prop `legend`, valid value is `top`, `left`, `bottom`, `right`, `chartArea` and `none` to disabled.
Default is `bottom`.

<preview>
  <div class="grid grid-cols-2 gap-2">
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
  <div class="grid grid-cols-2 gap-2">
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

## API

### Props `<p-chart>`

| Props     |   Type   | Default  | Description                                                                            |
|-----------|:--------:|:--------:|----------------------------------------------------------------------------------------|
| `variant` | `String` |  `line`  | Chart type, valid value is `line`, `bar`, `pie`                                        |
| `legend`  | `String` | `bottom` | Legend position, valid value is  `top`, `left`, `bottom`, `right`, `chartArea`, `none` |

### Slots `<p-chart>`

| Name      | Description                             |
|-----------|-----------------------------------------|
| `default` | Content to place in the `<p-chart-set>` |

### Props `<p-chart-set>`

| Props  |   Type   | Default | Description           |
|--------|:--------:|:-------:|-----------------------|
| `name` | `String` |   `-`   | Chart's dataset label |

### Slots `<p-chart-set>`

| Name      | Description                             |
|-----------|-----------------------------------------|
| `default` | Content to place in the `<p-chart-val>` |

### Props `<p-chart-val>`

| Props   |   Type   | Default | Description                  |
|---------|:--------:|:-------:|------------------------------|
| `name`  | `String` |   `-`   | Chart's dataset series name  |
| `value` | `Number` |   `-`   | Chart's dataset series value |
| `color` | `String` |   `-`   | Chart's dataset series color |

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

