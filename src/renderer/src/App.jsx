import { useEffect, useState } from 'react'
import TopBar from './components/TopBar'
import Timer from './components/Timer'

function App() {
  const [isOverlay, setIsOverlay] = useState(false)

  useEffect(() => {
    window.electron.ipcRenderer.on('overlay-mode', () => {
      setIsOverlay((prevState) => !prevState)
    })

    return () => window.electron.ipcRenderer.removeAllListeners('overlay-mode')
  }, [])

  return (
    <>
      <div className={!isOverlay ? 'visible' : 'invisible'}>
        <TopBar />
      </div>
      <div className={!isOverlay ? 'bg-black/40 p-2 rounded-b-xl' : 'bg-black/40 p-2 rounded-xl'}>
        <Timer isOverlay={isOverlay} />
      </div>
    </>
  )
}

export default App
