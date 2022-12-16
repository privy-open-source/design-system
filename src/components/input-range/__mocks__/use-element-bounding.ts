import { ref } from 'vue-demi'

export function useElementBounding () {
  return {
    left : ref(0),
    width: ref(100),
  }
}
