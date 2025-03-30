import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: number
  lastInteracted: number
}

interface AppState {
  tasks: Task[]
  isHardMode: boolean
  notificationInterval: number
  customRoasts: string[]
  addTask: (title: string) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleHardMode: () => void
  setNotificationInterval: (minutes: number) => void
  setCustomRoasts: (roasts: string[]) => void
  updateLastInteracted: (taskId: string) => void
}

const defaultRoasts = [
  "Oh wow, another YouTube break? Groundbreaking.",
  "Your dreams are slipping away, but go ahead, keep scrolling.",
  "You're not stuck, you're just lazy.",
  "Imagine where you'd be if you actually tried.",
  "Pro tip: Thinking about doing it is not the same as doing it.",
  "This to-do list isn't gonna finish itself, champ.",
]

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [],
      isHardMode: false,
      notificationInterval: 10,
      customRoasts: defaultRoasts,
      
      addTask: (title) => set((state) => ({
        tasks: [...state.tasks, {
          id: crypto.randomUUID(),
          title,
          completed: false,
          createdAt: Date.now(),
          lastInteracted: Date.now()
        }]
      })),
      
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, ...updates } : task
        )
      })),
      
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),
      
      toggleHardMode: () => set((state) => ({
        isHardMode: !state.isHardMode
      })),
      
      setNotificationInterval: (minutes) => set(() => ({
        notificationInterval: minutes
      })),
      
      setCustomRoasts: (roasts) => set(() => ({
        customRoasts: roasts
      })),
      
      updateLastInteracted: (taskId) => set((state) => ({
        tasks: state.tasks.map(task =>
          task.id === taskId ? { ...task, lastInteracted: Date.now() } : task
        )
      }))
    }),
    {
      name: 'procrastination-tracker-storage'
    }
  )
) 