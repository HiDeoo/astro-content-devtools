import { type Component, For } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { Collection } from '../row/Collection'
import { Toggle } from '../Toggle'

import { Column } from './Column'

// TODO(HiDeoo) nis
export const Collections: Component = () => {
  const { collections } = useDevtools()

  // TODO(HiDeoo) sort
  const collectionNames = Object.keys(collections)

  return (
    <Column>
      <Toggle />
      <ul>
        <For each={collectionNames}>{(collectionName) => <Collection name={collectionName} />}</For>
      </ul>
    </Column>
  )
}
