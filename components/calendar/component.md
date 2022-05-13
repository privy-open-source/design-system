<script setup>
  import Calendar from "./Calendar.vue"
  import { ref } from "vue-demi"

  const value = ref()
</script>


# Calendar

## Usage

### Simple Usage

<preview>
  <Calendar />
</preview>

### Disabled Date

<preview>
  <Calendar
    :min="new Date(2022, 4, 1)"
    :max="new Date()" />
</preview>
