import { createResource, type Component, Show } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'
import { fetchCollectionEntry } from '../../libs/content'
import { DataContent } from '../data/DataContent'
import { DataSection } from '../data/DataSection'
import { DataVariable } from '../data/DataVariable'

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
    <Panel style={{ 'background-color': 'var(--acd-color-gray-700)' }}>
      <Show when={entry() !== undefined} fallback="// TODO(HiDeoo) pelase select a valid entry">
        <DataSection title="Details">
          <DataVariable key="Id" value={entry()?.id} />
          <DataVariable key="Slug" value={entry()?.slug} />
        </DataSection>
        <DataSection title="Actions">
          <div>{'// TODO(HiDeoo)'}</div>
          <div>{'// TODO(HiDeoo)'}</div>
          <div>{'// TODO(HiDeoo)'}</div>
        </DataSection>
        <DataSection title="Frontmatter">
          {/* // TODO(HiDeoo)  */}
          <div>{JSON.stringify(entry()?.data)}</div>
        </DataSection>
        <DataSection title="Content">
          <DataContent>{entry()?.body}</DataContent>
        </DataSection>
      </Show>
    </Panel>
  )
}
