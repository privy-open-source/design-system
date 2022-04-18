
import { useSingleton } from "../global/use-singleton"
import Overlay from "./Overlay.vue"

export async function showOverlay() {
  (await useSingleton(Overlay)).show()
}

export async function hideOverlay() {
  (await useSingleton(Overlay)).hide()
}
