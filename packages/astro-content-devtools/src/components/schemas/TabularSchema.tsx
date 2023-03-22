import { mergeProps, type ParentComponent, Show } from 'solid-js'

import { type JsonSchema } from '../../libs/schema'

import { Schema } from './Schema'
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
        <div class={styles['header']} classList={{ [String(styles['borderless'])]: !merged.showBorder }}>
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
          [String(styles[merged.type])]: true,
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

export const TabularVariadicSchema: ParentComponent<TabularVariadicSchemaProps> = (props) => {
  return (
    <div class={styles['variadicSchema']}>
      <span>…</span>
      <Schema schema={props.schema} />
    </div>
  )
}

interface TabularSchemaProps {
  headerDetails?: string[]
  nullable?: boolean | undefined
  showBorder?: boolean | undefined
  showHeader?: boolean | undefined
  type: 'array' | 'enum' | 'intersection' | 'map' | 'object' | 'record' | 'tuple' | 'union'
}

interface TabularPropertyNameProps {
  required?: boolean | undefined
}

interface TabularVariadicSchemaProps {
  schema: JsonSchema
}
