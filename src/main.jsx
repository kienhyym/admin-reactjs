import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/global.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/register.jsx'
import UserPage from './pages/user.jsx'
import HomePage from './pages/home.jsx'
import LoginPage from './pages/login.jsx'
import { AuthWrapper } from './component/context/authContext.jsx'
import QuizPage from './pages/QuizPage/QuizPage.jsx'
import LessonList from './pages/LessonList/LessonList.jsx'
import LessonDetail from './pages/LessonDetail/LessonDetail.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'user',
        element: <UserPage />
      },
      {
        path: 'quiz',
        element: <QuizPage />
      },
      {
        path: 'lessons',
        element: <LessonList />
      },
      {
        path: 'lessons/:id',   // ✅ dynamic route
        element: <LessonDetail />
      },
    ]
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  {
    path: 'login',
    element: <LoginPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>,
)
