import { type Component } from 'solid-js'

import { type StringSchemaType, type WithSchemaProps } from '../../libs/schema'

import { SchemaType } from './SchemaType'

export const StringSchema: Component<WithSchemaProps<StringSchemaType>> = (props) => {
  return <SchemaType type="string" details={getStringDetails(props.schema)} />
}

function getStringDetails(schema: StringSchemaType) {
  const details: string[] = []

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
