import type {
  JsonSchema7AnyType,
  JsonSchema7ArrayType,
  JsonSchema7BigintType,
  JsonSchema7BooleanType,
  JsonSchema7DateType,
  JsonSchema7EnumType,
  JsonSchema7AllOfType,
  JsonSchema7LiteralType,
  JsonSchema7MapType,
  JsonSchema7NativeEnumType,
  JsonSchema7NullType,
  JsonSchema7NullableType,
  JsonSchema7NumberType,
  JsonSchema7ObjectType,
  JsonSchema7RecordType,
  JsonSchema7SetType,
  JsonSchema7StringType,
  JsonSchema7TupleType,
  JsonSchema7UndefinedType,
  JsonSchema7UnionType,
  JsonSchema7UnknownType,
} from 'zod-to-json-schema'

export function isObjectSchema(schema: JsonSchema): schema is ObjectSchemaType {
  return isTypedSchema(schema) && schema.type === 'object' && 'properties' in schema
}

export function isStringSchema(schema: JsonSchema): schema is StringSchemaType {
  return (
    isTypedSchema(schema) &&
    !isConstSchema(schema) &&
    !isZodOrNativeEnumSchema(schema) &&
    schema.type === 'string' &&
    (schema as StringSchemaType).format !== 'date-time'
  )
}

export function isNumberSchema(schema: JsonSchema): schema is NumberSchemaType {
  return (
    isTypedSchema(schema) &&
    !isConstSchema(schema) &&
    !isZodOrNativeEnumSchema(schema) &&
    (schema.type === 'number' || (schema.type === 'integer' && !('format' in schema)))
  )
}

export function isBooleanSchema(schema: JsonSchema): schema is BooleanSchemaType {
  return isTypedSchema(schema) && !isConstSchema(schema) && schema.type === 'boolean'
}

export function isBigIntSchema(schema: JsonSchema): schema is BigIntSchemaType {
  return isTypedSchema(schema) && schema.type === 'integer' && 'format' in schema
}

export function isDateSchema(schema: JsonSchema): schema is DateSchemaType {
  return isTypedSchema(schema) && schema.type === 'string' && (schema as StringSchemaType).format === 'date-time'
}

export function isRecordSchema(schema: JsonSchema): schema is RecordSchemaType {
  return isTypedSchema(schema) && schema.type === 'object' && !('properties' in schema)
}

export function isLiteralSchema(schema: JsonSchema): schema is LiteralSchemaType {
  return (
    isTypedSchema(schema) &&
    (schema.type === 'string' || schema.type === 'number' || schema.type === 'integer' || schema.type === 'boolean') &&
    isConstSchema(schema)
  )
}

export function isArrayOrTupleSchema(schema: JsonSchema): schema is ArraySchemaType | TupleSchemaType {
  return isTypedSchema(schema) && schema.type === 'array' && (schema as ArraySchemaType).maxItems !== 125
}

export function isTupleSchema(schema: JsonSchema): schema is TupleSchemaType {
  return isTypedSchema(schema) && schema.type === 'array' && Array.isArray((schema as TupleSchemaType).items)
}

export function isVariadicTupleSchema(schema: TupleSchemaType): schema is VariadicTupleSchema {
  return !(`maxItems` in schema) && `additionalItems` in schema
}

export function isZodOrNativeEnumSchema(schema: JsonSchema): schema is EnumSchemaType | NativeEnumSchemaType {
  return isTypedSchema(schema) && 'enum' in schema
}

export function isMapSchema(schema: JsonSchema): schema is MapSchemaType {
  return isTypedSchema(schema) && schema.type === 'array' && (schema as ArraySchemaType).maxItems === 125
}

export function isUndefinedSchema(schema: JsonSchema): schema is UndefinedSchemaType {
  return 'not' in schema
}

export function isUnknownSchema(schema: JsonSchema): schema is UnknownSchemaType {
  return Object.keys(schema as object).length === 0
}

export function isNullSchema(schema: JsonSchema): schema is NullSchemaType {
  return isTypedSchema(schema) && schema.type === 'null'
}

export function isNullableSchema(schema: JsonSchema): schema is NullableSchemaType {
  return isTypedNullableSchema(schema) || isAnyOfNullableSchema(schema)
}

