import { type Component } from 'solid-js'

import { type StringSchemaType, type SchemaProps } from '../../libs/schema'

import { SchemaType } from './SchemaType'

export const StringSchema: Component<SchemaProps<StringSchemaType>> = (props) => {
  return <SchemaType type="string" details={getStringDetails(props.schema, props.nullable)} />
}

function getStringDetails(schema: StringSchemaType, nullable?: boolean) {
  const details: string[] = []

  if (nullable) {
    details.push('nullable')
  }

  if (schema.minLength !== undefined) {
    details.push(`min: ${schema.minLength}`)
  }

  if (schema.maxLength !== undefined) {
    details.push(`max: ${schema.maxLength}`)
  }

  if (schema.pattern !== undefined) {
    details.push(`pattern: /${schema.pattern}/`)
  }

  if (schema.allOf !== undefined) {
    details.push(`patterns: [${schema.allOf.map(({ pattern }) => `/${pattern}/`).join(', ')}]`)
  }

  if (schema.format !== undefined) {
    details.push(`format: ${schema.format}`)
  }

  return details
}
