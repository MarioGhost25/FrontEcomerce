
import { ToastContainer } from 'react-toastify'
import './App.css'
import { User } from './components/user/user'

function App() {
 

  return (
    <>
       <ToastContainer position='top-right' autoClose={3000} />
      <User />
    </>
  )
}

export default App
