import { fireEvent, render } from '@testing-library/vue'
import pPopover from './Popover.vue'
import { usePopoverPromise } from '.'
import { delay } from 'nanodelay'
import { vi } from 'vitest'

describe('usePopoverPromise', () => {
  it('should open and wait the result', async () => {
    const popoverPromise = usePopoverPromise()
    const screen         = render({
      components: { pPopover },
      template  : `
        <p-popover v-bind="popoverPromise.bind()">
          <template #activator>
            <a href="javascript:void" data-testid="ask">
              Remove?
            </a>
          </template>
          <template #default>
            <div class="flex items-center space-x-2">
              <span>Are you sure?</span>
              <p-button data-testid="confirm" @click="popoverPromise.finish(true)">
                Yes
              </p-button>
              <p-button data-testid="cancel" @click="popoverPromise.finish(false)">
                Cancel
              </p-button>
            </div>
          </template>
        </p-popover>
      `,
      setup () {
        return { popoverPromise }
      },
    })

    const popover = screen.queryByTestId('popover')
    const tooltip = screen.queryByTestId('popover-tooltip')

    expect(popover).toBeInTheDocument()
    expect(tooltip).not.toBeVisible()

    const spy = vi.fn()
    popoverPromise.start().then(spy)

    await delay(1)

    expect(tooltip).toBeVisible()

    await fireEvent.click(screen.queryByTestId('confirm'))

    expect(tooltip).not.toBeVisible()
    expect(spy).toBeCalledWith(true)
  })

  it('should reject the promise if popoverPromise finished with an Error', async () => {
    const popoverPromise = usePopoverPromise()
    const screen         = render({
      components: { pPopover },
      template  : `
        <p-popover v-bind="popoverPromise.bind()">
          <template #activator>
            <a href="javascript:void" data-testid="ask">
              Remove?
            </a>
          </template>
          <template #default>
            <div class="flex items-center space-x-2">
              <span>Are you sure?</span>
              <p-button data-testid="confirm" @click="popoverPromise.finish(true)">
                Yes
              </p-button>
              <p-button data-testid="cancel" @click="sendError">
                Cancel
              </p-button>
            </div>
          </template>
        </p-popover>
      `,
      setup () {
        function sendError () {
          popoverPromise.finish(new Error('this is error'))
        }

        return { popoverPromise, sendError }
      },
    })

    const popover = screen.queryByTestId('popover')
    const tooltip = screen.queryByTestId('popover-tooltip')

    expect(popover).toBeInTheDocument()
    expect(tooltip).not.toBeVisible()

    const promise = popoverPromise.start()

    await delay(1)

    expect(tooltip).toBeVisible()

    await fireEvent.click(screen.queryByTestId('cancel'))

    expect(tooltip).not.toBeVisible()

    await expect(promise).toReject()
  })

  it('should return empty result if click outside', async () => {
    const popoverPromise = usePopoverPromise()
    const screen         = render({
      components: { pPopover },
      template  : `
        <p-popover v-bind="popoverPromise.bind()">
          <template #activator>
            <a href="javascript:void" data-testid="ask">
              Remove?
            </a>
          </template>
          <template #default>
            <div class="flex items-center space-x-2">
              <span>Are you sure?</span>
              <p-button data-testid="confirm" @click="popoverPromise.finish(true)">
                Yes
              </p-button>
              <p-button data-testid="cancel" @click="popoverPromise.finish(false)">
                Cancel
              </p-button>
            </div>
          </template>
        </p-popover>
      `,
      setup () {
        return { popoverPromise }
      },
    })

    const popover = screen.queryByTestId('popover')
    const tooltip = screen.queryByTestId('popover-tooltip')

    expect(popover).toBeInTheDocument()
    expect(tooltip).not.toBeVisible()

    const spy = vi.fn()
    popoverPromise.start().then(spy)

    await delay(1)

    expect(tooltip).toBeVisible()

    await fireEvent.click(window)
    await delay(0)

    expect(tooltip).not.toBeVisible()
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(spy).toBeCalledWith(undefined)
  })
})
