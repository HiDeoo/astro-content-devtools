import { type Component, For } from 'solid-js'

import { PREVIEW_TYPES } from '../../libs/previewType'
import { PreviewTypeSelector } from '../selectors/PreviewTypeSelector'

import { Panel } from './Panel'

export const PreviewTypesPanel: Component = () => {
  return (
    <Panel>
      <ul>
        <For each={PREVIEW_TYPES}>{(previewType) => <PreviewTypeSelector type={previewType} />}</For>
      </ul>
    </Panel>
  )
}
