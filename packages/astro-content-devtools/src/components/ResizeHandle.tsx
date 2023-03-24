import { type Component, createEffect, createSignal, onCleanup } from 'solid-js'

import styles from './ResizeHandle.module.css'

export const ResizeHandle: Component<ResizeHandleProps> = (props) => {
  const [isResizing, setIsResizing] = createSignal(false)

  let resizeStartEventReferenceHeight: number
  let resizeStartEventY: number

  createEffect(() => {
    if (isResizing()) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleResizeEnd)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleResizeEnd)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleResizeEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleResizeEnd)
    }
  })

  function setHandleRef(element: HTMLDivElement) {
    element.addEventListener('mousedown', handleResizeStart)
    element.addEventListener('touchstart', handleResizeStart)

    onCleanup(() => {
      element.removeEventListener('mousedown', handleResizeStart)
      element.removeEventListener('touchstart', handleResizeStart)
    })
  }

  function handleResizeStart(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      if (event.button !== 0) {
        return
      }

      resizeStartEventY = event.clientY
    } else if (event instanceof TouchEvent) {
      const touchEvent = event.touches[0]

      if (!touchEvent) {
        return
      }

      resizeStartEventY = touchEvent.clientY
    }

    resizeStartEventReferenceHeight = props.reference.getBoundingClientRect().height

    setIsResizing(true)
  }

  function handleResizeEnd() {
    setIsResizing(false)
  }

  function handleMouseMove(event: MouseEvent) {
    handleResize(event.clientY)
  }

  function handleTouchMove(event: TouchEvent) {
    const touchEvent = event.touches[0]

    if (!touchEvent) {
      return
    }

    handleResize(touchEvent.clientY)
  }

  function handleResize(eventY: number) {
    props.onResize(Math.ceil(resizeStartEventReferenceHeight + resizeStartEventY - eventY), handleResizeEnd)
  }

  return <div class={styles.handle} ref={setHandleRef} />
}

interface ResizeHandleProps {
  onResize: ResizeHandler
  reference: HTMLElement
}

export type ResizeHandler = (newHeight: number, stopResize: () => void) => void
