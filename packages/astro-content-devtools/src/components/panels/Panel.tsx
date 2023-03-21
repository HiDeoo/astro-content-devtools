import { type ParentComponent } from 'solid-js'

import styles from './Panel.module.css'

export const Panel: ParentComponent = (props) => {
  return <div class={styles['panel']}>{props.children}</div>
}
