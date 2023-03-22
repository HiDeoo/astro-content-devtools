import { type Component, For } from 'solid-js'

import { type IntersectionSchemaType, type SchemaProps } from '../../libs/schema'

import { Schema } from './Schema'
import { TabularSchema } from './TabularSchema'

export const IntersectionSchema: Component<SchemaProps<IntersectionSchemaType>> = (props) => {
  return (
    <TabularSchema nullable={props.nullable} type="intersection">
      <For each={props.schema.allOf}>
        {(type) => (
          <div>
            <Schema schema={type} />
          </div>
        )}
      </For>
    </TabularSchema>
  )
}
