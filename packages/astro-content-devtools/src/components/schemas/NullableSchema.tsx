import { type Component } from 'solid-js'

import {
  isAnyOfNullableSchema,
  isTypedNullableSchema,
  type NullableSchemaType,
  type SchemaProps,
} from '../../libs/schema'

import { Schema } from './Schema'
import { SchemaType } from './SchemaType'

export const NullableSchema: Component<SchemaProps<NullableSchemaType>> = (props) => {
  if (isTypedNullableSchema(props.schema)) {
    return <SchemaType type={props.schema.type[0]} details={['nullable']} />
  }

  if (isAnyOfNullableSchema(props.schema)) {
    return (
      <div>
        <Schema schema={props.schema.anyOf[0]} nullable />
      </div>
    )
  }

  throw new Error('Invalid nullable schema')
}
