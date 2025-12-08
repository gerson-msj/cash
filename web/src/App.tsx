import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Espera from './components/Espera'
import Header from './components/Header'
import type { ISagaContext } from './domain/sagaContext'
import AppRoutes from './routes/AppRoutes'
import { sagaMiddleware } from './store'
import api from './store/api'
import { authActions } from './store/auth'

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  sagaMiddleware.setContext({
    ctx: {
      navigate,
      api
    } satisfies ISagaContext
  })

  useEffect(() => {
    dispatch(authActions.verificar(location.pathname))
  }, [location.pathname, dispatch])

  /**
   * Renderizado dentro do div#root
   */
  return (
    <>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Espera />
    </>
  )
}

export default App
