import { type ParentComponent } from 'solid-js'

export const Column: ParentComponent = (props) => {
  return <div style={{ border: '1px solid red' }}>{props.children}</div>
}
