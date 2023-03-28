import { type Component } from 'solid-js'

import { type RecordSchemaType, type SchemaProps } from '../../libs/schema'

import { Schema } from './Schema'
import { TabularSchema } from './TabularSchema'

export const RecordSchema: Component<SchemaProps<RecordSchemaType>> = (props) => {
  return (
    <TabularSchema nullable={props.nullable} type="record">
      <TabularSchema.PropertyName>[key: string]</TabularSchema.PropertyName>
      <div>
        <Schema schema={props.schema.additionalProperties} />
      </div>
    </TabularSchema>
  )
}
