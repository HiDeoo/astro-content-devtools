import { type Component, For } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'
import { PREVIEW_TYPES, type PreviewType } from '../../libs/previewType'
import { capitalize } from '../../libs/string'
import { Selector } from '../Selector'

import { Panel } from './Panel'

export const PreviewTypesPanel: Component = () => {
  const { previewType, setPreviewType } = useSelection()

  return (
    <Panel>
      <ul>
        <For each={PREVIEW_TYPES}>
          {(panelPreviewType: PreviewType) => {
            return (
              <Selector
                label={`Open ${panelPreviewType}`}
                onSelect={() => setPreviewType(panelPreviewType)}
                selected={previewType() === panelPreviewType}
              >
                {capitalize(panelPreviewType)}
              </Selector>
            )
          }}
        </For>
      </ul>
    </Panel>
  )
}
