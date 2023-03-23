import { type Component } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { useSelection } from '../../hooks/useSelection'
import { Schema } from '../schemas/Schema'

import { Panel } from './Panel'

export const SchemaPanel: Component = () => {
  const { collections } = useDevtools()
  const { collectionName } = useSelection()

  const schema = () => {
    const activeCollectionName = collectionName()

    if (!activeCollectionName) {
      throw new Error('Failed to get collection name to render schema.')
    }

    const collectionConfig = collections[activeCollectionName]

    if (!collectionConfig?.schema) {
      throw new Error('Failed to get collection schema to render.')
    }

    return collectionConfig.schema
  }

  return (
    <Panel>
      <Schema root schema={schema()} />
    </Panel>
  )
}
