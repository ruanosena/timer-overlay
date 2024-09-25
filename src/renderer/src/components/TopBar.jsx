import React, { useCallback } from 'react'

export default function TopBar() {
  const handleClose = useCallback(() => {
    window.electron.ipcRenderer.send('close-window')
  }, [])

  const handleMinimize = useCallback(() => {
    window.electron.ipcRenderer.send('minimize-window')
  }, [])

  return (
    <div>
      <div
        className="rounded-t-xl bg-blue-400 w-screen h-5"
        style={{ WebkitAppRegion: 'drag' }}
      ></div>
      <div className="bg-blue-400 w-screen h-3"></div>
      <div
        id="control-buttons"
        className="absolute text-stone-200 top-1 right-0 pe-2 inline-flex gap-x-1"
      >
        <button id="minimize" className="p-1 text-xl font-bold" onClick={handleMinimize}>
          &minus;
        </button>
        <button id="close" className="p-1 text-xl font-bold" onClick={handleClose}>
          &#x2715;
        </button>
      </div>
    </div>
  )
}
