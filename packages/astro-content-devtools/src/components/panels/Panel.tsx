import { type JSX, type ParentComponent, type ParentProps } from 'solid-js'

import styles from './Panel.module.css'

export const Panel = (props: ParentProps<PanelProps>) => {
  return (
    <div class={styles.panel} classList={{ [`acd-panel-${props.name}`]: true }} style={props.style}>
      {props.children}
    </div>
  )
}

const PanelHeader: ParentComponent = (props) => {
  return <header class={styles.header}>{props.children}</header>
}

Panel.Header = PanelHeader

interface PanelProps {
  name: string
  style?: JSX.CSSProperties | string
}
