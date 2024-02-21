import type { MaybeRef } from '@vueuse/core'
import {
  onBeforeUnmount, ref, unref,
} from 'vue-demi'
import type { Options, Splide } from '@splidejs/splide'
import defu from 'defu'

export type TimeLimitation = Date | TimeModel | undefined

export interface TimeModel {
  hh: string,
  mm: string,
  a?: 'AM' | 'PM' | '-',
}

export interface TimeContext {
  time: string,
  date: Date,
  dateISO: string,
}

export function useTime () {
  const splide       = ref<Splide>()
  const activeSplide = ref(1)

  async function initSplide (element: MaybeRef<HTMLDivElement>, options?: Options) {
    const { Splide } = await import('@splidejs/splide')

    const container     = unref(element)
    const splideOptions = defu<Options, [Options]>(options, {
      direction   : 'ttb',
      height      : '9rem',
      width       : '100%',
      focus       : 'center',
      perPage     : 3,
      perMove     : 1,
      arrows      : false,
      wheel       : true,
      wheelSleep  : 150,
      isNavigation: true,
      pagination  : false,
    })

    splide.value = new Splide(container, splideOptions)

    initSplideEvent()
  }

  function initSplideEvent () {
    if (!splide.value)
      return

    splide.value.on('mounted', onTimeLoad)
    splide.value.on('move', onTimeChange)
    splide.value.mount()
  }

  function onTimeLoad () {
    if (!splide.value)
      return

    activeSplide.value = splide.value.index
  }

  function onTimeChange (index: number) {
    activeSplide.value = index
  }

  onBeforeUnmount(() => {
    splide.value?.destroy()
  })

  return {
    splide,
    activeSplide,
    initSplide,
    initSplideEvent,
  }
}
