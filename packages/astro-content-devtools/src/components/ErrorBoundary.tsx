import { type Component, ErrorBoundary as SolidErrorBoundary, type ParentComponent } from 'solid-js'

import pkg from '../../package.json'

import styles from './ErrorBoundary.module.css'
import { Link } from './Link'
import { Panel } from './panels/Panel'
import { Toggle } from './Toggle'

export const ErrorBoundary: ParentComponent = (props) => {
  return <SolidErrorBoundary fallback={ErrorBoundaryFallback}>{props.children}</SolidErrorBoundary>
}

export const ErrorBoundaryFallback = (error: unknown) => {
  console.error(error)

  return (
    <Panel name="error">
      <Panel.Header>
        <Toggle />
      </Panel.Header>
      <Panel.Info
        details={
          <>
            <p>
              <Link href={pkg.bugs}>Report</Link> this issue.
            </p>
            <ErrorBoundaryError error={error} />
          </>
        }
        message="Something went wrong!"
      />
    </Panel>
  )
}

export const ErrorBoundaryError: Component<ErrorBoundaryErrorProps> = (props) => {
  return (
    <code class={styles.error}>
      <pre>{props.error instanceof Error ? props.error.stack : String(props.error)}</pre>
      {/* {props.error instanceof Error ? props.error.stack : String(props.error)} */}
    </code>
  )
}

interface ErrorBoundaryErrorProps {
  error: unknown
}
