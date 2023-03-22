import { mergeProps, type ParentComponent, Show } from 'solid-js'

import styles from './TabularSchema.module.css'

export const TabularSchema: ParentComponent<TabularSchemaProps> = (props) => {
  const merged = mergeProps({ showHeader: true }, props)

  return (
    <div>
      <Show when={merged.showHeader}>
        <div class={styles['header']}>
          {merged.type}
          <Show when={merged.nullable}>
            <span>(nullable)</span>
          </Show>
        </div>
      </Show>
      <div
        classList={{
          [String(styles['object'])]: merged.type === 'object',
          [String(styles['record'])]: merged.type === 'record',
          [String(styles['root'])]: merged.root,
        }}
      >
        {merged.children}
      </div>
    </div>
  )
}

export const TabularPropertyName: ParentComponent<TabularPropertyNameProps> = (props) => {
  return (
    <div class={styles['propertyName']} classList={{ [String(styles['required'])]: props.required }}>
      {props.children}
    </div>
  )
}

interface TabularSchemaProps {
  nullable?: boolean | undefined
  root?: boolean | undefined
  showHeader?: boolean | undefined
  type: 'object' | 'record'
}

interface TabularPropertyNameProps {
  required?: boolean | undefined
}
