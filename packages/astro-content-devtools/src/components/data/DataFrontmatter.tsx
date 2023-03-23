import { type Component, For, Show, createSignal } from 'solid-js'

import { type FrontmatterProperty, getFrontmatterProperties } from '../../libs/frontmatter'

import styles from './DataFrontmatter.module.css'

export const DataFrontmatter: Component<DataFrontmatterProps> = (props) => {
  const properties = getFrontmatterProperties(props.frontmatter)

  return (
    <ul class={styles.properties}>
      <For each={properties}>{(property) => <DataFrontmatterProperty key={property.key} value={property.value} />}</For>
    </ul>
  )
}

export const DataFrontmatterProperty: Component<FrontmatterProperty> = (props) => {
  const [collapsed, setCollapased] = createSignal(true)

  const properties = getFrontmatterProperties(props.value)

  function handleToggle() {
    setCollapased((prevCollapsed) => !prevCollapsed)
  }

  return (
    <Show
      when={properties.length > 0}
      fallback={
        <li>
          <span class={styles.key}>{props.key}:</span> <code class={styles.value}>{JSON.stringify(props.value)}</code>
        </li>
      }
    >
      <li>
        <button class={styles.collapser} onClick={handleToggle}>
          <span class={styles.collapserIcon} classList={{ [styles.collapsed!]: collapsed() }}>
            ▶
          </span>
          {props.key}
          <span class={styles.infos}>
            {properties.length} {properties.length > 1 ? `entries` : `entry`}
          </span>
        </button>
        <Show when={!collapsed()}>
          <ul class={styles.properties}>
            <For each={properties}>
              {(property) => <DataFrontmatterProperty key={property.key} value={property.value} />}
            </For>
          </ul>
        </Show>
      </li>
    </Show>
  )
}

interface DataFrontmatterProps {
  frontmatter: unknown
}
