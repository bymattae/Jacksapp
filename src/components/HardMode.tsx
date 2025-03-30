import { useStore } from '@/lib/store'

export default function HardMode() {
  const { isHardMode, toggleHardMode, tasks } = useStore()
  const hasCompletedTask = tasks.some(task => task.completed)

  if (!isHardMode) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              {hasCompletedTask
                ? "Great job! You've completed a task!"
                : "You have tasks to complete!"}
            </p>
            <div className="mt-2">
              <button
                onClick={toggleHardMode}
                className="text-sm font-medium text-yellow-800 hover:text-yellow-900"
              >
                {hasCompletedTask ? "Dismiss" : "I'll do it later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 