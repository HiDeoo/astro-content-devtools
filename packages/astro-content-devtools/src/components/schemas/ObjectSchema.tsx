import { type Component, For, Show } from 'solid-js'

import {
  isObjectSchema,
  isRecordSchema,
  type JsonSchema,
  type ObjectSchemaType,
  type SchemaProps,
} from '../../libs/schema'

import styles from './ObjectSchema.module.css'
import { Schema } from './Schema'

export const ObjectSchema: Component<ObjectSchemaProps> = (props) => {
  const properties = () => Object.entries(props.schema.properties)

  return (
    <Show when={properties().length > 0} fallback="object">
      <div>
        <Show when={!props.root}>
          <div class={styles['header']}>
            object
            <Show when={props.nullable}>
              <span>(nullable)</span>
            </Show>
          </div>
        </Show>
        <div class={styles['object']} classList={{ [String(styles['root'])]: props.root }}>
          <For each={properties()}>
            {([propertyName, propertySchema]: [string, JsonSchema]) => {
              const isRequired = isRequiredProperty(propertyName, props.schema.required)
              const isNested = isObjectSchema(propertySchema) || isRecordSchema(propertySchema)

              const SchemaContent = () => <Schema schema={propertySchema} />

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
      </div>
    </Show>
  )
}

function isRequiredProperty(propertyName: string, required: string[] | undefined) {
  return required?.includes(propertyName) ?? false
}

interface ObjectSchemaProps extends SchemaProps<ObjectSchemaType> {
  root?: boolean | undefined
}
