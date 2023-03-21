import { type Component, Match, Switch } from 'solid-js'

import {
  isBigIntSchema,
  isBooleanSchema,
  isDateSchema,
  isLiteralSchema,
  isNullableSchema,
  isNullSchema,
  isNumberSchema,
  isObjectSchema,
  isRecordSchema,
  isStringSchema,
  isUndefinedSchema,
  isUnknownSchema,
  type JsonSchema,
  type LiteralSchemaType,
  type NullableSchemaType,
  type NumberSchemaType,
  type ObjectSchemaType,
  type RecordSchemaType,
  type StringSchemaType,
} from '../../libs/schema'

import { LiteralSchema } from './LiteralSchema'
import { NullableSchema } from './NullableSchema'
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
        <ObjectSchema nullable={props.nullable} root={props.root} schema={props.schema as ObjectSchemaType} />
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
        <RecordSchema nullable={props.nullable} schema={props.schema as RecordSchemaType} />
      </Match>
      <Match when={isLiteralSchema(props.schema)}>
        <LiteralSchema schema={props.schema as LiteralSchemaType} />
      </Match>
      <Match when={isUndefinedSchema(props.schema)}>
        <SchemaType type="undefined" />
      </Match>
      <Match when={isUnknownSchema(props.schema)}>
        <SchemaType type="unknown" />
      </Match>
      <Match when={isNullSchema(props.schema)}>
        <SchemaType type="null" />
      </Match>
      <Match when={isNullableSchema(props.schema)}>
        <NullableSchema schema={props.schema as NullableSchemaType} />
      </Match>
    </Switch>
  )
}

interface SchemaProps {
  nullable?: boolean | undefined
  root?: boolean | undefined
  schema: JsonSchema
}
