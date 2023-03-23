import { type Component } from 'solid-js'

import styles from './DataVariable.module.css'

export const DataVariable: Component<DataVariableProps> = (props) => {
  return (
    <div class={styles.variable}>
      {props.key}
      <code>{props.value}</code>
    </div>
  )
}

interface DataVariableProps {
  key: string
  value?: string
}
