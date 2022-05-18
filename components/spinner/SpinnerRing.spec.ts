import { render } from "@testing-library/vue"
import Spinner from "./SpinnerRing.vue"

it('should render properly without any props', () => {
  const screen = render({
    components: { Spinner },
    template  : `<Spinner />`
  })

  const calendar = screen.getByTestId('spinner')

  expect(calendar).toBeInTheDocument()
  expect(calendar).toHaveClass('spinner')
})
