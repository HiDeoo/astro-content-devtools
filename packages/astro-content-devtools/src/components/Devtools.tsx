import { type Component } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'
import { useSelection } from '../hooks/useSelection'

import styles from './Devtools.module.css'
import { CollectionsPanel } from './panels/CollectionsPanel'
import { Panel } from './panels/Panel'
import { PreviewTypesPanel } from './panels/PreviewTypesPanel'
import { Toggle } from './Toggle'

export const Devtools: Component = () => {
  const { isOverlayOpened } = useDevtools()
  const { collection, previewType } = useSelection()

  const shouldShowPreviewTypesPanel = () => collection() !== undefined
  const shouldShowSchemaPreviewPanel = () => previewType() === 'schema'

  const classList = () => ({
    [String(styles['opened'])]: isOverlayOpened(),
    [String(styles['column1'])]: !shouldShowPreviewTypesPanel(),
    [String(styles['columns3'])]: shouldShowPreviewTypesPanel() && shouldShowSchemaPreviewPanel(),
    [String(styles['columns4'])]: shouldShowPreviewTypesPanel() && !shouldShowSchemaPreviewPanel(),
  })

  return (
    <aside>
      <div class={styles['devtools']} classList={classList()}>
        <CollectionsPanel />
        {shouldShowPreviewTypesPanel() ? (
          <>
            <PreviewTypesPanel />
            {shouldShowSchemaPreviewPanel() ? (
              <Panel>SCHEMA</Panel>
            ) : (
              <>
                <Panel>PAGE</Panel>
                <Panel>PREVIEW</Panel>
              </>
            )}
          </>
        ) : null}
      </div>
      {isOverlayOpened() ? null : <Toggle />}
    </aside>
  )
}
