import { type Component } from 'solid-js'

import { type StringSchemaType } from '../../libs/schema'

export const StringSchema: Component<StringSchemaProps> = () => {
  // TODO(HiDeoo) minLength
  // TODO(HiDeoo) maxLength
  // TODO(HiDeoo) format
  // TODO(HiDeoo) pattern
  // TODO(HiDeoo) allOf??????
  // TODO(HiDeoo) errorMessage??????
  return <>string</>
}

interface StringSchemaProps {
  schema: StringSchemaType
}
