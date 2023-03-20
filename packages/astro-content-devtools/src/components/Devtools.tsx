import { type Component } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'
import { useSelection } from '../hooks/useSelection'

import { CollectionsColumn } from './columns/CollectionsColumn'
import { Column } from './columns/Column'
import { PreviewTypesColumn } from './columns/PreviewTypesColumn'
import { Panel } from './Panel'
import { Toggle } from './Toggle'

export const Devtools: Component = () => {
  const { isOverlayOpened } = useDevtools()
  const { collection, previewType } = useSelection()

  const shouldShowPreviewTypesColumn = () => collection() !== undefined
  const shouldShowSchemaPreview = () => previewType() === 'schema'

  return (
    <aside>
      <Panel columns={shouldShowPreviewTypesColumn() ? (shouldShowSchemaPreview() ? 3 : 4) : 1}>
        <CollectionsColumn />
        {shouldShowPreviewTypesColumn() ? (
          <>
            <PreviewTypesColumn />
            {shouldShowSchemaPreview() ? (
              <Column>SCHEMA</Column>
            ) : (
              <>
                <Column>PAGE</Column>
                <Column>PREVIEW</Column>
              </>
            )}
          </>
        ) : null}
      </Panel>
      {isOverlayOpened() ? null : <Toggle />}
    </aside>
  )
}
