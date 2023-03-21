import { type Component, Match, splitProps, Switch } from 'solid-js'

import {
  isBooleanSchema,
  isNumberSchema,
  isObjectSchema,
  isStringSchema,
  type BooleanSchemaType,
  type JsonSchema,
  type NumberSchemaType,
  type ObjectSchemaType,
  type StringSchemaType,
} from '../../libs/schema'

import { BooleanSchema } from './BooleanSchema'
import { NumberSchema } from './NumberSchema'
import { ObjectSchema } from './ObjectSchema'
import { StringSchema } from './StringSchema'

// TODO(HiDeoo) Check zod documentation for more types
export const Schema: Component<SchemaProps> = (props) => {
  const [local, others] = splitProps(props, ['root', 'schema'])

  // TODO(HiDeoo) refactor?
  return (
    <Switch fallback={<p>{`// TODO`}</p>}>
      <Match when={isObjectSchema(local.schema)}>
        <ObjectSchema root={local.root} schema={local.schema as ObjectSchemaType} />
      </Match>
      <Match when={isStringSchema(local.schema)}>
        <StringSchema schema={local.schema as StringSchemaType} {...others} />
      </Match>
      <Match when={isNumberSchema(local.schema)}>
        <NumberSchema schema={local.schema as NumberSchemaType} {...others} />
      </Match>
      <Match when={isBooleanSchema(local.schema)}>
        <BooleanSchema schema={local.schema as BooleanSchemaType} {...others} />
      </Match>
    </Switch>
  )
}

interface SchemaProps {
  required?: boolean | undefined
  root?: boolean | undefined
  schema: JsonSchema
}
