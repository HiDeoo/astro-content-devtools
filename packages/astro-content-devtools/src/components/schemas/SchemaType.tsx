import { type Component, Show } from 'solid-js'

import styles from './SchemaType.module.css'

export const SchemaType: Component<SchemaTypeProps> = (props) => {
  return (
    <div class={styles['type']}>
      {props.type}
      <Show when={props.details && props.details.length > 0}>
        <span class={styles['details']}> ({props.details?.join(' - ')})</span>
      </Show>
    </div>
  )
}

interface SchemaTypeProps {
  details?: string[]
  type: string
}
