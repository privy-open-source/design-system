import '@testing-library/jest-dom'
import 'jest-extended/all'
import { noop } from 'lodash-es'
import { File as _File } from 'happy-dom'

console.warn    = noop
globalThis.File = _File as unknown as typeof File