export function isConstSchema(schema: JsonSchema): schema is ConstSchema {
  return (
    typeof (schema as ConstSchema).const === 'string' ||
    typeof (schema as ConstSchema).const === 'number' ||
    typeof (schema as ConstSchema).const === 'boolean'
  )
}

export function isUnionSchema(schema: JsonSchema): schema is UnionSchemaType {
  return isPrimitiveUnionSchema(schema) || isAnyOfSchema(schema)
}

export function isPrimitiveUnionSchema(schema: JsonSchema): schema is PrimitiveUnionSchema {
  return (
    Array.isArray((schema as PrimitiveUnionSchema).type) &&
    !isTypedNullableSchema(schema) &&
    (schema as PrimitiveUnionSchema).type.every((type) => unionPrimitives.includes(type))
  )
}

export function isIntersectionSchema(schema: JsonSchema): schema is IntersectionSchemaType {
  return !isTypedSchema(schema) && 'allOf' in schema
}

export function isAnyOfSchema(schema: JsonSchema): schema is AnyOfSchema {
  return !isTypedSchema(schema) && 'anyOf' in schema && !isAnyOfNullableSchema(schema)
}

export function isTypedNullableSchema(schema: JsonSchema): schema is TypedNullableSchema {
  return (
    Array.isArray((schema as TypedNullableSchema).type) &&
    (schema as { type?: string[] }).type?.length === 2 &&
    (schema as { type?: string[] }).type?.[1] === 'null'
  )
}

export function isAnyOfNullableSchema(schema: JsonSchema): schema is AnyOfNullableSchema {
  return !isTypedSchema(schema) && 'anyOf' in schema && (schema.anyOf[1] as { type?: string }).type === 'null'
}

export function isTypedSchema(schema: JsonSchema): schema is TypedSchema {
  return typeof (schema as TypedSchema).type === 'string'
}

export type JsonSchema =
  | ArraySchemaType
  | BigIntSchemaType
  | BooleanSchemaType
  | DateSchemaType
  | EnumSchemaType
  | IntersectionSchemaType
  | JsonSchema7AnyType
  | LiteralSchemaType
  | MapSchemaType
  | NativeEnumSchemaType
  | NullableSchemaType
  | NullSchemaType
  | NumberSchemaType
  | ObjectSchemaType
  | RecordSchemaType
  | SetSchemaType
  | StringSchemaType
  | TupleSchemaType
  | UndefinedSchemaType
  | UnionSchemaType
  | UnknownSchemaType

export type ArraySchemaType = JsonSchema7ArrayType
export type BigIntSchemaType = JsonSchema7BigintType
export type BooleanSchemaType = JsonSchema7BooleanType
export type DateSchemaType = JsonSchema7DateType
export type EnumSchemaType = JsonSchema7EnumType
export type IntersectionSchemaType = JsonSchema7AllOfType
export type LiteralSchemaType = JsonSchema7LiteralType
export type MapSchemaType = JsonSchema7MapType
export type NativeEnumSchemaType = JsonSchema7NativeEnumType
export type NullableSchemaType = JsonSchema7NullableType
export type NullSchemaType = JsonSchema7NullType
export type NumberSchemaType = JsonSchema7NumberType
export type ObjectSchemaType = JsonSchema7ObjectType
export type RecordSchemaType = JsonSchema7RecordType
export type SetSchemaType = JsonSchema7SetType
export type StringSchemaType = JsonSchema7StringType
export type TupleSchemaType = JsonSchema7TupleType
export type UndefinedSchemaType = JsonSchema7UndefinedType
export type UnionSchemaType = JsonSchema7UnionType
export type UnknownSchemaType = JsonSchema7UnknownType

interface TypedSchema {
  type: string
}

interface TypedNullableSchema {
  type: [string, 'null']
}

interface PrimitiveUnionSchema {
  type: UnionPrimitive[]
}

interface AnyOfSchema {
  anyOf: JsonSchema[]
}

interface AnyOfNullableSchema {
  anyOf: [JsonSchema, NullSchemaType]
}

interface ConstSchema {
  const: string | number | boolean
}

type VariadicTupleSchema = Omit<TupleSchemaType, 'maxItems'> & { additionalItems: JsonSchema }

const unionPrimitives = ['string', 'number', 'integer', 'boolean', 'null']
type UnionPrimitive = (typeof unionPrimitives)[number]

export interface SchemaProps<TSchema> {
  nullable?: boolean
  root?: boolean
  schema: TSchema
}
