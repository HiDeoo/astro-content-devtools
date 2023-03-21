import { type Component } from 'solid-js'

import { type BooleanSchemaType } from '../../libs/schema'

import { SchemaType } from './SchemaType'

export const BooleanSchema: Component<BooleanSchemaProps> = () => {
  return <SchemaType type="boolean" />
}

interface BooleanSchemaProps {
  schema: BooleanSchemaType
}
