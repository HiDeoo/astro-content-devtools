import { type Accessor, type Context, createContext, createSignal, type ParentComponent, useContext } from 'solid-js'

import { type CollectionName } from '../libs/content'

const SelectionContext = createContext<SelectionContextType>() as Context<SelectionContextType>

export function useSelection() {
  return useContext(SelectionContext)
}

export const SelectionProvider: ParentComponent = (props) => {
  const [collection, setCollection] = createSignal<CollectionSelection>(undefined)

  return (
    <SelectionContext.Provider
      value={{
        collection,
        setCollection,
      }}
    >
      {props.children}
    </SelectionContext.Provider>
  )
}

interface SelectionContextType {
  collection: Accessor<CollectionSelection>
  setCollection: (collection: CollectionSelection) => void
}

type CollectionSelection = CollectionName | undefined
