import { type Component, Match, Show, Switch } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'
import { useSelection } from '../hooks/useSelection'

import { CollectionsPanel } from './panels/CollectionsPanel'
import { EntriesPanel } from './panels/EntriesPanel'
import { Panels } from './panels/Panels'
import { PreviewTypesPanel } from './panels/PreviewTypesPanel'
import { SchemaPanel } from './panels/SchemaPanel'
import { Toggle } from './Toggle'

export const Devtools: Component = () => {
  const { collections, isOverlayOpened } = useDevtools()
  const { collectionName, entrySlug, previewType } = useSelection()

  const shouldShowPreviewTypesPanel = () => {
    const activeCollectionName = collectionName()

    if (!activeCollectionName) {
      return false
    }

    const collectionConfig = collections[activeCollectionName]

    if (!collectionConfig) {
      return false
    }

    return true
  }
  const shouldShowSchemaPanel = () => shouldShowPreviewTypesPanel() && previewType() === 'schema'
  const shouldShowEntriesPanel = () => shouldShowPreviewTypesPanel() && previewType() === 'data'
  const shouldShowDataPanel = () =>
    shouldShowPreviewTypesPanel() && previewType() === 'data' && entrySlug() !== undefined

  const columnCount = () => {
    if (!shouldShowPreviewTypesPanel()) {
      return 1
    }

    if (!shouldShowSchemaPanel() && !shouldShowEntriesPanel()) {
      return 2
    }

    return shouldShowDataPanel() ? 4 : 3
  }

  return (
    <aside>
      <Panels columns={columnCount()}>
        <CollectionsPanel />
        <Show when={shouldShowPreviewTypesPanel()}>
          <PreviewTypesPanel />
          <Switch>
            <Match when={shouldShowSchemaPanel()}>
              <SchemaPanel />
            </Match>
            <Match when={shouldShowEntriesPanel()}>
              <EntriesPanel />
            </Match>
          </Switch>
        </Show>
      </Panels>
      <Show when={!isOverlayOpened()}>
        <Toggle />
      </Show>
    </aside>
  )
}
