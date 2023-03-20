import { type Component } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'

import styles from './Toggle.module.css'

// TODO(HiDeoo) aria
// TODO(HiDeoo) logo
export const Toggle: Component = () => {
  const { isOverlayOpened, toggleOverlay } = useDevtools()

  return (
    <button
      class={styles['toggle']}
      classList={{ [String(styles['closed'])]: !isOverlayOpened(), [String(styles['opened'])]: isOverlayOpened() }}
      onClick={toggleOverlay}
    >
      {isOverlayOpened() ? 'Close' : 'Open'}
    </button>
  )
}
