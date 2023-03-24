import { createResource, type Component, Show } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'
import { fetchCollectionEntry } from '../../libs/content'
import { DataButton } from '../data/DataButton'
import { DataContent } from '../data/DataContent'
import { DataFrontmatter } from '../data/DataFrontmatter'
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
    <Panel name="data" style={{ 'background-color': 'var(--acd-color-gray-700)' }}>
      <Show when={entry() !== undefined} fallback="// TODO(HiDeoo) pelase select a valid entry">
        <DataSection title="Details">
          <DataVariable key="ID" value={entry()?.id} />
          <DataVariable key="Slug" value={entry()?.slug} />
        </DataSection>
        <DataSection title="Actions" horizontal>
          <DataButton copyData={entry()?.id}>Copy ID</DataButton>
          <DataButton copyData={JSON.stringify(entry()?.data, null, 2)}>Copy Frontmatter</DataButton>
          <DataButton copyData={entry()?.body}>Copy Content</DataButton>
        </DataSection>
        <DataSection title="Frontmatter">
          <DataFrontmatter frontmatter={entry()?.data} />
        </DataSection>
        <DataSection title="Content">
          <DataContent>{entry()?.body}</DataContent>
        </DataSection>
      </Show>
    </Panel>
  )
}
