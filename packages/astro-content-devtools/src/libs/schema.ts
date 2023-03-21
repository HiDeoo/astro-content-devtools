import { type JsonSchema7AnyType } from 'zod-to-json-schema/src/parsers/any'
import { type JsonSchema7BooleanType } from 'zod-to-json-schema/src/parsers/boolean'
import { type JsonSchema7NumberType } from 'zod-to-json-schema/src/parsers/number'
import { type JsonSchema7ObjectType } from 'zod-to-json-schema/src/parsers/object'
import { type JsonSchema7StringType } from 'zod-to-json-schema/src/parsers/string'

export function isObjectSchema(schema: JsonSchema): schema is ObjectSchemaType {
  return isTypedSchema(schema) && schema.type === 'object'
}

export function isStringSchema(schema: JsonSchema): schema is StringSchemaType {
  return isTypedSchema(schema) && schema.type === 'string'
}

export function isNumberSchema(schema: JsonSchema): schema is NumberSchemaType {
  return isTypedSchema(schema) && (schema.type === 'number' || schema.type === 'integer')
}

export function isBooleanSchema(schema: JsonSchema): schema is BooleanSchemaType {
  return isTypedSchema(schema) && schema.type === 'boolean'
}

function isTypedSchema(schema: JsonSchema): schema is TypedSchema {
  return typeof (schema as TypedSchema).type === 'string'
}

// TODO(HiDeoo)
export type JsonSchema =
  | StringSchemaType
  //   | JsonSchema7ArrayType
  | NumberSchemaType
  //   | JsonSchema7BigintType
  | BooleanSchemaType
  //   | JsonSchema7DateType
  //   | JsonSchema7EnumType
  //   | JsonSchema7LiteralType
  //   | JsonSchema7NativeEnumType
  //   | JsonSchema7NullType
  | ObjectSchemaType
  //   | JsonSchema7RecordType
  //   | JsonSchema7TupleType
  //   | JsonSchema7UnionType
  //   | JsonSchema7UndefinedType
  //   | JsonSchema7RefType
  //   | JsonSchema7NeverType
  //   | JsonSchema7MapType
  | JsonSchema7AnyType
//   | JsonSchema7NullableType
//   | JsonSchema7AllOfType
//   | JsonSchema7UnknownType
//   | JsonSchema7SetType

export type BooleanSchemaType = JsonSchema7BooleanType
export type NumberSchemaType = JsonSchema7NumberType
export type ObjectSchemaType = JsonSchema7ObjectType
export type StringSchemaType = JsonSchema7StringType

interface TypedSchema {
  type: string
}

export interface WithSchemaProps<TSchema> {
  schema: TSchema
}
