import React, { useState } from 'react';
import './App.css';

function App() {
  const [max, setMax] = useState<number>(0)
  const [random, setRandom] = useState<null|number>(null)
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
    if(values.length > 0) {
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
      </header>
    </div>
  );
}

let rand = (max:number) => Math.floor(Math.random() * max)

export default App;
