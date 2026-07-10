const roadmap = [
  'Readable profile content first',
  'Lightweight procedural 3D scene',
  'Scroll-controlled cinematic camera',
  'Holographic projects and skills',
  'Fast, accessible, recruiter-friendly polish',
];

function App() {
  return (
    <main className="app-shell">
      <section className="hero-section" aria-labelledby="page-title">
        <p className="eyebrow">Immersive 3D Portfolio</p>
        <h1 id="page-title">Futuristic profile experience</h1>
        <p className="hero-copy">
          A cinematic personal portfolio built step by step: clean content,
          smooth 3D atmosphere, recruiter-friendly sections, and polished
          GitHub workflow.
        </p>
        <div className="hero-actions" aria-label="Portfolio actions">
          <a href="#roadmap" className="button button-primary">
            View build plan
          </a>
          <a href="https://github.com/ibrahim0795" className="button">
            GitHub
          </a>
        </div>
      </section>

      <section className="glass-panel" id="roadmap" aria-labelledby="roadmap-title">
        <p className="eyebrow">Step 1</p>
        <h2 id="roadmap-title">Foundation is ready for the 3D journey</h2>
        <ul className="roadmap-list">
          {roadmap.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;

