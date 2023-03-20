import { type ParentComponent } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'

import styles from './Panel.module.css'

export const Panel: ParentComponent = (props) => {
  const { isOverlayOpened } = useDevtools()

  return (
    <div class={styles['panel']} classList={{ [String(styles['opened'])]: isOverlayOpened() }}>
      {props.children}
    </div>
  )
}
