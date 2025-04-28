/* eslint-disable no-console */
/* eslint-disable unicorn/prefer-top-level-await */
import { fixPath } from './fix-svg.js'

async function main () {
  const input  = 'M11.9999 2C11.6317 2 11.3333 2.29848 11.3333 2.66667V4C11.3333 4.36819 11.6317 4.66667 11.9999 4.66667H13.3333C13.7014 4.66667 13.9999 4.36819 13.9999 4V2.66667C13.9999 2.29848 13.7014 2 13.3333 2H11.9999ZM12.3333 3V3.66667H12.9999V3H12.3333Z'
  const output = fixPath(input)

  console.log(output)
}

void main()
