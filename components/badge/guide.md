<script setup>
  import Badge from './Badge.vue'
</script>

# ![badge](./assets/images/img-guide-badge.svg) Badge

## Usage
Badges are placed before/after the label of the thing they're quantifying, such as the number of notification/document received. They should only be used to represent a number, however, the following letters and special characters can be used to represent number values: + (represent more) or K (represent thousands).

##### Example
<Badge>25</Badge>
<Badge color="gold">7K</Badge>
<Badge variant="light" color="success">999+</Badge>

##### Rules
<div class="flex">
  <div class="w-1/2">
    Use badges in conjunction with a single item or label, to avoid ambiguity around which item is being quantified. Suggestion: 3 digit number max, excl. the special character.
  </div>
</div>
