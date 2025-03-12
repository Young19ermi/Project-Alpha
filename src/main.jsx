import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Configurator from './ShowRoom/home.jsx';
import State from './ShowRoom/home.jsx';
import Animations from './ShowRoom/createroom.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <State/> */}
    <Animations/>

  </StrictMode>,
)
