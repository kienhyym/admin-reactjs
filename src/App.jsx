import { Outlet } from "react-router-dom"
import Header from "./component/layout/header"
import axios from "./util/axios.custiomzie"
import { useEffect } from "react"


function App() {
  useEffect(() => { 
  const festHelloWorld = async () => {
    const res = await axios.get(`/v1/api`)
    console.log(res)
  }
  festHelloWorld()
}, [])
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
