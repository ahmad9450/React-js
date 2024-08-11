import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

let name = "ahmad raza"

const element= React.createElement(
    "a",
    {href:"https://google.com",target:"main", style:{textDecoration : "none" }},
    "Visit Google  ",
    name
  )


ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
)
