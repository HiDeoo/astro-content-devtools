import { type Component } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'

import { Panel } from './Panel'

export const DataPanel: Component = () => {
  const { entry } = useSelection()

  return <Panel>{JSON.stringify(entry())}</Panel>
}
