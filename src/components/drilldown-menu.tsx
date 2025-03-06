'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const menuData = [
  {
    id: '1',
    title: 'Cài đặt',
    subMenu: [
      { id: '11', title: 'Wi-Fi' },
      { id: '12', title: 'Bluetooth' }
    ]
  },
  {
    id: '2',
    title: 'Tài khoản',
    subMenu: [
      { id: '21', title: 'Thông tin cá nhân' },
      { id: '22', title: 'Bảo mật' }
    ]
  }
]

export default function DrilldownMenu() {
  const [history, setHistory] = useState([{ title: 'Menu Chính', items: menuData }])

  const currentMenu = history[history.length - 1]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNext = (submenu: any, title: any) => {
    setHistory([...history, { title, items: submenu }])
  }

  const handleBack = () => {
    setHistory(history.slice(0, -1))
  }

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMenu.title}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4"
        >
          {history.length > 1 && (
            <button onClick={handleBack} className="flex items-center mb-2 text-blue-500 hover:text-blue-700">
              <ChevronLeft size={20} />
              <span className="ml-1">Quay lại</span>
            </button>
          )}
          <ul>
            {currentMenu.items.map((item) => (
              <li key={item.id} className="border-b last:border-none">
                <button
                  className="flex justify-between items-center w-full p-3 text-left hover:bg-gray-100"
                  onClick={() => item.subMenu && handleNext(item.subMenu, item.title)}
                >
                  {item.title}
                  {item.subMenu && <ChevronRight size={20} />}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
