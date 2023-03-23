import { createResource, type Component, Show } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'
import { fetchCollectionEntry } from '../../libs/content'

import { Panel } from './Panel'

export const DataPanel: Component = () => {
  const { collectionName, entrySlug } = useSelection()

  const collectionNameAndEntrySlyg = () => {
    const activeCollectionName = collectionName()
    const activeEntrySlug = entrySlug()

    if (!activeCollectionName || !activeEntrySlug) {
      return undefined
    }

    return { collectionName: activeCollectionName, entrySlug: activeEntrySlug }
  }

  const [entry] = createResource(collectionNameAndEntrySlyg, fetchCollectionEntry)

  return (
    <Panel>
      <Show when={entry() !== undefined} fallback="// TODO(HiDeoo) pelase select a valid entry">
        {JSON.stringify(entry())}
      </Show>
    </Panel>
  )
}
