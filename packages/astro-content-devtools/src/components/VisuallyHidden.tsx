import { type ParentComponent } from 'solid-js'

import styles from './VisuallyHidden.module.css'

export const VisuallyHidden: ParentComponent = (props) => {
  return <span class={styles.hidden}>{props.children}</span>
}
