import { type Component, Match, Switch } from 'solid-js'

import {
  isBigIntSchema,
  isBooleanSchema,
  isNumberSchema,
  isObjectSchema,
  isStringSchema,
  type JsonSchema,
  type NumberSchemaType,
  type ObjectSchemaType,
  type StringSchemaType,
} from '../../libs/schema'

import { NumberSchema } from './NumberSchema'
import { ObjectSchema } from './ObjectSchema'
import { SchemaType } from './SchemaType'
import { StringSchema } from './StringSchema'

// TODO(HiDeoo) Check zod documentation for more types
export const Schema: Component<SchemaProps> = (props) => {
  // TODO(HiDeoo) refactor
  return (
    <Switch fallback={<p>{`// TODO`}</p>}>
      <Match when={isObjectSchema(props.schema)}>
        <ObjectSchema root={props.root} schema={props.schema as ObjectSchemaType} required={props.required} />
      </Match>
      <Match when={isStringSchema(props.schema)}>
        <StringSchema schema={props.schema as StringSchemaType} />
      </Match>
      <Match when={isNumberSchema(props.schema)}>
        <NumberSchema schema={props.schema as NumberSchemaType} />
      </Match>
      <Match when={isBooleanSchema(props.schema)}>
        <SchemaType type="boolean" />
      </Match>
      <Match when={isBigIntSchema(props.schema)}>
        <SchemaType type="bigint" />
      </Match>
    </Switch>
  )
}

interface SchemaProps {
  required?: boolean | undefined
  root?: boolean | undefined
  schema: JsonSchema
}
