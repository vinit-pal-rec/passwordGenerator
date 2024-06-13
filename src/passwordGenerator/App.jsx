import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [symbolAllow, setSymbolAllow] = useState(false)
  const [password, setPassword] = useState("")
  //useRef hook
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    if (numberAllow) str += '12334567890'
    if (symbolAllow) str += '!@#$%^&'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllow, symbolAllow, setPassword]
  )
  const copyPassword = useCallback(() => {
    passwordRef.current.select()       // to show in input bos delected text
    passwordRef.current.setSelectionRange(0,50)
    // document.execCommand('copy')
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {
    generatePassword()
  }, [length, numberAllow, symbolAllow, generatePassword])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md
       rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600'>
        <h1 className=' text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-5'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPassword}
          className='outline-none bg-blue-700 text-white
                   px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={(50)}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllow}
              id="numberInput"
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label >Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={symbolAllow}
              id="symbolInput"
              onChange={() => {
                setSymbolAllow(!symbolAllow);
              }}
            />
            <label >Symbol</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App