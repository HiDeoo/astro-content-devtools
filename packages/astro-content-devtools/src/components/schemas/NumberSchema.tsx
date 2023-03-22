import { type Component } from 'solid-js'

import { type NumberSchemaType, type SchemaProps } from '../../libs/schema'

import { SchemaType } from './SchemaType'

export const NumberSchema: Component<SchemaProps<NumberSchemaType>> = (props) => {
  return <SchemaType type={props.schema.type} details={getNumberDetails(props.schema, props.nullable)} />
}

function getNumberDetails(schema: NumberSchemaType, nullable?: boolean) {
  const details: string[] = []

  if (nullable) {
    details.push('nullable')
  }

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
