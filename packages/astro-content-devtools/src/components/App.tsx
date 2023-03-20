import { type Component } from 'solid-js'

import { DevtoolsProvider } from '../hooks/useDevtools'
import { SelectionProvider } from '../hooks/useSelection'
import { type Collections } from '../libs/content'

import { Devtools } from './Devtools'

import '../styles/theme.css'

export const App: Component<AppProps> = (props) => {
  return (
    <DevtoolsProvider collections={props.collections}>
      <SelectionProvider>
        <Devtools />
      </SelectionProvider>
    </DevtoolsProvider>
  )
}

interface AppProps {
  collections: Collections
}
