import { type Component, For } from 'solid-js'

import { PREVIEW_TYPES } from '../../libs/previewType'
import { PreviewTypeRow } from '../rows/PreviewTypeRow'

import { Column } from './Column'

export const PreviewTypesColumn: Component = () => {
  return (
    <Column>
      <ul>
        <For each={PREVIEW_TYPES}>{(previewType) => <PreviewTypeRow type={previewType} />}</For>
      </ul>
    </Column>
  )
}
