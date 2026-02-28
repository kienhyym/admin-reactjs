import { Outlet } from "react-router-dom"
import Header from "./component/layout/header"
import axios from "./util/axios.custiomzie"
import { useContext, useEffect } from "react"
import { AuthContext } from "./component/context/authContext"


function App() {
  const { setAtuh, loading, setLoading } = useContext(AuthContext)
  useEffect(() => {
    setLoading(true);
    const festAccount = async () => {
      const res = await axios.get(`/v1/api/account`)
      console.log('res:', res);
      if (res && res.message) {
        setAtuh({
          isAuthenticated: true,
          user: {
            name: res.email,
            email: res.name
          },
        })
        setLoading(false);
      }
    }
    festAccount()
  }, [])
  return (
    <div>
      {loading ? <div>Loading...</div> :
        <>
          <Header />
          <Outlet />
        </>}
    </div>

  )
}

export default App
