import { type Component, For, Show } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { useSelection } from '../../hooks/useSelection'
import { type CollectionName } from '../../libs/content'
import { Link } from '../Link'
import { Selector } from '../Selector'
import { Toggle } from '../Toggle'

import { Panel } from './Panel'

export const CollectionsPanel: Component = () => {
  const { collections } = useDevtools()
  const { collectionName, setCollectionName } = useSelection()

  // TODO(HiDeoo) sort
  const collectionNames = Object.keys(collections)

  return (
    <Panel name="collections">
      <Panel.Header>
        <Toggle />
      </Panel.Header>
      <Show
        fallback={
          <Panel.Info
            details={
              <p>
                Make sure to{' '}
                <Link href="https://docs.astro.build/en/guides/content-collections/#defining-collections">define</Link>{' '}
                at least one content collection.
              </p>
            }
            message="No content collections found."
          />
        }
        when={collectionNames.length > 0}
      >
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
      </Show>
    </Panel>
  )
}
