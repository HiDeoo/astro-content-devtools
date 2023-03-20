import { type Component } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'
import { type CollectionEntry } from '../../libs/content'

export const EntrySelector: Component<EntrySelectorProps> = (props) => {
  const { entry, setEntry } = useSelection()

  const isSelected = () => entry()?.id === props.entry.id

  return (
    <li>
      <button
        style={{ 'background-color': isSelected() ? 'red' : 'white' }}
        onClick={() => {
          setEntry(isSelected() ? undefined : props.entry)
        }}
      >
        {props.entry.id}
      </button>
    </li>
  )
}

interface EntrySelectorProps {
  entry: CollectionEntry
}
