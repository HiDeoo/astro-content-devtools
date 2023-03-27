import { type Component, createMemo, createResource, createSignal, For, type JSX, Show } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'
import { type CollectionEntry, fetchCollectionEntries } from '../../libs/content'
import { Selector } from '../Selector'

import { DataPanel } from './DataPanel'
import { Panel } from './Panel'

export const EntriesPanel: Component = () => {
  const { collectionName, entrySlug, previewType, setEntrySlug } = useSelection()
  const [entries] = createResource(collectionName, fetchCollectionEntries)

  const [filter, setFilter] = createSignal('')

  const filteredEntries = createMemo(() => {
    if (filter().length === 0) {
      return entries()
    }

    const lowerCaseFilter = filter().toLowerCase()

    return entries()?.filter((entry) => entry.id.toLowerCase().includes(lowerCaseFilter)) ?? []
  })

  const shouldShowDataPanel = () => previewType() === 'data' && entrySlug() !== undefined

  const handleFilterInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
    setFilter(event.currentTarget.value)
  }

  return (
    <>
      <Panel name="entries">
        <Show
          fallback={<Panel.Info message="This content collection does not contain any entries yet." />}
          when={(entries()?.length ?? 0) > 0}
        >
          <Panel.Header>
            <Panel.Input
              aria-label="Filter entries by ID"
              onInput={handleFilterInput}
              placeholder="Filter"
              type="text"
              value={filter()}
            />
          </Panel.Header>
          <Show
            fallback={<Panel.Info message="No entries found matching the filter." />}
            when={(filteredEntries()?.length ?? 0) > 0}
          >
            <ul>
              <For each={filteredEntries()}>
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
        </Show>
      </Panel>
      <Show when={!entries.loading && shouldShowDataPanel()}>
        <DataPanel />
      </Show>
    </>
  )
}
