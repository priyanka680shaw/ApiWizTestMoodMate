import Home from './pages/Home'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function App() {


  return (
    <>
      {/* your app components */}
      <ToastContainer position="top-center" autoClose={1000} />
        <Home/>
    </>
  )
}

export default App
