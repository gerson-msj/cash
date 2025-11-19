import Header from './components/Header'
import AppRoutes from './routes/AppRoutes'
import RouteInterceptor from './routes/RouteInterceptor'

function App() {

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <RouteInterceptor />
        <AppRoutes />
      </main>
      <footer></footer>
    </>
  )
}

export default App
