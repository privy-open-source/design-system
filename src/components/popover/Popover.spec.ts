import { fireEvent, render } from '@testing-library/vue'
import pPopover from './Popover.vue'

it('should able to show tooltip over activator element', async () => {
  const screen = render({
    components: { pPopover },
    template  : `
        <p-popover>
          <template #activator="{ toggle }">
            <a href="javascript:void" data-testid="activator" @click="toggle">
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
      return {}
    },
  })

  const popover   = screen.queryByTestId('popover')
  const tooltip   = screen.queryByTestId('popover-tooltip')
  const activator = screen.queryByTestId('activator')

  expect(popover).toBeInTheDocument()
  expect(tooltip).not.toBeVisible()

  await fireEvent.click(activator)

  expect(tooltip).toBeVisible()

  await fireEvent.click(activator)

  expect(tooltip).not.toBeVisible()
})
