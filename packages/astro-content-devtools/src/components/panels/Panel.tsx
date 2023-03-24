import { type JSX, type ParentComponent } from 'solid-js'

import styles from './Panel.module.css'

export const Panel: ParentComponent<PanelProps> = (props) => {
  return (
    <div class={styles.panel} classList={{ [`acd-panel-${props.name}`]: true }} style={props.style} tabIndex={-1}>
      {props.children}
    </div>
  )
}

interface PanelProps {
  name: string
  style?: JSX.CSSProperties | string
}
