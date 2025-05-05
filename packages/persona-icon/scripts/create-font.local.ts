/* eslint-disable no-console */
/* eslint-disable unicorn/prefer-top-level-await */
import { createFont } from './create-font.js'

async function main () {
  await createFont()
}

void main()
