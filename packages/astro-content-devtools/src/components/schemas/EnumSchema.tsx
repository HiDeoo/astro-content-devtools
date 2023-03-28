import { For, type Component } from 'solid-js'

import { type EnumSchemaType, type NativeEnumSchemaType, type SchemaProps } from '../../libs/schema'

import { TabularSchema } from './TabularSchema'

export const EnumSchema: Component<SchemaProps<EnumSchemaType | NativeEnumSchemaType>> = (props) => {
  return (
    <TabularSchema nullable={props.nullable} type="enum">
      <For each={props.schema.enum}>{(item) => <div>{item}</div>}</For>
    </TabularSchema>
  )
}
