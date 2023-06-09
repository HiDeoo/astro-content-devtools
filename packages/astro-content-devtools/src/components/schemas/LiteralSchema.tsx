import { type Component } from 'solid-js'

import { isConstSchema, type LiteralSchemaType, type SchemaProps } from '../../libs/schema'

import { SchemaType } from './SchemaType'

export const LiteralSchema: Component<SchemaProps<LiteralSchemaType>> = (props) => {
  const type = isConstSchema(props.schema) ? props.schema.const.toString() : 'literal'

  return <SchemaType type={props.schema.type === 'string' ? `'${type}'` : type} />
}
