import { type Accessor, type Context, createContext, type ParentComponent, useContext } from 'solid-js'

import { type Collections } from '../libs/content'
import { createLocalStorageSignal } from '../libs/signal'

const DevtoolsContext = createContext<DevtoolsContextType>() as Context<DevtoolsContextType>

export function useDevtools() {
  return useContext(DevtoolsContext)
}

export const DevtoolsProvider: ParentComponent<DevtoolsProviderProps> = (props) => {
  const [isOverlayOpened, setIsOverlayOpened] = createLocalStorageSignal('astroContentDevtoolsIsOverlayOpened', false)

  function toggleOverlay() {
    setIsOverlayOpened((prevIsOverlayOpened) => !prevIsOverlayOpened)
  }

  return (
    <DevtoolsContext.Provider
      value={{
        collections: props.collections,
        isOverlayOpened,
        toggleOverlay,
      }}
    >
      {props.children}
    </DevtoolsContext.Provider>
  )
}

interface DevtoolsContextType {
  collections: Collections
  isOverlayOpened: Accessor<boolean>
  toggleOverlay: () => void
}

interface DevtoolsProviderProps {
  collections: Collections
}
