import { type Component, For, type ParentComponent } from 'solid-js'

import { type JsonSchema, type ObjectSchemaType } from '../../libs/schema'

import styles from './ObjectSchema.module.css'
import { Schema } from './Schema'
import { SchemaType } from './SchemaType'

export const ObjectSchema: Component<ObjectSchemaProps> = (props) => {
  return (
    <div class={styles['object']} classList={{ [String(styles['root'])]: props.root }}>
      <For each={Object.entries(props.schema.properties)}>
        {([propertyName, propertySchema]: [string, JsonSchema]) => {
          const isRequired = isRequiredProperty(propertyName, props.schema.required)

          return (
            <>
              <PropertyName required={isRequired}>{propertyName}</PropertyName>
              <SchemaType details={isRequired ? 'required' : 'optional'}>
                <Schema schema={propertySchema} />
              </SchemaType>
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

interface ObjectSchemaProps {
  root?: boolean | undefined
  schema: ObjectSchemaType
}

interface PropertyNameProps {
  required: boolean
}
