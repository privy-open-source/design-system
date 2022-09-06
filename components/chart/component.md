<script setup>
  import pChart from './Chart.vue'
  import pChartSet from './ChartSet.vue'
  import pChartVal from './ChartVal.vue'
</script>

# Chart

Opinionated [Chart.js][chartjs] wrapper

## Usage

### Simple Usage

<preview>
  <p-chart legend="bottom">
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
  <p-chart legend="bottom">
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

[chartjs]: http://chartjs.org
