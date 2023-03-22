import { type Component, For } from 'solid-js'

import { isPrimitiveUnionSchema, isAnyOfSchema, type SchemaProps, type UnionSchemaType } from '../../libs/schema'

import { Schema } from './Schema'
import { TabularSchema } from './TabularSchema'

export const UnionSchema: Component<SchemaProps<UnionSchemaType>> = (props) => {
  return (
    <TabularSchema nullable={props.nullable} type="union">
      {isPrimitiveUnionSchema(props.schema) ? (
        <For each={props.schema.type}>{(item) => <div>{item}</div>}</For>
      ) : isAnyOfSchema(props.schema) ? (
        <For each={props.schema.anyOf}>
          {(type) => (
            <div>
              <Schema schema={type} />
            </div>
          )}
        </For>
      ) : null}
    </TabularSchema>
  )
}
