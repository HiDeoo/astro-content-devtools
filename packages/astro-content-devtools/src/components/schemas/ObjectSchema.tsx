import { type Component, For, type ParentComponent, Show } from 'solid-js'

import { isObjectSchema, type JsonSchema, type ObjectSchemaType, type WithSchemaProps } from '../../libs/schema'

import styles from './ObjectSchema.module.css'
import { Schema } from './Schema'

export const ObjectSchema: Component<ObjectSchemaProps> = (props) => {
  return (
    <div class={styles['object']} classList={{ [String(styles['root'])]: props.root }}>
      <For each={Object.entries(props.schema.properties)}>
        {([propertyName, propertySchema]: [string, JsonSchema]) => {
          const isRequired = isRequiredProperty(propertyName, props.schema.required)
          const isNestedObject = isObjectSchema(propertySchema)

          const SchemaContent = () => <Schema required={isRequired} schema={propertySchema} />

          return (
            <>
              <PropertyName required={isRequired}>{propertyName}</PropertyName>
              <Show when={isNestedObject} fallback={<SchemaContent />}>
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

const PropertyName: ParentComponent<PropertyNameProps> = (props) => {
  return (
    <div class={styles['propertyName']} classList={{ [String(styles['required'])]: props.required }}>
      {props.children}
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

interface PropertyNameProps {
  required: boolean
}
