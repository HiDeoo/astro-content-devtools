import { type Component, Match, Switch, splitProps } from 'solid-js'

import {
  isArraySchema,
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
  type ArraySchemaType,
  type JsonSchema,
  type LiteralSchemaType,
  type NullableSchemaType,
  type NumberSchemaType,
  type ObjectSchemaType,
  type RecordSchemaType,
  type SchemaProps,
  type StringSchemaType,
} from '../../libs/schema'

import { ArraySchema } from './ArraySchema'
import { LiteralSchema } from './LiteralSchema'
import { NullableSchema } from './NullableSchema'
import { NumberSchema } from './NumberSchema'
import { ObjectSchema } from './ObjectSchema'
import { RecordSchema } from './RecordSchema'
import { SchemaType } from './SchemaType'
import { StringSchema } from './StringSchema'

export const Schema: Component<SchemaComponentProps> = (props) => {
  const [local, others] = splitProps(props, ['root', 'schema'])

  // TODO(HiDeoo) refactor
  return (
    <Switch fallback={<p>{`// TODO`}</p>}>
      <Match when={isObjectSchema(local.schema)}>
        <ObjectSchema root={local.root} schema={local.schema as ObjectSchemaType} {...others} />
      </Match>
      <Match when={isStringSchema(local.schema)}>
        <StringSchema schema={local.schema as StringSchemaType} {...others} />
      </Match>
      <Match when={isNumberSchema(local.schema)}>
        <NumberSchema schema={local.schema as NumberSchemaType} {...others} />
      </Match>
      <Match when={isBooleanSchema(local.schema)}>
        <SchemaType type="boolean" {...others} />
      </Match>
      <Match when={isBigIntSchema(local.schema)}>
        <SchemaType type="bigint" {...others} />
      </Match>
      <Match when={isDateSchema(local.schema)}>
        <SchemaType type="date" {...others} />
      </Match>
      <Match when={isRecordSchema(local.schema)}>
        <RecordSchema schema={local.schema as RecordSchemaType} {...others} />
      </Match>
      <Match when={isLiteralSchema(local.schema)}>
        <LiteralSchema schema={local.schema as LiteralSchemaType} {...others} />
      </Match>
      <Match when={isUndefinedSchema(local.schema)}>
        <SchemaType type="undefined" {...others} />
      </Match>
      <Match when={isUnknownSchema(local.schema)}>
        <SchemaType type="unknown" {...others} />
      </Match>
      <Match when={isNullSchema(local.schema)}>
        <SchemaType type="null" {...others} />
      </Match>
      <Match when={isNullableSchema(local.schema)}>
        <NullableSchema schema={local.schema as NullableSchemaType} {...others} />
      </Match>
      <Match when={isArraySchema(local.schema)}>
        <ArraySchema schema={local.schema as ArraySchemaType} {...others} />
      </Match>
    </Switch>
  )
}

interface SchemaComponentProps extends SchemaProps<JsonSchema> {
  root?: boolean | undefined
}
