import { ErrorBoundary as SolidErrorBoundary, type ParentComponent } from 'solid-js'

export const ErrorBoundary: ParentComponent = (props) => {
  return <SolidErrorBoundary fallback={ErrorBoundaryFallback}>{props.children}</SolidErrorBoundary>
}

export const ErrorBoundaryFallback = (error: unknown, reset: () => void) => {
  console.error(error)

  // TODO(HiDeoo)
  reset

  // TODO(HiDeoo)
  return <div>{JSON.stringify(error)}</div>
}
