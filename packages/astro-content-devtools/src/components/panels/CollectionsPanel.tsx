import { type Component, For } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { useSelection } from '../../hooks/useSelection'
import { type CollectionName } from '../../libs/content'
import { Selector } from '../Selector'
import { Toggle } from '../Toggle'

import { Panel } from './Panel'

// TODO(HiDeoo) nis
export const CollectionsPanel: Component = () => {
  const { collections } = useDevtools()
  const { collection, setCollection } = useSelection()

  // TODO(HiDeoo) sort
  const collectionNames = Object.keys(collections)

  return (
    <Panel>
      <Toggle />
      <ul>
        <For each={collectionNames}>
          {(panelCollectionName: CollectionName) => {
            const isSelected = () => collection() === panelCollectionName

            return (
              <Selector
                onSelect={() => setCollection(isSelected() ? undefined : panelCollectionName)}
                selected={isSelected()}
              >
                {panelCollectionName}
              </Selector>
            )
          }}
        </For>
      </ul>
    </Panel>
  )
}
