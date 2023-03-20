import { type Accessor, type Context, createContext, createSignal, type ParentComponent, useContext } from 'solid-js'

import { type CollectionName } from '../libs/content'
import { type PreviewType } from '../libs/previewType'

const SelectionContext = createContext<SelectionContextType>() as Context<SelectionContextType>

export function useSelection() {
  return useContext(SelectionContext)
}

export const SelectionProvider: ParentComponent = (props) => {
  const [collection, setCollection] = createSignal<CollectionSelection>(undefined)
  const [previewType, setPreviewType] = createSignal<PreviewTypeSelection>('schema')

  return (
    <SelectionContext.Provider
      value={{
        collection,
        previewType,
        setCollection,
        setPreviewType,
      }}
    >
      {props.children}
    </SelectionContext.Provider>
  )
}

interface SelectionContextType {
  collection: Accessor<CollectionSelection>
  previewType: Accessor<PreviewTypeSelection>
  setCollection: (collection: CollectionSelection) => void
  setPreviewType: (contentType: PreviewTypeSelection) => void
}

type CollectionSelection = CollectionName | undefined
type PreviewTypeSelection = PreviewType
