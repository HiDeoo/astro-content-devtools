import { type Component } from 'solid-js'

import { type NumberSchemaType, type WithSchemaProps } from '../../libs/schema'

import { SchemaType } from './SchemaType'

export const NumberSchema: Component<WithSchemaProps<NumberSchemaType>> = (props) => {
  return <SchemaType type={props.schema.type} details={getNumberDetails(props.schema)} />
}

function getNumberDetails(schema: NumberSchemaType) {
  const details: string[] = []

  if (schema.minimum !== undefined) {
    details.push(`≥ ${schema.minimum}`)
  }

  if (schema.exclusiveMinimum !== undefined) {
    details.push(`> ${schema.exclusiveMinimum}`)
  }

  if (schema.maximum !== undefined) {
    details.push(`≤ ${schema.maximum}`)
  }

  if (schema.exclusiveMaximum !== undefined) {
    details.push(`< ${schema.exclusiveMaximum}`)
  }

  if (schema.multipleOf !== undefined) {
    details.push(`multiple of ${schema.multipleOf}`)
  }

  return details
}
