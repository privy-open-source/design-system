import type { Splide } from '@splidejs/splide'
import type { InjectionKey, Ref } from 'vue-demi'

export type AlignmentVariant = 'start' | 'end'

export const CAROUSEL_INSTANCE: InjectionKey<Ref<Splide>> = Symbol('CarouselInstance')
