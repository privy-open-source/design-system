<template>
  <div class="flex flex-col items-center justify-center pt-8">
    <img
      class="py-7"
      src="/assets/images/logo.svg"
      alt="icon privy"
      width="150"
      height="150">

    <div class="flex h-full px-3">
      <div class="px-3 border-r">
        <img
          class="min-w-[2rem]"
          src="/assets/images/icon-privy.svg"
          alt="icon privy">
      </div>
      <div class="px-3">
        <Badge>
          Official
        </Badge>
        <Heading class="mt-2">
          <span class="text-accent">Persona</span> Design System
        </Heading>
        <Subheading>
          By PrivyID
        </Subheading>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center gap-2 mt-10 md:flex-row">
      <Button
        size="lg"
        @click="gettingStarted">
        Get Started
      </Button>
      <Button
        size="lg"
        variant="ghost"
        @click="openGithub">
        View on Github
        <IconGithub />
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import Heading from '../../../components/heading/Heading.vue'
import Subheading from '../../../components/subheading/Subheading.vue'
import Badge from '../../../components/badge/Badge.vue'
import Button from '../../../components/button/Button.vue'
import { useRouter, withBase } from 'vitepress'
import IconGithub from '@carbon/icons-vue/lib/logo--github/20'

export default defineComponent({
  components: {
    Heading,
    Subheading,
    Badge,
    Button,
    IconGithub,
  },
  setup () {
    const router = useRouter()

    function gettingStarted () {
      router.go(withBase('/docs/getting-started'))
    }

    function openGithub () {
      window.open('https://github.com/privy-open-source/design-system', '_blank')
    }

    return {
      gettingStarted,
      openGithub,
    }
  },
})
</script>
