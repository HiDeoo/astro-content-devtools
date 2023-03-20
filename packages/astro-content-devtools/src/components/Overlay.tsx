import { type Component } from 'solid-js'

import { Collections } from './column/Collections'
import { Column } from './column/Column'
import { Panel } from './Panel'

export const Overlay: Component = () => {
  return (
    <Panel>
      <Collections />
      <Column />
      <Column />
    </Panel>
  )
}
