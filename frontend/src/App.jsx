import './App.css'
import Dashboard from './components/Dashboard'
import AdjustButton from './components/button'
import InputForm from './components/InputForm'
import { useState } from 'react'

function App() {
  const [reloadDash, setReloadDash] = useState(false);

  const handleFormSubmit = () => {
    setReloadDash(prevState => !prevState)
  };

  return (
    <>
      <h1 className="title">
        C4C: Projects
      </h1>

      <InputForm onFormSubmit={handleFormSubmit} />

      <Dashboard key={reloadDash ? 'reload' : 'normal'} />
      
    </>
  )
}

export default App;
