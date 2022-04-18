
import { render, fireEvent } from "@testing-library/vue"
import { nextTick } from "vue-demi"
import Overlay from "./Overlay.vue"

it('should able to display overlay', async () => {
  const screen = render({
    components: { Overlay },
    template  : `
      <div>
        <Overlay ref="overlay" />
      </div>
    `,
    mounted () {
      this.$refs.overlay.show()
    }
  })

  await nextTick()

  const overlay = screen.queryByTestId('overlay')

  expect(overlay).toBeInTheDocument()
  expect(overlay).toHaveClass('overlay')
})

it('should diplay overlay if "show" called', async () => {
  const screen = render({
    components: { Overlay },
    template  : `
      <div>
        <Overlay ref="overlay" />
        <button @click="showOverlay">Show</button>
      </div>
    `,
    methods: {
      showOverlay() {
        this.$refs.overlay.show()
      }
    }
  })

  const showBtn = screen.queryByText('Show')

  await fireEvent.click(showBtn)

  const overlay = screen.queryByTestId('overlay')

  expect(overlay).toBeInTheDocument()
})

it('should hide overlay if "hide" called', async () => {
  const screen = render({
    components: { Overlay },
    template  : `
      <div>
        <Overlay ref="overlay" />
        <button @click="hideOverlay">Hide</button>
      </div>
    `,
    mounted () {
      this.$refs.overlay.show()
    },
    methods: {
      hideOverlay() {
        this.$refs.overlay.hide()
      }
    }
  })

  await nextTick()

  const overlay = screen.queryByTestId('overlay')
  const hideBtn = screen.queryByText('Hide')

  expect(overlay).toBeInTheDocument()

  await fireEvent.click(hideBtn)

  expect(overlay).not.toBeInTheDocument()
})
