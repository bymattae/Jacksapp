import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'

interface NotificationProps {
  message: string
  onClose: () => void
  onSnooze: () => void
}

export default function Notification({ message, onClose, onSnooze }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 5000) // Auto close after 5 seconds

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm">
        <p className="text-gray-800 mb-4">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsVisible(false)
              onClose()
            }}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Do something now
          </button>
          <button
            onClick={() => {
              setIsVisible(false)
              onSnooze()
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Snooze
          </button>
        </div>
      </div>
    </div>
  )
} 