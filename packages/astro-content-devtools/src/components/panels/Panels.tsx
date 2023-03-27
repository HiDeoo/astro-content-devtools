import { type ParentComponent } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { ErrorBoundary } from '../ErrorBoundary'

import styles from './Panels.module.css'

export const Panels: ParentComponent = (props) => {
  const { isOverlayOpened } = useDevtools()

  return (
    <div
      aria-hidden={!isOverlayOpened()}
      aria-label="Astro Content Devtools"
      class={styles.panels}
      classList={{ [styles.opened!]: isOverlayOpened() }}
      id="AstroContentDevtools"
    >
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </div>
  )
}
