import { Suspense, lazy } from 'react';
import useActiveSection from './hooks/useActiveSection.js';
import useCinematicScroll from './hooks/useCinematicScroll.js';

const PortfolioScene = lazy(() => import('./components/scene/PortfolioScene.jsx'));

const navItems = [
  { href: '#about', id: 'about', label: 'About' },
  { href: '#skills', id: 'skills', label: 'Skills' },
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

const skills = [
  { name: 'HTML', type: 'Structure', level: 'Core' },
  { name: 'CSS', type: 'Interface', level: 'Strong' },
  { name: 'JavaScript', type: 'Logic', level: 'Core' },
  { name: 'React', type: 'Frontend', level: 'Growing' },
  { name: 'Three.js', type: '3D Web', level: 'Creative' },
  { name: 'GitHub', type: 'Workflow', level: 'Daily' },
  { name: 'SQL', type: 'Data', level: 'Practical' },
  { name: 'Python', type: 'Tools', level: 'Practical' },
];

const projects = [
  {
    name: 'AI Video Clipper',
    description:
      'AI-powered video repurposing pipeline that turns uploads and video URLs into captioned 9:16 social clips.',
    stack: 'Python, Flask, FFmpeg, Groq',
    signal: 'AI media pipeline',
    github: 'https://github.com/ibrahim0795/AI-video-clipper',
  },
  {
    name: 'CareerOrbit Internship Tracker',
    description:
      'An immersive 3D internship and junior-job tracker with pipelines, analytics, interview prep and CV management.',
    stack: 'Next.js, TypeScript, PostgreSQL',
    signal: 'Full-stack career platform',
    github: 'https://github.com/ibrahim0795/full-stack-internship-application-tracker',
    demo: 'https://full-stack-internship-application-t.vercel.app',
  },
  {
    name: 'Gameboy in C++ using SFML',
    description:
      'A C++ SFML Gameboy-style package that brings multiple games together into one creative project.',
    stack: 'C++, SFML',
    signal: 'Game development',
    github: 'https://github.com/ibrahim0795/Gameboy-in-Cpp-using-SFML',
  },
  {
    name: 'Candy Crush in OpenGL',
    description:
      'A feature-rich match-3 game with cascades, scoring, levels, hints, pause controls and persistent save/load state.',
    stack: 'C++, OpenGL',
    signal: 'Graphics programming',
    github: 'https://github.com/ibrahim0795/Simple-Candy-Crush-game-using-Cpp-in-openGL',
  },
];

function SceneLoader() {
  return (
    <div className="scene-loader" aria-hidden="true">
      <span />
    </div>
  );
}

function App() {
  useCinematicScroll();
  const activeSection = useActiveSection(['hero', ...navItems.map((item) => item.id)]);

  return (
    <main>
      <a className="skip-link" href="#about">
        Skip to profile content
      </a>

      <Suspense fallback={<SceneLoader />}>
        <PortfolioScene />
      </Suspense>

      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand-mark" href="#hero" aria-label="Go to top">
          I
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              href={item.href}
              key={item.id}
              className={activeSection === item.id ? 'is-active' : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="hero-section section" id="hero" aria-labelledby="page-title">
        <div className="section-content hero-grid">
          <div className="reveal">
            <p className="eyebrow">Immersive 3D Portfolio</p>
            <h1 id="page-title">Ibrahim builds futuristic web experiences.</h1>
            <p className="hero-copy">
              A clean personal profile designed for recruiters, internships,
              and creative web opportunities — now shaped as a cinematic scroll
              journey through the profile.
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

          <div className="identity-card reveal" aria-label="Profile summary">
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
          <div className="reveal">
            <p className="eyebrow">About</p>
            <h2 id="about-title">Clear, creative, and practical.</h2>
          </div>
          <div className="glass-panel reveal">
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
          <div className="section-heading reveal">
            <p className="eyebrow">Skills</p>
            <h2 id="skills-title">Tools I use to build the experience.</h2>
            <p>
              Each skill is presented like a small signal module: readable first,
              futuristic second.
            </p>
          </div>
          <div className="skill-grid">
            {skills.map((skill, index) => (
              <article
                className="skill-card reveal"
                key={skill.name}
                style={{ '--delay': `${index * 55}ms` }}
              >
                <span className="skill-orb" aria-hidden="true" />
                <span className="skill-name">{skill.name}</span>
                <span className="skill-meta">{skill.type}</span>
                <span className="skill-level">{skill.level}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="section-content">
          <div className="section-heading reveal">
            <p className="eyebrow">Projects</p>
            <h2 id="projects-title">Selected work in hologram mode.</h2>
            <p>
              Project panels now feel like floating digital displays, while the
              real information stays easy to scan.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className="project-card reveal"
                key={project.name}
                style={{ '--delay': `${index * 90}ms` }}
              >
                <div className="project-visual" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="card-label">{project.stack}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p className="project-signal">{project.signal}</p>
                <div className="project-actions">
                  <a href={project.github}>GitHub</a>
                  {project.demo ? (
                    <a href={project.demo}>Live Demo</a>
                  ) : (
                    <a href={project.github}>Details</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-section" id="contact" aria-labelledby="contact-title">
        <div className="section-content contact-panel reveal">
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
            <a className="button" href="https://www.linkedin.com/in/ibrahim-anwar-0aa201344/">
              LinkedIn
            </a>
            <a className="button" href="mailto:iamibrahimanwar1@gmail.com">
              Email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
