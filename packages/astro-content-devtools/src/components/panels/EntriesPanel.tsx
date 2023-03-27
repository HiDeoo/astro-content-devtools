import { type Component, createResource, For, Show } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'
import { type CollectionEntry, fetchCollectionEntries } from '../../libs/content'
import { Selector } from '../Selector'

import { DataPanel } from './DataPanel'
import { Panel } from './Panel'

export const EntriesPanel: Component = () => {
  const { collectionName, entrySlug, previewType, setEntrySlug } = useSelection()
  const [entries] = createResource(collectionName, fetchCollectionEntries)

  const shouldShowDataPanel = () => previewType() === 'data' && entrySlug() !== undefined

  return (
    <>
      <Panel name="entries">
        <Show
          fallback={<Panel.Info message="This content collection does not contain any entries yet." />}
          when={(entries()?.length ?? 0) > 0}
        >
          <ul>
            <For each={entries()}>
              {(panelEntry: CollectionEntry) => {
                const isSelected = () => entrySlug() === panelEntry.slug

                return (
                  <Selector
                    label={`Open ${panelEntry.id}`}
                    onSelect={() => setEntrySlug(isSelected() ? undefined : panelEntry.slug)}
                    selected={isSelected()}
                  >
                    {panelEntry.id}
                  </Selector>
                )
              }}
            </For>
          </ul>
        </Show>
      </Panel>
      <Show when={!entries.loading && shouldShowDataPanel()}>
        <DataPanel />
      </Show>
    </>
  )
}
