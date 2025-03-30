'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import TaskList from '@/components/TaskList'
import HardMode from '@/components/HardMode'
import Settings from '@/components/Settings'
import Notification from '@/components/Notification'

export default function Home() {
  const { tasks, customRoasts, notificationInterval } = useStore()
  const [showSettings, setShowSettings] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [currentRoast, setCurrentRoast] = useState('')
  const [lastInteraction, setLastInteraction] = useState(Date.now())

  // Check for inactivity and show notifications
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now()
      const minutesSinceLastInteraction = (now - lastInteraction) / (1000 * 60)
      
      if (minutesSinceLastInteraction >= notificationInterval) {
        const randomRoast = customRoasts[Math.floor(Math.random() * customRoasts.length)]
        setCurrentRoast(randomRoast)
        setShowNotification(true)
      }
    }

    const interval = setInterval(checkInactivity, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [lastInteraction, notificationInterval, customRoasts])

  // Update last interaction when tasks are interacted with
  useEffect(() => {
    setLastInteraction(Date.now())
  }, [tasks])

  const handleNotificationClose = () => {
    setShowNotification(false)
  }

  const handleNotificationSnooze = () => {
    setShowNotification(false)
    setLastInteraction(Date.now()) // Reset the timer
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Procrastination Tracker</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {showSettings ? 'Close Settings' : 'Settings'}
          </button>
        </div>

        {showSettings ? (
          <Settings />
        ) : (
          <TaskList />
        )}

        <HardMode />

        {showNotification && (
          <Notification
            message={currentRoast}
            onClose={handleNotificationClose}
            onSnooze={handleNotificationSnooze}
          />
        )}
      </div>
    </main>
  )
}
