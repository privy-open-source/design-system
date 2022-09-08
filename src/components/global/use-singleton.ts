import {
  DefineComponent,
  Ref,
  App,
  createApp,
  h,
  ref,
  unref,
  shallowRef,
  triggerRef,
  nextTick,
} from 'vue-demi'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export type Component = DefineComponent<{}, {}, any>
export type ComponentInstance<C extends Component> = InstanceType<C>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let instances: Ref<Map<Component, Ref<ComponentInstance<any>>>>
let container: App<Element>

export async function useSingleton<C extends Component> (component: C): Promise<ComponentInstance<C>> {
  if (!instances)
    instances = shallowRef(new Map())

  if (!container) {
    const target = document.createElement('div')
    const app    = createApp({
      name  : 'GlobalContainer',
      render: () => {
        return [...instances.value.entries()]
          .map(([element, cRef]) => {
            return h(element, { ref: cRef })
          })
      },
    })

    document.body.append(target)
    app.mount(target)

    target.id = 'global'
    container = app
  }

  let instance = instances.value.get(component)

  if (!instance) {
    instance = ref()
    instances.value.set(component, instance)

    triggerRef(instances)

    await nextTick()
  }

  return unref(instance)
}

export async function removeSingleton<C extends Component> (component: C): Promise<void> {
  if (instances && container) {
    instances.value.delete(component)

    triggerRef(instances)

    await nextTick()
  }
}

export async function resetSingleton () {
  if (instances) {
    instances.value.clear()

    triggerRef(instances)

    await nextTick()
  }
}
