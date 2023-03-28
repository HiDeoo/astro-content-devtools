import { type Component, Show } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'

import styles from './Toggle.module.css'
import { VisuallyHidden } from './VisuallyHidden'

export const Toggle: Component = () => {
  const { isOverlayOpened, toggleOverlay } = useDevtools()

  const label = () => `${isOverlayOpened() ? 'Close' : 'Open'} Astro Content Devtools`

  return (
    <button
      aria-controls="AstroContentDevtools"
      aria-expanded={isOverlayOpened()}
      aria-haspopup="true"
      aria-label={label()}
      class={styles.toggle}
      classList={{ [styles.closed!]: !isOverlayOpened(), [styles.opened!]: isOverlayOpened() }}
      onClick={toggleOverlay}
    >
      <Show
        when={isOverlayOpened()}
        fallback={
          <>
            <svg
              aria-hidden="true"
              class={styles.icon}
              height="256"
              width="256"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="M157.589 139.135C181.038 106.838 178.227 61.2684 149.128 32.1657C116.903 -0.055848 64.465 -0.055848 32.2439 32.1657C0.0142429 64.3949 0.0142429 116.825 32.2439 149.054C61.342 178.152 106.912 180.964 139.205 157.519L145.593 163.9L163.974 145.519L157.589 139.135ZM133.102 133.032C109.678 156.452 71.6943 156.456 48.2662 133.032C24.8385 109.604 24.8385 71.6166 48.2662 48.1925C71.6947 24.7684 109.678 24.7684 133.102 48.1925C156.53 71.6166 156.53 109.604 133.102 133.032Z" />
                <path d="M233.283 205.023L171.22 149.584L149.666 171.137L205.101 233.205C210.738 240.498 220.888 239.426 230.009 230.305C239.125 221.188 240.58 210.66 233.283 205.023Z" />
                <g>
                  <path d="M74.6395 126.482C69.3922 121.774 67.8605 111.883 70.0466 104.716C73.8372 109.234 79.0894 110.666 84.5297 111.474C92.9283 112.72 101.176 112.254 108.978 108.486C109.871 108.055 110.696 107.481 111.671 106.901C112.403 108.985 112.593 111.09 112.338 113.231C111.716 118.448 109.071 122.477 104.864 125.532C103.182 126.754 101.402 127.846 99.6648 128.998C94.3273 132.539 92.8831 136.69 94.8888 142.73C94.9365 142.877 94.9791 143.024 95.0869 143.383C92.3618 142.186 90.3711 140.443 88.8544 138.151C87.2524 135.733 86.4902 133.057 86.4501 130.162C86.4301 128.753 86.4301 127.332 86.237 125.943C85.7657 122.557 84.1461 121.041 81.0951 120.954C77.9639 120.864 75.4869 122.764 74.83 125.756C74.7799 125.986 74.7072 126.213 74.6345 126.479L74.6395 126.482Z" />
                  <path d="M48.25 106.91C48.25 106.91 62.5978 99.9758 76.9857 99.9758L87.8337 66.6678C88.2397 65.057 89.4257 63.9624 90.7644 63.9624C92.1032 63.9624 93.289 65.057 93.6952 66.6678L104.543 99.9758C121.583 99.9758 133.279 106.91 133.279 106.91C133.279 106.91 108.908 41.0421 108.86 40.91C108.161 38.9626 106.98 37.7083 105.388 37.7083H76.1434C74.5514 37.7083 73.4182 38.9626 72.671 40.91C72.6184 41.0396 48.25 106.91 48.25 106.91Z" />
                </g>
              </g>
            </svg>
            <VisuallyHidden>{label()}</VisuallyHidden>
          </>
        }
      >
        <svg
          aria-hidden="true"
          class={styles.icon}
          height="32"
          width="32"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
        <VisuallyHidden>{label()}</VisuallyHidden>
      </Show>
    </button>
  )
}
