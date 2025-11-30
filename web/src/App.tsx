import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Espera from './components/Espera'
import Header from './components/Header'
import type { ISagaContext } from './domain/sagaContext'
import AppRoutes from './routes/AppRoutes'
import { sagaMiddleware } from './store'
import api from './store/api'

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
    // Chamar auth para verificar se existe token, via api, e resgatar o auth.
  }, [location.pathname, dispatch])

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <AppRoutes />
        <Espera />
      </main>
      <footer></footer>
    </>
  )
}

export default App
