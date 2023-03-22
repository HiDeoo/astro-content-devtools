import { mergeProps, type ParentComponent, Show } from 'solid-js'

import styles from './TabularSchema.module.css'

export const TabularSchema: ParentComponent<TabularSchemaProps> = (props) => {
  const merged = mergeProps({ showBorder: true, showHeader: true }, props)

  const headerDetails = props.headerDetails ?? []

  if (props.nullable && !headerDetails.includes('nullable')) {
    headerDetails.unshift('nullable')
  }

  return (
    <div>
      <Show when={merged.showHeader}>
        <div class={styles['header']}>
          {merged.type}
          <Show when={headerDetails.length > 0}>
            <span class={styles['details']}> ({headerDetails.join(' - ')})</span>
          </Show>
        </div>
      </Show>
      <div
        class={styles['table']}
        classList={{
          [String(styles['borderless'])]: !merged.showBorder,
          [String(styles['object'])]: merged.type === 'object',
          [String(styles['record'])]: merged.type === 'record',
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
  headerDetails?: string[]
  nullable?: boolean | undefined
  showBorder?: boolean | undefined
  showHeader?: boolean | undefined
  type: 'array' | 'object' | 'record'
}

interface TabularPropertyNameProps {
  required?: boolean | undefined
}
