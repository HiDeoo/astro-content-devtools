import { type Accessor, type Context, createContext, type ParentComponent, useContext } from 'solid-js'

import { type CollectionEntry, type CollectionName } from '../libs/content'
import { type PreviewType } from '../libs/previewType'
import { createLocalStorageSignal } from '../libs/signal'

const SelectionContext = createContext<SelectionContextType>() as Context<SelectionContextType>

export function useSelection() {
  return useContext(SelectionContext)
}

export const SelectionProvider: ParentComponent = (props) => {
  const [collectionName, setCollectionName] = createLocalStorageSignal<CollectionNameSelection>(
    'astroContentDevtoolsActiveCollectionName',
    undefined
  )
  const [previewType, setPreviewType] = createLocalStorageSignal<PreviewTypeSelection>(
    'astroContentDevtoolsActivePreviewType',
    'schema'
  )
  const [entrySlug, setEntrySlug] = createLocalStorageSignal<EntrySlugSelection>(
    'astroContentDevtoolsActiveEntrySlug',
    undefined
  )

  function handleCollectionNameChange(collectionName: CollectionNameSelection) {
    setCollectionName(collectionName)
    setEntrySlug(undefined)
  }

  return (
    <SelectionContext.Provider
      value={{
        collectionName,
        entrySlug,
        previewType,
        setCollectionName: handleCollectionNameChange,
        setEntrySlug,
        setPreviewType,
      }}
    >
      {props.children}
    </SelectionContext.Provider>
  )
}

interface SelectionContextType {
  collectionName: Accessor<CollectionNameSelection>
  entrySlug: Accessor<EntrySlugSelection>
  previewType: Accessor<PreviewTypeSelection>
  setCollectionName: (collectionName: CollectionNameSelection) => void
  setEntrySlug: (entrySlug: EntrySlugSelection) => void
  setPreviewType: (contentType: PreviewTypeSelection) => void
}

type CollectionNameSelection = CollectionName | undefined
type PreviewTypeSelection = PreviewType
type EntrySlugSelection = CollectionEntry['slug'] | undefined
