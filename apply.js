const { useEffect, useState } = React;

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

function ApplyApp() {
  const [candidates, setCandidates] = useState(loadCandidates);
  const [form, setForm] = useState({
    name: "",
    role: "",
    location: "",
    skills: "",
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
      resumeName: form.resumeName || "resume-uploaded.pdf",
    };

    setCandidates((current) => [nextCandidate, ...current]);
    setForm({
      name: "",
      role: "",
      location: "",
      skills: "",
      resumeName: "",
    });
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="index.html" aria-label="Effortless home">
          Effortless
        </a>
        <nav className="header-actions" aria-label="Main navigation">
          <a href="index.html#how">How it works</a>
          <a href="index.html#talent">Talent</a>
          <a className="nav-pill is-active" href="apply.html">Enter Pool</a>
        </nav>
      </header>

      <main className="apply-page">
        <section className="apply-intro">
          <p className="kicker">Enter pool</p>
          <h1>Build the profile recruiters find first.</h1>
          <p>
            Add the essentials. Keep it simple. In a real launch, this would
            save into a private database with secure resume file storage.
          </p>
        </section>

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
            Resume upload
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) =>
                updateField("resumeName", event.target.files[0]?.name || "")
              }
            />
          </label>
          <button type="submit">Add to pool</button>
        </form>

        <section className="recent-pool">
          <p className="kicker">Recently added</p>
          <div className="candidate-grid compact-grid">
            {candidates.slice(0, 3).map((candidate) => (
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
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ApplyApp />);
