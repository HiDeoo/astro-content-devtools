import { type Component, For } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { Toggle } from '../Toggle'

import { Column } from './Column'

export const Names: Component = () => {
  const { collections } = useDevtools()

  // TODO(HiDeoo) sort
  const collectionNames = Object.keys(collections)

  return (
    <Column>
      <Toggle />
      <ul>
        <For each={collectionNames}>{(collectionName) => <li>{collectionName}</li>}</For>
      </ul>
    </Column>
  )
}
