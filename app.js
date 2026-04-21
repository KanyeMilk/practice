const starterCandidates = [
  {
    id: 1,
    name: "Maya Chen",
    role: "Product Designer",
    location: "Los Angeles, CA",
    skills: "Figma, systems, research",
    resumeName: "maya-chen-resume.pdf",
  },
  {
    id: 2,
    name: "Andre Brooks",
    role: "Frontend Engineer",
    location: "Austin, TX",
    skills: "React, TypeScript, accessibility",
    resumeName: "andre-brooks-resume.pdf",
  },
  {
    id: 3,
    name: "Sam Rivera",
    role: "Growth Marketer",
    location: "Remote",
    skills: "Lifecycle, analytics, paid social",
    resumeName: "sam-rivera-resume.pdf",
  },
];

function loadCandidates() {
  try {
    const savedCandidates = localStorage.getItem("effortlessCandidates");
    return savedCandidates ? JSON.parse(savedCandidates) : starterCandidates;
  } catch {
    return starterCandidates;
  }
}

function App() {
  const candidates = loadCandidates().slice(0, 3);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="index.html" aria-label="Effortless home">
          Effortless
        </a>
        <nav className="header-actions" aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="#talent">Talent</a>
          <a className="nav-pill" href="apply.html">Enter Pool</a>
        </nav>
      </header>

      <main>
        <section className="home-hero">
          <p className="kicker">Recruiting reversed</p>
          <h1>Stop applying. Start being found.</h1>
          <p>
            Effortless is a calmer hiring layer where candidates upload one
            profile, then recruiters browse the pool and make the first move.
          </p>
          <div className="hero-actions">
            <a href="apply.html">Enter the pool</a>
            <a href="#talent">View talent</a>
          </div>
        </section>

        <section className="quiet-statement">
          <span>For candidates</span>
          <p>One clean profile instead of hundreds of cold applications.</p>
          <span>For recruiters</span>
          <p>A focused database of people who already want to be discovered.</p>
        </section>

        <section className="how-section" id="how">
          <article>
            <span>01</span>
            <h2>Upload once.</h2>
            <p>Add your role, location, skills, and resume on the application tab.</p>
          </article>
          <article>
            <span>02</span>
            <h2>Join the pool.</h2>
            <p>Your profile appears in the candidate database for recruiter review.</p>
          </article>
          <article>
            <span>03</span>
            <h2>Get selected.</h2>
            <p>Recruiters shortlist people intentionally before starting outreach.</p>
          </article>
        </section>

        <section className="talent-section" id="talent">
          <div className="section-heading">
            <p className="kicker">Recruiter preview</p>
            <h2>Candidate pool</h2>
          </div>
          <div className="candidate-grid">
            {candidates.map((candidate) => (
              <article className="candidate-card" key={candidate.id}>
                <div>
                  <p>{candidate.role}</p>
                  <h3>{candidate.name}</h3>
                  <span>{candidate.location}</span>
                </div>
                <p>{candidate.skills}</p>
                <small>{candidate.resumeName}</small>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <h2>The application era is overdue for a redesign.</h2>
        <p>
          Static concept demo. A production version would connect this flow to
          secure resume storage, recruiter accounts, and a real database.
        </p>
      </footer>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
