import { Outlet, useNavigate } from "react-router-dom"
import Header from "./component/layout/header"
import axios from "./util/axios.custiomzie"
import { useContext, useEffect } from "react"
import { AuthContext } from "./component/context/authContext"
import { use } from "react"
import { getAccountApi, homeApi } from "./util/api"
import LoginPage from "./pages/Login/LoginPage"
import WelcomePage from "./pages/WelcomePage/WelcomePage"


function App() {
  const { auth, setAtuh, setLoading } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const festAccount = async () => {
      const res = await axios.get(`/v1/api/account`)
      console.log('res:', res);
      if (res && res?.email) {
        console.log("res account:");
        setAtuh({
          isAuthenticated: true,
          user: {
            name: res.email,
            email: res.name
          },
        })
        setLoading(false);
      }
      else{
        console.log("res account error:");
        setLoading(false);
        navigate("/login");
      }
    }
    festAccount()
  }, [])

  if(auth.loading) {
    return <WelcomePage/>
  }
  return (
  <div className="app-layout">

      {!auth.isAuthenticated ? (
        <LoginPage />
      ) : (
        <>
          <Header />

          <div className="main-content">
            <Outlet />
          </div>
        </>
      )}

    </div>
  )
}

export default App
