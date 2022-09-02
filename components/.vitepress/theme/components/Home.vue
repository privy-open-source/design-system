<template>
  <div class="flex flex-col items-center justify-center pt-8">
    <img class="py-7" src="/assets/logo.svg" alt="icon privy" width="150" height="150">

    <div class="flex h-full">
      <div class="px-3 border-r">
        <img src="/assets/icon-privy.svg" alt="icon privy">
      </div>
      <div class="px-3">
        <Badge>
          Official
        </Badge>
        <Heading class="mt-2">
          <span class="text-primary-100">Persona</span> Design System
        </Heading>
        <Subheading>
          By PrivyID
        </Subheading>
      </div>
    </div>

    <div class="flex gap-2 mt-10">
      <Button size="lg" @click="gettingStarted">
        Get Started
      </Button>
      <Button size="lg" variant="ghost" @click="openGithub">
        View on Github
        <IconGithub></IconGithub>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue-demi"
  import Heading from "../../../heading/Heading.vue"
  import Subheading from "../../../subheading/Subheading.vue"
  import Badge from "../../../badge/Badge.vue"
  import Button from "../../../button/Button.vue"
  import { useRouter, withBase } from "vitepress"
  import IconGithub from "@carbon/icons-vue/lib/logo--github/20"

  export default defineComponent({
    components: { Heading, Subheading, Badge, Button, IconGithub },
    setup () {
      const router = useRouter()

      function gettingStarted () {
        router.go(withBase('/getting-started'))
      }

      function openGithub () {
        window.open('https://github.com/privy-open-source/design-system', '_blank')
      }

      return {
        gettingStarted,
        openGithub,
      }
    }
  })
</script>
