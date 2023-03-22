import { type Component, Show } from 'solid-js'

import styles from './SchemaType.module.css'

export const SchemaType: Component<SchemaTypeProps> = (props) => {
  const details = props.details ?? []

  if (props.nullable && !details.includes('nullable')) {
    details.unshift('nullable')
  }

  return (
    <div class={styles.type}>
      {props.type}
      <Show when={details.length > 0}>
        <span class={styles.details}> ({details.join(' - ')})</span>
      </Show>
    </div>
  )
}

interface SchemaTypeProps {
  details?: string[]
  nullable?: boolean | undefined
  type: string
}
