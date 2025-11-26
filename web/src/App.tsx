import Espera from './components/Espera'
import Header from './components/Header'
import AppRoutes from './routes/AppRoutes'

function App() {

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
