import { useEffect, useRef } from 'react'

const useKeyboardShortcut = (shortcutKey, callback) => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { metaKey, ctrlKey, key } = event
      const isShortcutKeyPressed =
        (metaKey || ctrlKey) && key.toLowerCase() === shortcutKey.toLowerCase()

      if (isShortcutKeyPressed) {
        event.preventDefault()
        callbackRef.current()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [shortcutKey])
}

export default useKeyboardShortcut
