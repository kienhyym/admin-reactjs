import { Outlet, useNavigate } from "react-router-dom"
import Header from "./component/layout/header"
import axios from "./util/axios.custiomzie"
import { useContext, useEffect } from "react"
import { AuthContext } from "./component/context/authContext"
import LoginPage from "./pages/Login/LoginPage"
import WelcomePage from "./pages/WelcomePage/WelcomePage"
import FullPageLoading from "./component/loadingPage/FullPageLoading"


function App() {
  const { auth, setAtuh, setLoading, isFullPageLoading, setFullPageLoading } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const festAccount = async () => {
      setFullPageLoading(true)
      const res = await axios.get(`/v1/api/account`)
      if (res && res?.email) {
        setAtuh({
          isAuthenticated: true,
          user: {
            name: res.email,
            email: res.name
          },
        })
        setLoading(false);
      }
      else {
        console.log("res account error:");
        setLoading(false);
        navigate("/login");
      }
      setFullPageLoading(false)

    }
    festAccount()
  }, [])
  
  if (auth.loading) {
    return <WelcomePage />
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
      {isFullPageLoading && <FullPageLoading title={""} style={{}} />}
    </div>
  )
}

export default App
