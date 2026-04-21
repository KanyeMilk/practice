const { useEffect, useState } = React;

const starterCandidates = [
  {
    id: 1,
    name: "Maya Chen",
    role: "Product Designer",
    location: "Los Angeles, CA",
    skills: "Figma, systems, research",
    resumeName: "maya-chen-resume.pdf",
    spotlight: "Built hiring flows and conversion-focused product surfaces.",
  },
  {
    id: 2,
    name: "Andre Brooks",
    role: "Frontend Engineer",
    location: "Austin, TX",
    skills: "React, TypeScript, accessibility",
    resumeName: "andre-brooks-resume.pdf",
    spotlight: "Ships polished interfaces with strong product instincts.",
  },
  {
    id: 3,
    name: "Sam Rivera",
    role: "Growth Marketer",
    location: "Remote",
    skills: "Lifecycle, analytics, paid social",
    resumeName: "sam-rivera-resume.pdf",
    spotlight: "Turns candidate and customer journeys into measurable growth.",
  },
];

const navGroups = [
  {
    title: "Candidates",
    links: ["Upload resume", "Profile review", "Talent pool"],
  },
  {
    title: "Recruiters",
    links: ["Browse candidates", "Shortlists", "Direct outreach"],
  },
  {
    title: "Platform",
    links: ["How it works", "Privacy", "Database access"],
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [candidates, setCandidates] = useState(() => {
    try {
      const savedCandidates = localStorage.getItem("effortlessCandidates");
      return savedCandidates ? JSON.parse(savedCandidates) : starterCandidates;
    } catch {
      return starterCandidates;
    }
  });
  const [form, setForm] = useState({
    name: "",
    role: "",
    location: "",
    skills: "",
    spotlight: "",
    resumeName: "",
  });

  useEffect(() => {
    localStorage.setItem("effortlessCandidates", JSON.stringify(candidates));
  }, [candidates]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextCandidate = {
      id: Date.now(),
      name: form.name || "Anonymous Candidate",
      role: form.role || "Open to opportunities",
      location: form.location || "Location flexible",
      skills: form.skills || "Skills pending",
      spotlight: form.spotlight || "Resume uploaded for recruiter review.",
      resumeName: form.resumeName || "resume-uploaded.pdf",
    };

    setCandidates((current) => [nextCandidate, ...current]);
    setForm({
      name: "",
      role: "",
      location: "",
      skills: "",
      spotlight: "",
      resumeName: "",
    });
  }

  return (
    <>
      <header className="site-header">
        <button className="text-button" onClick={() => setMenuOpen(true)}>
          Menu +
        </button>
        <a className="brand" href="#top" aria-label="Effortless home">
          Effortless
        </a>
        <nav className="header-actions" aria-label="Utility navigation">
          <button className="text-button" onClick={() => setSearchOpen(true)}>
            Search
          </button>
          <a href="#upload">Upload</a>
          <a href="#talent">Talent</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-grid" aria-label="Effortless recruiting introduction">
          <article className="hero-panel hero-copy-panel">
            <div className="hero-statement">
              <p className="kicker">Recruiting reversed</p>
              <h1>Stop applying. Start being found.</h1>
              <p>
                Effortless lets candidates upload one resume into a curated
                talent database, then gives recruiters a cleaner way to discover
                people who already want to be seen.
              </p>
              <a href="#upload">Upload resume</a>
            </div>
          </article>
          <article className="hero-panel">
            <div className="blank-image">
              <span>Candidate image placeholder</span>
            </div>
            <div className="panel-caption">
              <p>For recruiters</p>
              <h2>Handpick from real profiles</h2>
              <a href="#talent">Browse talent</a>
            </div>
          </article>
        </section>

        <section className="collection-intro">
          <p className="kicker">The shift</p>
          <h2>One profile enters the room. The right teams make the first move.</h2>
          <div className="split-actions">
            <a href="#upload">For candidates</a>
            <a href="#talent">For recruiters</a>
          </div>
        </section>

        <section className="steps-row" aria-label="How Effortless works">
          <article>
            <span>01</span>
            <h3>Upload once</h3>
            <p>Candidates add role, location, skills, and a resume file.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Join the database</h3>
            <p>The profile becomes searchable inside the recruiter talent pool.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Get handpicked</h3>
            <p>Recruiters shortlist people first, then reach out with intent.</p>
          </article>
        </section>

        <section className="upload-section" id="upload">
          <div className="upload-copy">
            <p className="kicker">Candidate intake</p>
            <h2>Enter the talent pool.</h2>
            <p>
              This demo stores entries in your browser for now. A real version
              would connect this form to a secure database and resume file
              storage.
            </p>
          </div>

          <form className="resume-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Jordan Lee"
              />
            </label>
            <label>
              Target role
              <input
                value={form.role}
                onChange={(event) => updateField("role", event.target.value)}
                placeholder="Operations Manager"
              />
            </label>
            <label>
              Location
              <input
                value={form.location}
                onChange={(event) => updateField("location", event.target.value)}
                placeholder="New York, NY or Remote"
              />
            </label>
            <label>
              Key skills
              <input
                value={form.skills}
                onChange={(event) => updateField("skills", event.target.value)}
                placeholder="Strategy, SQL, team leadership"
              />
            </label>
            <label>
              Recruiter note
              <textarea
                value={form.spotlight}
                onChange={(event) => updateField("spotlight", event.target.value)}
                placeholder="What should recruiters know first?"
              />
            </label>
            <label>
              Resume upload
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(event) =>
                  updateField("resumeName", event.target.files[0]?.name || "")
                }
              />
            </label>
            <button type="submit">Add to database</button>
          </form>
        </section>

        <section className="talent-section" id="talent">
          <div className="section-heading">
            <p className="kicker">Recruiter view</p>
            <h2>Talent database</h2>
          </div>
          <div className="candidate-grid">
            {candidates.map((candidate) => (
              <article className="candidate-card" key={candidate.id}>
                <div className="candidate-photo">
                  <span>Profile image</span>
                </div>
                <div className="candidate-content">
                  <p>{candidate.role}</p>
                  <h3>{candidate.name}</h3>
                  <span>{candidate.location}</span>
                  <p>{candidate.skills}</p>
                  <p>{candidate.spotlight}</p>
                  <button type="button">Request resume</button>
                  <small>{candidate.resumeName}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <h2>The application era is overdue for a redesign.</h2>
          <form className="email-form">
            <label htmlFor="email">Recruiter waitlist</label>
            <div>
              <input id="email" type="email" placeholder="recruiter@company.com" />
              <button type="button">Join</button>
            </div>
          </form>
        </div>
        <p className="practice-note">
          Effortless concept demo. Browser storage only, not a production database.
        </p>
      </footer>

      <aside className={`drawer ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawer-header">
          <p>Navigation</p>
          <button className="text-button" onClick={() => setMenuOpen(false)}>
            Close
          </button>
        </div>
        {navGroups.map((group) => (
          <section className="drawer-group" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              <a href="#upload" onClick={() => setMenuOpen(false)} key={link}>
                {link}
              </a>
            ))}
          </section>
        ))}
      </aside>

      <div
        className={`scrim ${menuOpen || searchOpen ? "is-visible" : ""}`}
        onClick={() => {
          setMenuOpen(false);
          setSearchOpen(false);
        }}
      />

      <section className={`search-panel ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
        <div className="drawer-header">
          <p>Search candidates</p>
          <button className="text-button" onClick={() => setSearchOpen(false)}>
            Close
          </button>
        </div>
        <label htmlFor="siteSearch">Enter keyword</label>
        <input id="siteSearch" type="search" placeholder="Designer, React, Remote" />
        <button type="button">Submit</button>
      </section>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
