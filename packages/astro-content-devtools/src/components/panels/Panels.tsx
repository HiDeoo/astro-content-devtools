import { type ParentComponent } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { ErrorBoundary } from '../ErrorBoundary'

import styles from './Panels.module.css'

export const Panels: ParentComponent<PanelsProps> = (props) => {
  const { isOverlayOpened } = useDevtools()

  return (
    <div
      class={styles['devtools']}
      classList={{
        [String(styles['opened'])]: isOverlayOpened(),
        [String(styles['column1'])]: props.columns === 1,
        [String(styles['columns3'])]: props.columns === 3,
        [String(styles['columns4'])]: props.columns === 4,
      }}
    >
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </div>
  )
}

interface PanelsProps {
  columns: 1 | 3 | 4
}
