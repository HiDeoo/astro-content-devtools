import { type Component } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'
import { type CollectionName } from '../../libs/content'

export const Collection: Component<CollectionProps> = (props) => {
  const { collection, setCollection } = useSelection()

  const isSelected = () => collection() === props.name

  return (
    <li>
      <button
        style={{ 'background-color': isSelected() ? 'red' : 'white' }}
        onClick={() => {
          setCollection(isSelected() ? undefined : props.name)
        }}
      >
        {props.name}
      </button>
    </li>
  )
}

interface CollectionProps {
  name: CollectionName
}
