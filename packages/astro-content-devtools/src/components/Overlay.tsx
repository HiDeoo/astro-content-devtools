import { type Component } from 'solid-js'

import { Column } from './column/Column'
import { Names } from './column/Names'
import { Panel } from './Panel'

export const Overlay: Component = () => {
  return (
    <Panel>
      <Names />
      <Column />
      <Column />
    </Panel>
  )
}
