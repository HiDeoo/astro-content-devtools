import { type Component, Match, Show, Switch } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'
import { useSelection } from '../hooks/useSelection'

import styles from './Devtools.module.css'
import { CollectionsPanel } from './panels/CollectionsPanel'
import { EntriesPanel } from './panels/EntriesPanel'
import { Panels } from './panels/Panels'
import { PreviewTypesPanel } from './panels/PreviewTypesPanel'
import { SchemaPanel } from './panels/SchemaPanel'
import { ResizeHandle, type ResizeHandler } from './ResizeHandle'
import { Toggle } from './Toggle'

const devtoolsMinHeightInPx = 100

export const Devtools: Component = () => {
  let overlay!: HTMLElement

  const { collections, isOverlayOpened, overlayHeight, setOverlayHeight, toggleOverlay } = useDevtools()
  const { collectionName, previewType } = useSelection()

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

  const handleResize: ResizeHandler = (newHeight, stopResize) => {
    if (newHeight < devtoolsMinHeightInPx) {
      stopResize()
      toggleOverlay()
      setOverlayHeight(devtoolsMinHeightInPx)

      return
    }

    setOverlayHeight(newHeight)
  }

  return (
    <aside
      class={styles.devtools}
      classList={{ [styles.opened!]: isOverlayOpened() }}
      ref={overlay}
      style={{ height: `${overlayHeight()}px` }}
    >
      <ResizeHandle onResize={handleResize} reference={overlay} />
      <Panels>
        <Show when={isOverlayOpened()}>
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
        </Show>
      </Panels>
      <Show when={!isOverlayOpened()}>
        <Toggle />
      </Show>
    </aside>
  )
}
