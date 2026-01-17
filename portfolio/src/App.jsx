import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Project from './components/Project.jsx'
import Experiences from './components/Experiences.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

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

      <section id="experiences" className="scroll-mt-24">
        <Experiences />
      </section>

      <section id="contact me" className="scroll-mt-24">
        <Contact />
      </section>

      <section id="footer" className="scroll-mt-24">
        <Footer />
      </section>
    </>
  )
}

export default App
