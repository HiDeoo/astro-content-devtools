import { type Component } from 'solid-js'

import { type RecordSchemaType, type WithSchemaProps } from '../../libs/schema'

import styles from './RecordSchema.module.css'
import { Schema } from './Schema'

export const RecordSchema: Component<WithSchemaProps<RecordSchemaType>> = (props) => {
  return (
    <div class={styles['record']}>
      <div class={styles['propertyName']}>[key: string]</div>
      <div>
        <Schema schema={props.schema.additionalProperties} />
      </div>
    </div>
  )
}
