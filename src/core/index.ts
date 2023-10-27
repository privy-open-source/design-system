export {
  useSingleton,
  removeSingleton,
  resetInstance,
} from '../components/global/use-singleton'

export {
  hideOverlay,
  showOverlay,
} from '../components/overlay'

export {
  hideTooltip,
  showTooltip,
  toggleTooltip,
} from '../components/tooltip'

export {
  default as toast,
} from '../components/toast'

export * as dialog from '../components/dialog'

export {
  type SelectItem,
  defineOptions,
} from '../components/select'

export {
  default as defineAsyncAdapter,
} from '../components/select/adapter/async-adapter'

export {
  default as FuzzyAdapter,
} from '../components/select/adapter/fuzzy-adapter'

export {
  default as BasicAdapter,
} from '../components/select/adapter/basic-adapter'

export {
  defineMenu,
  filterMenu,
} from '../components/sidebar-menu'

export {
  defineTable,
} from '../components/table'

export {
  toBase64,
  fromBase64,
} from '../components/utils/base64'

export {
  default as CaptureAdapter,
} from '../components/camera/adapter/capture'

export {
  default as LivenessAdapter,
} from '../components/camera/adapter/liveness'

export {
  default as QrCodeAdapter,
} from '../components/camera/adapter/qr-code'

export {
  defineAdapter,
} from '../components/camera/adapter/adapter'

export {
  defineFilter,
} from '../components/filterbar'

export {
  markdown,
} from '../components/markdown'

export {
  useStore,
  initStore,
  createStore,
  setStore,
  setLang,
  getLang,
  useLang,
  type State,
} from '../components/global/store'

export {
  useRouter,
  installRouter,
} from '../components/global/router'

export {
  createTour,
} from '../components/tour'

export {
  usePasswordStrength,
} from '../components/input-password'

export {
  usePreview,
} from '../components/cropper'

export {
  usePdfContext,
} from '../components/pdf-viewer'

export {
  defineNavigation,
} from '../components/breadcrumbs'

export type {
  PdfHelipadResult,
} from '../components/pdf-helipad'

export {
  useStep,
} from '../components/steps'

export {
  defineAccordion,
} from '../components/accordion'

export {
  useVModel,
} from '../components/input'

export {
  installLocale,
  formatDate,
} from '../components/utils/date'

export {
  default as useLoading,
} from '../components/overlay/utils/use-loading'

export {
  findAllChildren,
  toBoolean,
} from '../components/utils/vnode'

export {
  createSpinner,
  createAlias,
  createText,
} from '../components/avatar/utils/create-image'

export {
  useSelector,
} from '../components/pdf-object/utils/use-selector'
