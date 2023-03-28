import { type Component } from 'solid-js'

import styles from './DataContent.module.css'

export const DataContent: Component<DataContentProps> = (props) => {
  return (
    <pre class={styles.content}>
      <code>{props.children?.trim()}</code>
    </pre>
  )
}

interface DataContentProps {
  children?: string
}
