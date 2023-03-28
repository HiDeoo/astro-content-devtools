import { type Component, For } from 'solid-js'

import {
  isTupleSchema,
  type ArraySchemaType,
  type SchemaProps,
  type TupleSchemaType,
  isVariadicTupleSchema,
} from '../../libs/schema'

import { Schema } from './Schema'
import { TabularSchema } from './TabularSchema'

export const ArraySchema: Component<SchemaProps<ArraySchemaType | TupleSchemaType>> = (props) => {
  if (isTupleSchema(props.schema)) {
    return (
      <TabularSchema nullable={props.nullable} type="tuple">
        <For each={props.schema.items}>
          {(item) => (
            <div>
              <Schema schema={item} />
            </div>
          )}
        </For>
        {isVariadicTupleSchema(props.schema) ? (
          <TabularSchema.VariadicSchema schema={props.schema.additionalItems} />
        ) : null}
      </TabularSchema>
    )
  }

  return (
    <TabularSchema nullable={props.nullable} type="array" headerDetails={getArrayDetails(props.schema)}>
      <div>{props.schema.items ? <Schema schema={props.schema.items} /> : 'undefined'}</div>
    </TabularSchema>
  )
}

function getArrayDetails(schema: ArraySchemaType) {
  const details: string[] = []

  if (schema.minItems !== undefined) {
    details.push(`min: ${schema.minItems}`)
  }

  if (schema.maxItems !== undefined) {
    details.push(`max: ${schema.maxItems}`)
  }

  return details
}
