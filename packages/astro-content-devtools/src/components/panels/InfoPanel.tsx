import { Show, type Component, type JSX } from 'solid-js'

import styles from './InfoPanel.module.css'

export const InfoPanel: Component<InfoPanelProps> = (props) => {
  return (
    <div class={styles.info}>
      <div>
        {props.message}
        <Show when={props.details !== undefined}>
          <p class={styles.details}>{props.details}</p>
        </Show>
      </div>
    </div>
  )
}

interface InfoPanelProps {
  details?: JSX.Element | string
  message: string
}
