import { type Component } from 'solid-js'

import { type ArraySchemaType, type SchemaProps } from '../../libs/schema'

import { Schema } from './Schema'
import { TabularSchema } from './TabularSchema'

export const ArraySchema: Component<SchemaProps<ArraySchemaType>> = (props) => {
  return (
    <TabularSchema nullable={props.nullable} type="array" headerDetails={getArrayDetails(props.schema)}>
      <div>{props.schema.items ? <Schema schema={props.schema.items} /> : 'unknown'}</div>
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
