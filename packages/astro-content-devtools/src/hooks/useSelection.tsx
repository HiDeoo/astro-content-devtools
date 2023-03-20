import { type Accessor, type Context, createContext, createSignal, type ParentComponent, useContext } from 'solid-js'

import { type CollectionEntry, type CollectionName } from '../libs/content'
import { type PreviewType } from '../libs/previewType'

const SelectionContext = createContext<SelectionContextType>() as Context<SelectionContextType>

export function useSelection() {
  return useContext(SelectionContext)
}

export const SelectionProvider: ParentComponent = (props) => {
  const [collection, setCollection] = createSignal<CollectionSelection>(undefined)
  const [entry, setEntry] = createSignal<EntrySelection>(undefined)
  const [previewType, setPreviewType] = createSignal<PreviewTypeSelection>('schema')

  function handleSelectionChange(collection: CollectionSelection) {
    setCollection(collection)
    setEntry(undefined)
  }

  return (
    <SelectionContext.Provider
      value={{
        collection,
        entry,
        previewType,
        setCollection: handleSelectionChange,
        setEntry,
        setPreviewType,
      }}
    >
      {props.children}
    </SelectionContext.Provider>
  )
}

interface SelectionContextType {
  collection: Accessor<CollectionSelection>
  entry: Accessor<EntrySelection>
  previewType: Accessor<PreviewTypeSelection>
  setCollection: (collection: CollectionSelection) => void
  setEntry: (entry: EntrySelection) => void
  setPreviewType: (contentType: PreviewTypeSelection) => void
}

type CollectionSelection = CollectionName | undefined
type EntrySelection = CollectionEntry | undefined
type PreviewTypeSelection = PreviewType
