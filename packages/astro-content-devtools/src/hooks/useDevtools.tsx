import { type Accessor, type Context, createContext, type ParentComponent, useContext } from 'solid-js'

import { type Collections } from '../libs/content'
import { createLocalStorageSignal } from '../libs/signal'

const devtoolsDefaultHeightInPx = 500

const DevtoolsContext = createContext<DevtoolsContextType>() as Context<DevtoolsContextType>

export function useDevtools() {
  return useContext(DevtoolsContext)
}

export const DevtoolsProvider: ParentComponent<DevtoolsProviderProps> = (props) => {
  const [isOverlayOpened, setIsOverlayOpened] = createLocalStorageSignal('astroContentDevtoolsIsOverlayOpened', false)
  const [overlayHeight, setOverlayHeight] = createLocalStorageSignal(
    'astroContentDevtoolsOverlayHeight',
    devtoolsDefaultHeightInPx
  )

  function toggleOverlay() {
    setIsOverlayOpened((prevIsOverlayOpened) => !prevIsOverlayOpened)
  }

  return (
    <DevtoolsContext.Provider
      value={{
        collections: props.collections,
        isOverlayOpened,
        overlayHeight,
        setOverlayHeight,
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
  overlayHeight: Accessor<number>
  setOverlayHeight: (height: number) => void
  toggleOverlay: () => void
}

interface DevtoolsProviderProps {
  collections: Collections
}
