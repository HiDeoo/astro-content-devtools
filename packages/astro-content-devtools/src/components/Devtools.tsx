import { type Component, For } from 'solid-js'

import { type Collections } from '../libs/content'

export const Devtools: Component<{ collections: Collections }> = (props) => {
  const collectionNames = Object.keys(props.collections)

  return (
    <ul>
      <For each={collectionNames}>{(collectionName) => <li>{collectionName}</li>}</For>
    </ul>
  )
}
