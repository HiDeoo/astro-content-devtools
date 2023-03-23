import { type Component } from 'solid-js'

import { type MapSchemaType, type SchemaProps } from '../../libs/schema'

import { Schema } from './Schema'
import { TabularSchema } from './TabularSchema'

export const MapSchema: Component<SchemaProps<MapSchemaType>> = (props) => {
  props.schema.items.items
  return (
    <TabularSchema nullable={props.nullable} type="map">
      <TabularSchema.PropertyName>
        <Schema schema={props.schema.items.items[0]} />
      </TabularSchema.PropertyName>
      <Schema schema={props.schema.items.items[1]} />
    </TabularSchema>
  )
}
