import React from 'react'

const WindowControls: React.FC = () => {
  const handleMinimize = () => {
    window.electron?.windowMinimize()
  }

  const handleMaximize = () => {
    window.electron?.windowMaximize()
  }

  const handleClose = () => {
    window.electron?.windowClose()
  }

  return (
    <div className="window-controls flex items-center">
      <button 
        onClick={handleMinimize}
        className="window-control minimize hover:bg-gray-200 p-2 mx-1 rounded"
      >
        ─
      </button>
      <button 
        onClick={handleMaximize}
        className="window-control maximize hover:bg-gray-200 p-2 mx-1 rounded"
      >
        □
      </button>
      <button 
        onClick={handleClose}
        className="window-control close hover:bg-red-500 hover:text-white p-2 mx-1 rounded"
      >
        ✕
      </button>
    </div>
  )
}

export default WindowControls