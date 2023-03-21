import { type Component, Match, Switch } from 'solid-js'

import {
  isObjectSchema,
  isStringSchema,
  type JsonSchema,
  type ObjectSchemaType,
  type StringSchemaType,
} from '../../libs/schema'

import { ObjectSchema } from './ObjectSchema'
import { StringSchema } from './StringSchema'

// TODO(HiDeoo) Check zod documentation for more types
export const Schema: Component<SchemaProps> = (props) => {
  return (
    <Switch fallback={<p>{`// TODO`}</p>}>
      <Match when={isObjectSchema(props.schema)}>
        <ObjectSchema root={props.root} schema={props.schema as ObjectSchemaType} />
      </Match>
      <Match when={isStringSchema(props.schema)}>
        <StringSchema schema={props.schema as StringSchemaType} />
      </Match>
    </Switch>
  )
}

interface SchemaProps {
  root?: boolean | undefined
  schema: JsonSchema
}
