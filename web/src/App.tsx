import Header from './components/Header'
import AppRoutes from './routes/AppRoutes'
import './styles/App.css'

function App() {

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <AppRoutes />
      </main>
      <footer></footer>
    </>
  )
}

export default App
