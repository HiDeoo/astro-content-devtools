import { type Component, Match, Switch } from 'solid-js'

import {
  isBigIntSchema,
  isBooleanSchema,
  isDateSchema,
  isLiteralSchema,
  isNumberSchema,
  isObjectSchema,
  isRecordSchema,
  isStringSchema,
  isUndefinedSchema,
  type JsonSchema,
  type LiteralSchemaType,
  type NumberSchemaType,
  type ObjectSchemaType,
  type RecordSchemaType,
  type StringSchemaType,
} from '../../libs/schema'

import { LiteralSchema } from './LiteralSchema'
import { NumberSchema } from './NumberSchema'
import { ObjectSchema } from './ObjectSchema'
import { RecordSchema } from './RecordSchema'
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
      <Match when={isDateSchema(props.schema)}>
        <SchemaType type="date" />
      </Match>
      <Match when={isRecordSchema(props.schema)}>
        <RecordSchema schema={props.schema as RecordSchemaType} />
      </Match>
      <Match when={isLiteralSchema(props.schema)}>
        <LiteralSchema schema={props.schema as LiteralSchemaType} />
      </Match>
      <Match when={isUndefinedSchema(props.schema)}>
        <SchemaType type="undefined" />
      </Match>
    </Switch>
  )
}

interface SchemaProps {
  required?: boolean | undefined
  root?: boolean | undefined
  schema: JsonSchema
}
