import PQueue from 'p-queue'
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
  InjectionKey,
} from 'vue-demi'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export type Component = DefineComponent<{}, {}, any>
export type ComponentInstance<C extends Component> = InstanceType<C>

export interface GlobalInstance<C extends Component> { component: C, ref: Ref<ComponentInstance<C>> }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let instances: Ref<Map<InjectionKey<Component>, GlobalInstance<any>>>
let container: App<Element>

const queue = new PQueue({ concurrency: 1 })

/**
 * Create global instance of component, It's will not create the instance if id exist
 * @param id Map's key indentifier
 * @param component Component class contructor
 */
async function createInstance<C extends Component> (id: InjectionKey<C>, component: C): Promise<ComponentInstance<C>> {
  if (!instances)
    instances = shallowRef(new Map())

  if (!container) {
    const target = document.createElement('div')
    const app    = createApp({
      name  : 'GlobalContainer',
      render: () => {
        return [...instances.value.values()]
          .map((item) => {
            return h(item.component, { ref: item.ref })
          })
      },
    })

    document.body.append(target)
    app.mount(target)

    target.id = 'global'
    container = app
  }

  let instance = instances.value.get(id)

  if (!instance) {
    instance = { component, ref: ref() }
    instances.value.set(id, instance)

    triggerRef(instances)

    await nextTick()
  }

  return unref(instance.ref)
}

/**
 * Remove component instance by id
 * @param id Map's key indentifier
 */
async function removeInstance<C extends Component> (id: InjectionKey<C>) {
  if (instances && container) {
    instances.value.delete(id)

    triggerRef(instances)

    await nextTick()
  }
}

/**
 * Reset all instances
 */
export async function resetInstance () {
  if (instances) {
    instances.value.clear()

    triggerRef(instances)

    await nextTick()
  }
}

/**
 * Create global component, return one if component is exist
 * @param component Vue Component
 */
export async function useSingleton<C extends Component> (component: C): Promise<ComponentInstance<C>> {
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  return await queue.add(() => createInstance(component as unknown as InjectionKey<C>, component))
}

/**
 * Remove global component
 * @param component Vue Component
 */
export async function removeSingleton<C extends Component> (component: C): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  return await queue.add(() => removeInstance(component as unknown as InjectionKey<C>))
}
