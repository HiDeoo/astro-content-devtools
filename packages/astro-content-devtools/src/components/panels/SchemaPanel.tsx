import { type Component } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { useSelection } from '../../hooks/useSelection'

import { Panel } from './Panel'

export const SchemaPanel: Component = () => {
  const { collections } = useDevtools()
  const { collection } = useSelection()

  const schema = () => {
    const collectionName = collection()

    if (!collectionName) {
      // TODO(HiDeoo) test
      throw new Error('Failed to get collection name to render schema.')
    }

    const collectionConfig = collections[collectionName]

    if (!collectionConfig?.schema) {
      // TODO(HiDeoo) test
      throw new Error('Failed to get collection schema to render.')
    }

    return collectionConfig.schema
  }

  return <Panel>{JSON.stringify(schema())}</Panel>
}
