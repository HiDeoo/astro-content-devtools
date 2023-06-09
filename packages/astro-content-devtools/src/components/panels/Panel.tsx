import { type JSX, type Component, type ParentComponent, type ParentProps, Show, Suspense } from 'solid-js'

import styles from './Panel.module.css'

export const Panel = (props: ParentProps<PanelProps>) => {
  return (
    <div
      class={styles.panel}
      classList={{ [`acd-panel-${props.name}`]: true }}
      data-testid={`panel-${props.name}`}
      style={props.style}
    >
      <Suspense fallback={<PanelInfo message="Loading…" />}>{props.children}</Suspense>
    </div>
  )
}

const PanelHeader: ParentComponent = (props) => {
  return <header class={styles.header}>{props.children}</header>
}

Panel.Header = PanelHeader

const PanelInfo: Component<PanelInfoProps> = (props) => {
  return (
    <div class={styles.info}>
      <div>
        {props.message}
        <Show when={props.details !== undefined}>
          <div class={styles.infoDetails}>{props.details}</div>
        </Show>
      </div>
    </div>
  )
}

Panel.Info = PanelInfo

const PanelInput: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} class={styles.input} />
}

Panel.Input = PanelInput

interface PanelProps {
  name: string
  style?: JSX.CSSProperties | string
}

interface PanelInfoProps {
  details?: JSX.Element | string
  message: string
}
