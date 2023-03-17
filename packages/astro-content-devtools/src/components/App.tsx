import { type Component } from 'solid-js'

import { DevtoolsProvider } from '../hooks/useDevtools'
import { type Collections } from '../libs/content'

import { Devtools } from './Devtools'

export const App: Component<AppProps> = (props) => {
  return (
    <DevtoolsProvider collections={props.collections}>
      <Devtools />
    </DevtoolsProvider>
  )
}

interface AppProps {
  collections: Collections
}
