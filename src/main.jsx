import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/global.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/register.jsx'
import UserPage from './pages/user.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'
import { AuthWrapper } from './component/context/authContext.jsx'
import QuizPage from './pages/QuizPage/QuizPage.jsx'
import QuestionListPage from './pages/QuestionListPage/QuestionListPage.jsx'
import LessonList from './pages/LessonList/LessonList.jsx'
import LessonDetail from './pages/LessonDetail/LessonDetail.jsx'
import KnowledgePage from './pages/KnowledgePage/KnowledgePage.jsx'
import KnowledgeDetailPage from './pages/KnowledgeDetailPage/KnowledgeDetailPage.jsx'
import ExtendPage from './pages/ExtendPage/ExtendPage.jsx'
import WelcomePage from './pages/WelcomePage/WelcomePage.jsx'
import ExtendDetailPage from './pages/ExtendDetailPage/ExtendDetailPage.jsx'


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
        element: <QuestionListPage />
      },
      {
        path: 'quiz/:lessonId',
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

      {
        path: "knowledge",
        element: <KnowledgePage />
      },
   {
        path: 'knowledge/:id',   // ✅ dynamic route
        element: <KnowledgeDetailPage />
      },
      {
        path: "extend",
        element: <ExtendPage />
      },
         {
        path: 'extend/:id',   // ✅ dynamic route
        element: <ExtendDetailPage />
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
  {
    path: 'welcome',
    element: <WelcomePage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>,
)
