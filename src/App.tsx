import React, { useState } from 'react';
import './App.css';

function App() {
  // 0 for head or tail mode, 1 for options mode
  const [mode, setMode] = useState<null | number>(null)

  // Head or tails mode
  const [state, setState] = useState<null | number>(null)

  // Option mode
  const [max, setMax] = useState<number>(0)
  const [random, setRandom] = useState<null | number>(null)
  const [newValue, setNewValue] = useState('')
  const [values, setValues] = useState<Array<String>>([])

  let incrementMax = () => setMax(!max ? 1 : max + 1)
  let addNewValue = (value: string) => setValues([...values, value])

  let newValueKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13 && e.currentTarget.value.trim() !== '') {
      addNewValue(e.currentTarget.value)
      setNewValue('')
      incrementMax()
    }
  }

  let getRand = () => {
    if (values.length > 0) {
      setRandom(null)
      setTimeout(() => {
        setRandom(rand(max))
      }, 100);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          {mode === null &&
            <div>
              <div className="button" onClick={() => setMode(0)}>Head or Tails</div>
              <div className="button" onClick={() => setMode(1)}>Random option</div>
            </div>
          }
          {mode === 0 &&
            <div className="headortail">
              {state !== null && <div>{state === 0 ? "Head" : "Tails"}</div>}
              <div
                className="button"
                onClick={() => setState(Math.floor(Math.random() * 2))}>
                Click to get head or tails
              </div>
            </div>
          }
          {mode === 1 &&
            <div className="options">
              {values.map((v, i) => <p className={random === i ? 'active' : ''}>{v}</p>)}
              <input
                placeholder="Type a value and press enter"
                value={newValue}
                onChange={(e) => setNewValue(e.currentTarget.value)}
                onKeyPress={newValueKeyPressed} />
              <div
                className={`button ${values.length > 0 ? '' : 'disabled'}`}
                onClick={() => getRand()}>
                Get a random option
            </div>
            </div>
          }
          {mode !== null && <button onClick={() => {
            setMode(null)
            setState(null)
            setRandom(null)
            setNewValue('')
            setValues([])
          }}>Back to home</button>}
        </div>
      </header>
    </div>
  );
}

let rand = (max: number) => Math.floor(Math.random() * max)

export default App;
