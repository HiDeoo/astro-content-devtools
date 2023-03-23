import { type JSX, type ParentComponent } from 'solid-js'

import styles from './Panel.module.css'

export const Panel: ParentComponent<PanelProps> = (props) => {
  return (
    <div class={styles.panel} style={props.style}>
      {props.children}
    </div>
  )
}

interface PanelProps {
  style?: JSX.CSSProperties | string
}
