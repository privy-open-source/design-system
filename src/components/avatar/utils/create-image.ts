import avatarImg from '../assets/avatar.png'
import { colorHash, colorRandom } from './color-hash'

export function createText (text: string, size: number, bgColor: string, textColor: string): string {
  return `data:image/svg+xml,<svg height="${size}" width="${size}" xmlns="http://www.w3.org/2000/svg"><rect fill="${encodeURIComponent(bgColor)}" x="0" y="0" height="${size}" width="${size}"></rect><text fill="${encodeURIComponent(textColor)}" dominant-baseline="central" text-anchor="middle" x="50%" y="50%" font-family="sans-serif" font-weight="600">${encodeURIComponent(text)}</text></svg>`
}

export function createSpinner (width = 50, height = width): string {
  return `data:image/svg+xml,<svg class="spinner spinner-basic" width="${width}" height="${height}" viewBox="0 0 19 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g transform="translate(4.75 4.75) scale(.5)"><rect class="spinner-basic__bar" x="8.125" width="2.5" height="6.25" rx="1.25" fill="currentColor" fill-opacity="60%"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0" repeatCount="indefinite" /></rect><rect class="spinner-basic__bar" x="15.1202" y="1.86199" width="2.5" height="6.25" rx="1.25" transform="rotate(45 15.1202 1.86199)" fill="currentColor" fill-opacity="60%"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0.125s" repeatCount="indefinite" /></rect><rect class="spinner-basic__bar" x="18.75" y="8.125" width="2.5" height="6.25" rx="1.25" transform="rotate(90 18.75 8.125)" fill="currentColor" fill-opacity="60%"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0.250s" repeatCount="indefinite" /></rect><rect class="spinner-basic__bar" x="16.888" y="15.1202" width="2.5" height="6.25" rx="1.25" transform="rotate(135 16.888 15.1202)" fill="currentColor" fill-opacity="60%"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0.375s" repeatCount="indefinite" /></rect><rect class="spinner-basic__bar" x="8.125" y="12.5" width="2.5" height="6.25" rx="1.25" fill="currentColor" fill-opacity="60%"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0.500s" repeatCount="indefinite" /></rect><rect class="spinner-basic__bar" x="6.2814" y="10.7008" width="2.5" height="6.25" rx="1.25" transform="rotate(45 6.2814 10.7008)" fill="currentColor" fill-opacity="60%"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0.625s" repeatCount="indefinite" /></rect><rect class="spinner-basic__bar" x="6.25" y="8.125" width="2.5" height="6.25" rx="1.25" transform="rotate(90 6.25 8.125)" fill="currentColor" fill-opacity="60%"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0.750s" repeatCount="indefinite" /></rect><rect class="spinner-basic__bar" x="8.04917" y="6.2814" width="2.5" height="6.25" rx="1.25" transform="rotate(135 8.04917 6.2814)" fill="currentColor" fill-opacity="60%"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0.875s" repeatCount="indefinite" /></rect></g></svg>`
}

export function getAlias (name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((c) => c.at(0))
    .join('')
    .toUpperCase()
}

export function createAlias (name?: string, size = 50): string {
  const alias                = name ? getAlias(name) : '･ᴗ･'
  const [bgColor, textColor] = name ? colorHash(name) : colorRandom()

  return createText(alias, size, bgColor, textColor)
}

export function dummyAvatar (): string {
  return avatarImg
}
