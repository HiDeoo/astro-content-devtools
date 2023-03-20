import { type ParentComponent } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'

import styles from './Panel.module.css'

export const Panel: ParentComponent<PanelProps> = (props) => {
  const { isOverlayOpened } = useDevtools()

  return (
    <div
      class={styles['panel']}
      classList={{
        [String(styles['opened'])]: isOverlayOpened(),
        [String(styles['column1'])]: props.columns === 1,
        [String(styles['columns3'])]: props.columns === 3,
        [String(styles['columns4'])]: props.columns === 4,
      }}
    >
      {props.children}
    </div>
  )
}

interface PanelProps {
  columns?: 1 | 3 | 4
}
