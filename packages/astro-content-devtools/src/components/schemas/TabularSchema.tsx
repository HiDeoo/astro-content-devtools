import { mergeProps, type ParentComponent, type ParentProps, Show } from 'solid-js'

import { type JsonSchema } from '../../libs/schema'

import { Schema } from './Schema'
import styles from './TabularSchema.module.css'

export const TabularSchema = (props: ParentProps<TabularSchemaProps>) => {
  const merged = mergeProps({ showBorder: true, showHeader: true }, props)

  const headerDetails = props.headerDetails ?? []

  if (props.nullable && !headerDetails.includes('nullable')) {
    headerDetails.unshift('nullable')
  }

  return (
    <div>
      <Show when={merged.showHeader}>
        <div class={styles.header} classList={{ [styles.borderless!]: !merged.showBorder }}>
          {merged.type}
          <Show when={headerDetails.length > 0}>
            <span class={styles.details}> ({headerDetails.join(' - ')})</span>
          </Show>
        </div>
      </Show>
      <div
        class={styles.table}
        classList={{
          [styles.borderless!]: !merged.showBorder,
          [styles[merged.type]!]: true,
        }}
      >
        {merged.children}
      </div>
    </div>
  )
}

const TabularPropertyName: ParentComponent<TabularPropertyNameProps> = (props) => {
  return (
    <div class={styles.propertyName} classList={{ [styles.required!]: props.required }}>
      {props.children}
    </div>
  )
}

TabularSchema.PropertyName = TabularPropertyName

const TabularVariadicSchema: ParentComponent<TabularVariadicSchemaProps> = (props) => {
  return (
    <div class={styles.variadicSchema}>
      <span>…</span>
      <Schema schema={props.schema} />
    </div>
  )
}

TabularSchema.VariadicSchema = TabularVariadicSchema

interface TabularSchemaProps {
  headerDetails?: string[]
  nullable?: boolean
  showBorder?: boolean
  showHeader?: boolean
  type: 'array' | 'enum' | 'intersection' | 'map' | 'object' | 'record' | 'tuple' | 'union'
}

interface TabularPropertyNameProps {
  required?: boolean
}

interface TabularVariadicSchemaProps {
  schema: JsonSchema
}
