import {useState,useEffect} from "react"
import './App.css'
import {ThemeProvider} from "./Contexts/ThemeContext.js";
import ThemeBtn from "./Components/ThemeBtn.jsx";
import Card from "./Components/Card.jsx";
import VideoPlayer from "./Components/VideoPlayer.jsx"

function App() {
  const [themeMode,setThemeMode] = useState("light")
  function darkTheme(){
    setThemeMode("dark");
  }
  function lightTheme(){
    setThemeMode("light");
  }
  
  useEffect(()=>{
    document.querySelector("html").classList.remove("light","dark");
    document.querySelector("html").classList.add(themeMode)
  },[themeMode])

  return (
    <ThemeProvider value={{themeMode,darkTheme,lightTheme}}> 
    <VideoPlayer/>
    <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />            
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card/>           
          </div>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default App
