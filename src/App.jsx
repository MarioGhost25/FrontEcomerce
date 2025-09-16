
import { ToastContainer } from 'react-toastify'
import './App.css'
import { Nav } from './components/nav'

function App() {
 

  return (
    <>
       <ToastContainer position='top-right' autoClose={3000} />
      <Nav />
    </>
  )
}

export default App
