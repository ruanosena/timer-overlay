import React, { useCallback } from 'react'

export default function InputField({ label, value, onChange, placeholder }) {
  const handleInputChange = useCallback(
    (e) => {
      const inputValue = e.target?.value
      if (/^\d+$/.test(inputValue)) onChange(e)
    },
    [onChange]
  )

  return (
    <div className="text-3xl">
      <label className="text-stone-300">{label}:</label>
      <input
        className="w-20 bg-transparent text-blue-400"
        type="number"
        name=""
        id=""
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  )
}
