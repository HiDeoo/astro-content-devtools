import { type Component } from 'solid-js'

import { type BooleanSchemaType, type WithSchemaProps } from '../../libs/schema'

import { SchemaType } from './SchemaType'

export const BooleanSchema: Component<WithSchemaProps<BooleanSchemaType>> = () => {
  return <SchemaType type="boolean" />
}
