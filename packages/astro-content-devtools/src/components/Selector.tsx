import { type ParentComponent } from 'solid-js'

export const Selector: ParentComponent<SelectorProps> = (props) => {
  return (
    <li>
      <button style={{ 'background-color': props.selected ? 'red' : 'white' }} onClick={props.onSelect}>
        {props.children}
      </button>
    </li>
  )
}

interface SelectorProps {
  onSelect: () => void
  selected: boolean
}
