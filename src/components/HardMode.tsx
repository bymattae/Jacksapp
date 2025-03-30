import { useStore } from '@/lib/store'

export default function HardMode() {
  const { isHardMode, toggleHardMode, tasks } = useStore()
  const hasCompletedTask = tasks.some(task => task.completed)

  if (!isHardMode) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Phone Locked</h2>
        <p className="text-gray-600 mb-6">
          {hasCompletedTask
            ? "Great job! You've earned your freedom back."
            : "Finish a task to get your life back."}
        </p>
        {hasCompletedTask ? (
          <button
            onClick={toggleHardMode}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Unlock Phone
          </button>
        ) : (
          <p className="text-sm text-gray-500">
            Complete at least one task to unlock
          </p>
        )}
      </div>
    </div>
  )
} 