import { useState } from 'react'
import { useStore } from '@/lib/store'

export default function Settings() {
  const { 
    isHardMode, 
    toggleHardMode, 
    notificationInterval, 
    setNotificationInterval,
    customRoasts,
    setCustomRoasts
  } = useStore()
  
  const [newRoast, setNewRoast] = useState('')

  const handleAddRoast = (e: React.FormEvent) => {
    e.preventDefault()
    if (newRoast.trim()) {
      setCustomRoasts([...customRoasts, newRoast.trim()])
      setNewRoast('')
    }
  }

  const handleDeleteRoast = (index: number) => {
    setCustomRoasts(customRoasts.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="space-y-6">
        {/* Hard Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <div>
            <h3 className="font-semibold">Hard Mode</h3>
            <p className="text-sm text-gray-600">Lock your phone until tasks are completed</p>
          </div>
          <button
            onClick={toggleHardMode}
            className={`px-4 py-2 rounded-lg ${
              isHardMode 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isHardMode ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Notification Interval */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Notification Interval</h3>
          <select
            value={notificationInterval}
            onChange={(e) => setNotificationInterval(Number(e.target.value))}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={20}>20 minutes</option>
            <option value={30}>30 minutes</option>
          </select>
        </div>

        {/* Custom Roasts */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-4">Custom Roast Messages</h3>
          
          <form onSubmit={handleAddRoast} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newRoast}
                onChange={(e) => setNewRoast(e.target.value)}
                placeholder="Add a new roast message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </form>

          <div className="space-y-2">
            {customRoasts.map((roast, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="flex-1">{roast}</span>
                <button
                  onClick={() => handleDeleteRoast(index)}
                  className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 