import { type Component, For } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { CollectionSelector } from '../selectors/CollectionSelector'
import { Toggle } from '../Toggle'

import { Panel } from './Panel'

// TODO(HiDeoo) nis
export const CollectionsPanel: Component = () => {
  const { collections } = useDevtools()

  // TODO(HiDeoo) sort
  const collectionNames = Object.keys(collections)

  return (
    <Panel>
      <Toggle />
      <ul>
        <For each={collectionNames}>{(collectionName) => <CollectionSelector name={collectionName} />}</For>
      </ul>
    </Panel>
  )
}
