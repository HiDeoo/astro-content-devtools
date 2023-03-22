import { type ParentComponent } from 'solid-js'

import styles from './Selector.module.css'

export const Selector: ParentComponent<SelectorProps> = (props) => {
  return (
    <li>
      <button
        aria-label={props.label}
        class={styles.selector}
        classList={{ [styles.selected!]: props.selected }}
        onClick={props.onSelect}
      >
        {props.children}
      </button>
    </li>
  )
}

interface SelectorProps {
  label: string
  onSelect: () => void
  selected: boolean
}
