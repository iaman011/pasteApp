import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Pastes from './components/pastes'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter(
  // Navbar is part of all path as we want to display it on every applied tab/place 
  [
    {
      path: "/",
      element:
        <div>
          <Navbar />
          <Home />
        </div>

    },
    {
      path: "/pastes",
      element:
        <div>
          <Navbar/>
          <Pastes />
        </div>

    },
    {
      path: "/pastes/:id",
      element:
        <div>
          <Navbar />
          <ViewPaste />
        </div>

    }

  ]
);


function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App

