import React from "react"
import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  let [length,setLength]=useState(8)
  let [numberAllowed,setNumberAllowed]=useState(false);
  let [charAllowed,setCharAllowed]=useState(false);
  let [password,setPassword]=useState("");
  
  //useref hook
  const passwordRef=useRef(null);

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed)
      str+="0123456789"
    if(charAllowed)
      str+="!@#$%^&*()_+=><?"

    for(let i=1;i<=length;i++)
    {
      let char=Math.floor(Math.random() * str.length +1);
      pass+=str.charAt(char);
    }

    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  
  return (
    
    <div className="w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-6 my-12 text-orange-500 bg-gray-900">
    <h1 className="text-3xl font-bold text-white text-center mb-6">Password Generator</h1>
  
    <div className="flex items-center shadow-inner rounded-lg overflow-hidden bg-gray-800 mb-4">
      <input
        type="text"
        value={password}
        className="outline-none w-full bg-transparent text-white py-2 px-4 placeholder-gray-400"
        placeholder="Generated password"
        readOnly
        ref={passwordRef}
      />
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 transition duration-200"
        onClick={copyPasswordToClipBoard}
        
      >
        Copy
      </button>
    </div>
    <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-xl shadow-md text-white space-y-4">
  <div className="flex flex-col space-y-2">
    <label className="font-medium text-orange-400">Length: {length}</label>
    <input
      type="range"
      min={6}
      max={100}
      value={length}
      className="cursor-pointer accent-orange-500"
      onChange={(e) => setLength(e.target.value)}
    />
  </div>

  <div className="flex items-center space-x-3">
    <input
      type="checkbox"
      id="numbers"
      defaultChecked={numberAllowed}
      onChange={() => setNumberAllowed((prev) => !prev)}
      className="accent-orange-500 w-4 h-4"
    />
    <label htmlFor="numbers" className="text-sm">Include Numbers</label>
  </div>

  <div className="flex items-center space-x-3">
    <input
      type="checkbox"
      id="characters"
      defaultChecked={charAllowed}
      onChange={() => setCharAllowed((prev) => !prev)}
      className="accent-orange-500 w-4 h-4"
    />
    <label htmlFor="characters" className="text-sm">Include Special Characters</label>
  </div>
</div>

  </div>
  
    
   
  )
}

export default App
