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
  const { collectionName, setCollectionName } = useSelection()

  // TODO(HiDeoo) sort
  const collectionNames = Object.keys(collections)

  return (
    <Panel name="collections">
      <Toggle />
      <ul>
        <For each={collectionNames}>
          {(panelCollectionName: CollectionName) => {
            const isSelected = () => collectionName() === panelCollectionName

            return (
              <Selector
                label={`Open details for the ${panelCollectionName} collection`}
                onSelect={() => setCollectionName(isSelected() ? undefined : panelCollectionName)}
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
