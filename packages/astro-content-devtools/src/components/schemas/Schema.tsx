import { type Component, Match, Switch, splitProps } from 'solid-js'

import {
  isArrayOrTupleSchema,
  isBigIntSchema,
  isBooleanSchema,
  isDateSchema,
  isIntersectionSchema,
  isLiteralSchema,
  isMapSchema,
  isNullableSchema,
  isNullSchema,
  isNumberSchema,
  isObjectSchema,
  isRecordSchema,
  isStringSchema,
  isUndefinedSchema,
  isUnionSchema,
  isUnknownSchema,
  isZodOrNativeEnumSchema,
  type ArraySchemaType,
  type EnumSchemaType,
  type IntersectionSchemaType,
  type JsonSchema,
  type LiteralSchemaType,
  type MapSchemaType,
  type NativeEnumSchemaType,
  type NullableSchemaType,
  type NumberSchemaType,
  type ObjectSchemaType,
  type RecordSchemaType,
  type SchemaProps,
  type StringSchemaType,
  type TupleSchemaType,
  type UnionSchemaType,
} from '../../libs/schema'

import { ArraySchema } from './ArraySchema'
import { EnumSchema } from './EnumSchema'
import { IntersectionSchema } from './IntersectionSchema'
import { LiteralSchema } from './LiteralSchema'
import { MapSchema } from './MapSchema'
import { NullableSchema } from './NullableSchema'
import { NumberSchema } from './NumberSchema'
import { ObjectSchema } from './ObjectSchema'
import { RecordSchema } from './RecordSchema'
import { SchemaType } from './SchemaType'
import { StringSchema } from './StringSchema'
import { UnionSchema } from './UnionSchema'

export const Schema: Component<SchemaProps<JsonSchema>> = (props) => {
  const [local, others] = splitProps(props, ['schema'])

  return (
    <Switch fallback={<p>{`// TODO`}</p>}>
      <Match when={isObjectSchema(local.schema)}>
        <ObjectSchema schema={local.schema as ObjectSchemaType} {...others} />
      </Match>
      <Match when={isRecordSchema(local.schema)}>
        <RecordSchema schema={local.schema as RecordSchemaType} {...others} />
      </Match>
      <Match when={isArrayOrTupleSchema(local.schema)}>
        <ArraySchema schema={local.schema as ArraySchemaType | TupleSchemaType} {...others} />
      </Match>
      <Match when={isMapSchema(local.schema)}>
        <MapSchema schema={local.schema as MapSchemaType} {...others} />
      </Match>
      <Match when={isZodOrNativeEnumSchema(local.schema)}>
        <EnumSchema schema={local.schema as EnumSchemaType | NativeEnumSchemaType} {...others} />
      </Match>
      <Match when={isUnionSchema(local.schema)}>
        <UnionSchema schema={local.schema as UnionSchemaType} {...others} />
      </Match>
      <Match when={isIntersectionSchema(local.schema)}>
        <IntersectionSchema schema={local.schema as IntersectionSchemaType} {...others} />
      </Match>
      <Match when={isStringSchema(local.schema)}>
        <StringSchema schema={local.schema as StringSchemaType} {...others} />
      </Match>
      <Match when={isNumberSchema(local.schema)}>
        <NumberSchema schema={local.schema as NumberSchemaType} {...others} />
      </Match>
      <Match when={isLiteralSchema(local.schema)}>
        <LiteralSchema schema={local.schema as LiteralSchemaType} {...others} />
      </Match>
      <Match when={isNullableSchema(local.schema)}>
        <NullableSchema schema={local.schema as NullableSchemaType} {...others} />
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
      <Match when={isUndefinedSchema(local.schema)}>
        <SchemaType type="undefined" {...others} />
      </Match>
      <Match when={isUnknownSchema(local.schema)}>
        <SchemaType type="unknown" {...others} />
      </Match>
      <Match when={isNullSchema(local.schema)}>
        <SchemaType type="null" {...others} />
      </Match>
    </Switch>
  )
}
