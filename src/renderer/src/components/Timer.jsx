import React, { useEffect, useRef, useState } from 'react'
import InputField from './InputField'
import alarm from '../assets/sounds/alarm-sound.mp3'

export default function Timer({ isOverlay }) {
  const [estaEditando, setEstaEditando] = useState(false)
  const [minutos, setMinutos] = useState(1)
  const [segundos, setSegundos] = useState(0)
  const [horas, setHoras] = useState(0)
  const [estaAtivo, setEstaAtivo] = useState(false)
  const audio = useRef(new Audio(alarm))

  useEffect(() => {
    let intervaloId

    if (estaAtivo) {
      intervaloId = setInterval(() => {
        if (segundos > 0) {
          setSegundos((segundos) => segundos - 1)
        } else {
          if (minutos === 0 && horas === 0) {
            audio.current.play()

            clearInterval(intervaloId)
            setEstaAtivo(false)
          } else {
            if (minutos === 0) {
              setHoras((horas) => horas - 1)
              setMinutos(59)
            } else {
              setMinutos((minutos) => minutos - 1)
            }
            setSegundos(59)
          }
        }
      }, 1000)
    } else {
      clearInterval(intervaloId)
    }
    return () => clearInterval(intervaloId)
  }, [estaAtivo, horas, minutos, segundos])

  return (
    <>
      {estaEditando ? (
        // Time setup
        <div className="flex justify-center">
          <div>
            <InputField
              label="Horas"
              value={horas}
              onChange={(e) => setHoras(parseInt(e.target.value))}
            />
            <InputField
              label="Minutos"
              value={minutos}
              onChange={(e) => setMinutos(parseInt(e.target.value))}
            />
            <InputField
              label="Segundos"
              value={segundos}
              onChange={(e) => setSegundos(parseInt(e.target.value))}
            />
            <button
              className="bg-blue-500 text-stone-200 px-20 py-1 rounded-xl text-xl mt-1 ml-1"
              onClick={() => setEstaEditando(false)}
            >
              &#10004;
            </button>
          </div>
        </div>
      ) : (
        // Timer
        <div>
          <div className="flex justify-center">
            <h1 className="text-green-500 text-6xl">
              {`${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`}
            </h1>
          </div>

          <div
            id="timer-buttons"
            className="text-stone-500 flex justify-center bg-black/10 rounded-xl"
          >
            {estaAtivo ? (
              <>
                <button
                  className="text-5xl text-yellow-500 m-2"
                  onClick={() => setEstaAtivo(false)}
                >
                  ||
                </button>
                <button
                  className="text-5xl text-red-500 m-2"
                  onClick={() => {
                    setEstaAtivo(false)
                    setHoras(0)
                    setMinutos(1)
                    setSegundos(0)
                  }}
                >
                  &#9632;
                </button>
              </>
            ) : (
              <>
                <button className="text-5xl text-green-500 m-2" onClick={() => setEstaAtivo(true)}>
                  &#9658;
                </button>
                <button
                  className="text-4xl text-yellow-500 m-2"
                  onClick={() => setEstaEditando(true)}
                >
                  &#9998;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
