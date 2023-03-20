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
        [String(styles['singleColumn'])]: props.singleColumn,
      }}
    >
      {props.children}
    </div>
  )
}

interface PanelProps {
  singleColumn?: boolean
}
