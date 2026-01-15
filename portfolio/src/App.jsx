import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Project from './components/Project.jsx'

function App() {
  return (
    <>
      <Header />

      <section id="home" className="scroll-mt-24">
        <Hero />
      </section>

      <section id="about" className="scroll-mt-24">
        <About />
      </section>

      <section id="projects" className="scroll-mt-24">
        <Project />
      </section>
    </>
  )
}

export default App
