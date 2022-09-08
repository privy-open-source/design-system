<script setup>
  import pCard from '../components/card/Card.vue'
  import pButton from '../components/button/Button.vue'
  import IconGithub from "@carbon/icons-vue/lib/logo--github/20"
</script>

# Ecosystem

## Official Package

<div class="space-y-4">
  <p-card
    title="@privyid/tailwind-preset"
    element="div"
    :dismissable="false"
    callout>
    <div class="flex items-start gap-x-8">
      <div class="w-3/4">
        Tailwind config presets which following our <a href="../foundation/">foundations</a>
        <div class="pt-8">
          <p-button variant="outline" color="secondary">
            View on Github
            <IconGithub></IconGithub>
          </p-button>
        </div>
      </div>
    </div>
  </p-card>

  <p-card
    title="@privyid/tailwind-extended"
    element="div"
    :dismissable="false"
    callout>
    <div class="flex items-start gap-x-8">
      <div class="w-3/4">
        Add missing tailwind utilities
        <div class="pt-8">
          <p-button variant="outline" color="secondary">
            View on Github
            <IconGithub></IconGithub>
          </p-button>
        </div>
      </div>
    </div>
  </p-card>

  <p-card
    title="@privyid/tailwind-animation"
    element="div"
    :dismissable="false"
    callout>
    <div class="flex items-start gap-x-8">
      <div class="w-3/4">
        Collection animation class for vue <code>&lt;transitions&gt;</code>
        <div class="pt-8">
          <p-button variant="outline" color="secondary">
            View on Github
            <IconGithub></IconGithub>
          </p-button>
        </div>
      </div>
    </div>
  </p-card>
</div>
