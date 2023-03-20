import { type Component } from 'solid-js'

import { useDevtools } from '../hooks/useDevtools'

import { Overlay } from './Overlay'
import { Toggle } from './Toggle'

export const Devtools: Component = () => {
  const { isOverlayOpened } = useDevtools()

  return (
    <aside>
      <Overlay />
      {isOverlayOpened() ? null : <Toggle />}
    </aside>
  )
}
