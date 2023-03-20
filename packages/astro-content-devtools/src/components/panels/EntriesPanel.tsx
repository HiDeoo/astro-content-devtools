import { type Component, createResource, For } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'
import { fetchCollectionEntries } from '../../libs/content'
import { EntrySelector } from '../selectors/EntrySelector'

import { DataPanel } from './DataPanel'
import { Panel } from './Panel'

export const EntriesPanel: Component = () => {
  const { collection, entry, previewType } = useSelection()
  const [entries] = createResource(collection, fetchCollectionEntries)

  const shouldShowDataPanel = () => previewType() === 'data' && entry() !== undefined

  return (
    <>
      <Panel>
        <ul>
          <For each={entries()}>{(entry) => <EntrySelector entry={entry} />}</For>
        </ul>
      </Panel>
      {shouldShowDataPanel() ? <DataPanel /> : null}
    </>
  )
}
