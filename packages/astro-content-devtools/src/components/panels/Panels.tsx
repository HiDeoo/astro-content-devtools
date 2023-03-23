import { type ParentComponent } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { ErrorBoundary } from '../ErrorBoundary'

import styles from './Panels.module.css'

export const Panels: ParentComponent<PanelsProps> = (props) => {
  const { isOverlayOpened } = useDevtools()

  return (
    <div
      class={styles.devtools}
      classList={{
        [styles.opened!]: isOverlayOpened(),
        [styles.column1!]: props.columns === 1,
        [styles.column2!]: props.columns === 2,
        [styles.columns3!]: props.columns === 3,
        [styles.columns4!]: props.columns === 4,
      }}
    >
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </div>
  )
}

interface PanelsProps {
  columns: 1 | 2 | 3 | 4
}
