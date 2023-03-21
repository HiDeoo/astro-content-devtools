import { type Component, For, Show } from 'solid-js'

import {
  isObjectSchema,
  isRecordSchema,
  type JsonSchema,
  type ObjectSchemaType,
  type WithSchemaProps,
} from '../../libs/schema'

import styles from './ObjectSchema.module.css'
import { Schema } from './Schema'

export const ObjectSchema: Component<ObjectSchemaProps> = (props) => {
  return (
    <div class={styles['object']} classList={{ [String(styles['root'])]: props.root }}>
      <For each={Object.entries(props.schema.properties)}>
        {([propertyName, propertySchema]: [string, JsonSchema]) => {
          const isRequired = isRequiredProperty(propertyName, props.schema.required)
          const isNested = isObjectSchema(propertySchema) || isRecordSchema(propertySchema)

          const SchemaContent = () => <Schema required={isRequired} schema={propertySchema} />

          return (
            <>
              <div class={styles['propertyName']} classList={{ [String(styles['required'])]: isRequired }}>
                {propertyName}
              </div>
              <Show when={isNested} fallback={<SchemaContent />}>
                <div>
                  <SchemaContent />
                </div>
              </Show>
              <div>
                <Show when={isRequired} fallback="optional">
                  required
                </Show>
              </div>
            </>
          )
        }}
      </For>
    </div>
  )
}

function isRequiredProperty(propertyName: string, required: string[] | undefined) {
  return required?.includes(propertyName) ?? false
}

interface ObjectSchemaProps extends WithSchemaProps<ObjectSchemaType> {
  required?: boolean | undefined
  root?: boolean | undefined
}
