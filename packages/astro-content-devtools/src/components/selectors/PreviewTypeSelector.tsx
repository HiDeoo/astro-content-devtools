import { type Component } from 'solid-js'

import { useSelection } from '../../hooks/useSelection'
import { type PreviewType } from '../../libs/previewType'

export const PreviewTypeSelector: Component<PreviewTypeSelectorProps> = (props) => {
  const { previewType, setPreviewType } = useSelection()

  const isSelected = () => previewType() === props.type

  return (
    <li>
      <button
        style={{ 'background-color': isSelected() ? 'red' : 'white' }}
        onClick={() => {
          setPreviewType(props.type)
        }}
      >
        {props.type}
      </button>
    </li>
  )
}

interface PreviewTypeSelectorProps {
  type: PreviewType
}
