import { type Component } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'

import { Collections } from './column/Collections'
import { Column } from './column/Column'
import { Panel } from './Panel'
import { Toggle } from './Toggle'

export const Devtools: Component = () => {
  const { isOverlayOpened } = useDevtools()

  return (
    <aside>
      <Panel>
        <Collections />
        <Column />
        <Column />
      </Panel>
      {isOverlayOpened() ? null : <Toggle />}
    </aside>
  )
}
