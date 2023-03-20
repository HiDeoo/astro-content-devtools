import { type Component, For } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { CollectionRow } from '../rows/CollectionRow'
import { Toggle } from '../Toggle'

import { Column } from './Column'

// TODO(HiDeoo) nis
export const CollectionsColumn: Component = () => {
  const { collections } = useDevtools()

  // TODO(HiDeoo) sort
  const collectionNames = Object.keys(collections)

  return (
    <Column>
      <Toggle />
      <ul>
        <For each={collectionNames}>{(collectionName) => <CollectionRow name={collectionName} />}</For>
      </ul>
    </Column>
  )
}
