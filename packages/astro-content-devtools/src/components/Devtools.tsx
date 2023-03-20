import { type Component } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'
import { useSelection } from '../hooks/useSelection'

import { CollectionsPanel } from './panels/CollectionsPanel'
import { Panel } from './panels/Panel'
import { Panels } from './panels/Panels'
import { PreviewTypesPanel } from './panels/PreviewTypesPanel'
import { SchemaPanel } from './panels/SchemaPanel'
import { Toggle } from './Toggle'

export const Devtools: Component = () => {
  const { isOverlayOpened } = useDevtools()
  const { collection, previewType } = useSelection()

  const shouldShowPreviewTypesPanel = () => collection() !== undefined
  const shouldShowSchemaPanel = () => previewType() === 'schema'

  return (
    <aside>
      <Panels columns={shouldShowPreviewTypesPanel() ? (shouldShowSchemaPanel() ? 3 : 4) : 1}>
        <CollectionsPanel />
        {shouldShowPreviewTypesPanel() ? (
          <>
            <PreviewTypesPanel />
            {shouldShowSchemaPanel() ? (
              <SchemaPanel />
            ) : (
              <>
                <Panel>PAGE</Panel>
                <Panel>PREVIEW</Panel>
              </>
            )}
          </>
        ) : null}
      </Panels>
      {isOverlayOpened() ? null : <Toggle />}
    </aside>
  )
}
