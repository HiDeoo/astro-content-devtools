import { type ParentComponent } from 'solid-js'

import styles from './DataSection.module.css'

export const DataSection: ParentComponent<DataSectionProps> = (props) => {
  return (
    <>
      <h2 class={styles.title}>{props.title}</h2>
      <div class={styles.content} classList={{ [styles.horizontal!]: props.horizontal }}>
        {props.children}
      </div>
    </>
  )
}

interface DataSectionProps {
  horizontal?: boolean
  title: string
}
