import { For, type ParentComponent } from 'solid-js'

export const SchemaType: ParentComponent<SchemaTypeProps> = (props) => {
  const details = props.details ? (Array.isArray(props.details) ? props.details : [props.details]) : []

  return (
    <>
      <div>{props.children}</div>
      <ul>
        <For each={details}>{(detail) => <li>{detail}</li>}</For>
      </ul>
    </>
  )
}

interface SchemaTypeProps {
  details?: string | string[] | undefined
}
