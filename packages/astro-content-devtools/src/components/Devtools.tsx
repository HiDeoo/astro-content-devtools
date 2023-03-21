import { type Component, Show } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'
import { useSelection } from '../hooks/useSelection'

import { CollectionsPanel } from './panels/CollectionsPanel'
import { EntriesPanel } from './panels/EntriesPanel'
import { Panels } from './panels/Panels'
import { PreviewTypesPanel } from './panels/PreviewTypesPanel'
import { SchemaPanel } from './panels/SchemaPanel'
import { Toggle } from './Toggle'

export const Devtools: Component = () => {
  const { isOverlayOpened } = useDevtools()
  const { collection, entry, previewType } = useSelection()

  const shouldShowPreviewTypesPanel = () => collection() !== undefined
  const shouldShowSchemaPanel = () => previewType() === 'schema'
  const shouldShowDataPanel = () => previewType() === 'data' && entry() !== undefined

  return (
    <aside>
      <Panels columns={shouldShowPreviewTypesPanel() ? (shouldShowDataPanel() ? 4 : 3) : 1}>
        <CollectionsPanel />
        <Show when={shouldShowPreviewTypesPanel()}>
          <PreviewTypesPanel />
          <Show when={shouldShowSchemaPanel()} fallback={<EntriesPanel />}>
            <SchemaPanel />
          </Show>
        </Show>
      </Panels>
      <Show when={!isOverlayOpened()}>
        <Toggle />
      </Show>
    </aside>
  )
}
