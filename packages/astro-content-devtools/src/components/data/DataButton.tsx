import { createSignal, onCleanup, type JSX, type ParentComponent } from 'solid-js'

import styles from './DataButton.module.css'

const intentTimeoutDurationInMs = 1000

export const DataButton: ParentComponent<DataButtonProps> = (props) => {
  if (!props.onClick && !props.copyData) {
    throw new Error(`DataButton must have either an 'onClick' or 'copyData' prop.`)
  }

  const [intent, setIntent] = createSignal<DataButtonIntent | undefined>(undefined)
  let intentTimeout: ReturnType<typeof setTimeout> | undefined

  onCleanup(() => {
    if (intentTimeout) {
      clearTimeout(intentTimeout)
    }
  })

  function setIntentWithTimeout(intent: DataButtonIntent) {
    if (intentTimeout) {
      clearTimeout(intentTimeout)
    }

    setIntent(intent)

    intentTimeout = setTimeout(() => {
      setIntent(undefined)
    }, intentTimeoutDurationInMs)
  }

  async function handleCopyData() {
    if (!props.copyData) {
      return
    }

    try {
      await navigator.clipboard.writeText(props.copyData)

      setIntentWithTimeout('success')
    } catch (error) {
      console.error('Failed to copy data to the clipboard.', error)

      setIntentWithTimeout('danger')
    }
  }

  return (
    <button
      class={styles.button}
      classList={{
        [styles.danger!]: intent() === 'danger',
        [styles.success!]: intent() === 'success',
      }}
      onClick={props.copyData ? handleCopyData : props.onClick}
    >
      {props.children}
    </button>
  )
}

interface DataButtonProps {
  copyData?: string
  onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>
}

type DataButtonIntent = 'danger' | 'success'
