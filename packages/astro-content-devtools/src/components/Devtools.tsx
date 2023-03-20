import { type Component } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'

import { CollectionsColumn } from './columns/CollectionsColumn'
import { Column } from './columns/Column'
import { PreviewTypesColumn } from './columns/PreviewTypesColumn'
import { Panel } from './Panel'
import { Toggle } from './Toggle'

export const Devtools: Component = () => {
  const { isOverlayOpened } = useDevtools()

  return (
    <aside>
      <Panel>
        <CollectionsColumn />
        <PreviewTypesColumn />
        <Column />
      </Panel>
      {isOverlayOpened() ? null : <Toggle />}
    </aside>
  )
}
