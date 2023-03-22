import { type Component } from 'solid-js'

import { type RecordSchemaType, type SchemaProps } from '../../libs/schema'

import { Schema } from './Schema'
import { TabularPropertyName, TabularSchema } from './TabularSchema'

export const RecordSchema: Component<SchemaProps<RecordSchemaType>> = (props) => {
  return (
    <TabularSchema nullable={props.nullable} type="record">
      <TabularPropertyName>[key: string]</TabularPropertyName>
      <div>
        <Schema schema={props.schema.additionalProperties} />
      </div>
    </TabularSchema>
  )
}
