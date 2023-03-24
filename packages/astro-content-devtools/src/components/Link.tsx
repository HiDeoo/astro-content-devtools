import { type ParentComponent } from 'solid-js'

import styles from './Link.module.css'

export const Link: ParentComponent<LinkProps> = (props) => {
  return (
    <a class={styles.link} href={props.href} rel="noreferrer" target="_blank">
      {props.children}
    </a>
  )
}

interface LinkProps {
  href: string
}
