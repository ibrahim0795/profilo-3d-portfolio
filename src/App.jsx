import { Suspense, lazy } from 'react';

const PortfolioScene = lazy(() => import('./components/scene/PortfolioScene.jsx'));

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Three.js',
  'GitHub',
  'SQL',
  'Python',
];

const projects = [
  {
    name: 'NOVA 3D Showcase',
    description:
      'A cinematic scroll-controlled 3D product story for a futuristic wearable concept.',
    stack: 'React, Three.js, GSAP',
  },
  {
    name: 'Flex Marks Tracker',
    description:
      'A practical student-focused tracker for understanding marks, grades, and progress.',
    stack: 'JavaScript, Browser Extension',
  },
  {
    name: 'Portfolio System',
    description:
      'This immersive profile site, designed to present skills and projects with premium clarity.',
    stack: 'React, Vite, 3D Web',
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <PortfolioScene />
      </Suspense>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand-mark" href="#hero" aria-label="Go to top">
          H
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero-section section" id="hero" aria-labelledby="page-title">
        <div className="section-content hero-grid">
          <div>
            <p className="eyebrow">Immersive 3D Portfolio</p>
            <h1 id="page-title">Haris builds futuristic web experiences.</h1>
            <p className="hero-copy">
              A clean personal profile designed for recruiters, internships,
              and creative web opportunities — with cinematic 3D layers coming
              in the next steps.
            </p>
            <div className="hero-actions" aria-label="Portfolio actions">
              <a href="#projects" className="button button-primary">
                View my work
              </a>
              <a href="#contact" className="button">
                Contact me
              </a>
            </div>
          </div>

          <div className="identity-card" aria-label="Profile summary">
            <span className="status-dot" />
            <p className="card-label">Profile Signal</p>
            <h2>Frontend Developer</h2>
            <p>
              Focused on polished interfaces, practical projects, and immersive
              web experiences that still stay readable.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="section-content two-column">
          <div>
            <p className="eyebrow">About</p>
            <h2 id="about-title">Clear, creative, and practical.</h2>
          </div>
          <div className="glass-panel">
            <p>
              I am building my path as a web developer by combining strong
              fundamentals with creative UI ideas. This portfolio is designed to
              show both sides: the professional information recruiters need and
              the memorable visual experience that makes the profile stand out.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="skills" aria-labelledby="skills-title">
        <div className="section-content">
          <p className="eyebrow">Skills</p>
          <h2 id="skills-title">Tools I use to build the experience.</h2>
          <div className="skill-grid">
            {skills.map((skill) => (
              <article className="skill-card" key={skill}>
                <span>{skill}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="section-content">
          <p className="eyebrow">Projects</p>
          <h2 id="projects-title">Selected work, ready for hologram mode.</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <p className="card-label">{project.stack}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-actions">
                  <a href="https://github.com/ibrahim0795">GitHub</a>
                  <a href="#contact">Details</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-section" id="contact" aria-labelledby="contact-title">
        <div className="section-content contact-panel">
          <p className="eyebrow">Final signal</p>
          <h2 id="contact-title">Let’s build something meaningful.</h2>
          <p>
            Available for internships, collaborations, and creative web
            projects. The next steps will turn this page into a true cinematic
            3D journey.
          </p>
          <div className="hero-actions" aria-label="Contact links">
            <a className="button button-primary" href="https://github.com/ibrahim0795">
              GitHub
            </a>
            <a className="button" href="https://www.linkedin.com/">
              LinkedIn
            </a>
            <a className="button" href="mailto:hello@example.com">
              Email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

