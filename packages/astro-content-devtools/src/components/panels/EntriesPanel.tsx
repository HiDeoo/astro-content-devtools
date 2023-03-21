import { type Component, createResource, For, Show } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'
import { type CollectionEntry, fetchCollectionEntries } from '../../libs/content'
import { Selector } from '../Selector'

import { DataPanel } from './DataPanel'
import { Panel } from './Panel'

export const EntriesPanel: Component = () => {
  const { collection, entry, previewType, setEntry } = useSelection()
  const [entries] = createResource(collection, fetchCollectionEntries)

  const shouldShowDataPanel = () => previewType() === 'data' && entry() !== undefined

  return (
    <>
      <Panel>
        <ul>
          <For each={entries()}>
            {(panelEntry: CollectionEntry) => {
              const isSelected = () => entry()?.id === panelEntry.id

              return (
                <Selector
                  label={`Open ${panelEntry.id}`}
                  onSelect={() => setEntry(isSelected() ? undefined : panelEntry)}
                  selected={isSelected()}
                >
                  {panelEntry.id}
                </Selector>
              )
            }}
          </For>
        </ul>
      </Panel>
      <Show when={shouldShowDataPanel()}>
        <DataPanel />
      </Show>
    </>
  )
}
