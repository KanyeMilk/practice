const { useEffect, useState } = React;

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSdGsGsOxo6INIev5YiYITlxpnIK9m0oox1sIT4T-oZcxHgeKg/formResponse";

const GOOGLE_FORM_FIELDS = {
  name: "entry.1467333147",
  role: "entry.1305073458",
  skills: "entry.1346102194",
  resumeLink: "entry.1970411016",
};

const starterCandidates = [
  {
    id: 1,
    name: "Maya Chen",
    role: "Product Designer",
    location: "Los Angeles, CA",
    skills: "Figma, systems, research",
    resumeLink: "maya-chen-resume.pdf",
  },
  {
    id: 2,
    name: "Andre Brooks",
    role: "Frontend Engineer",
    location: "Austin, TX",
    skills: "React, TypeScript, accessibility",
    resumeLink: "andre-brooks-resume.pdf",
  },
  {
    id: 3,
    name: "Sam Rivera",
    role: "Growth Marketer",
    location: "Remote",
    skills: "Lifecycle, analytics, paid social",
    resumeLink: "sam-rivera-resume.pdf",
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
    skills: "",
    resumeLink: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    localStorage.setItem("effortlessCandidates", JSON.stringify(candidates));
  }, [candidates]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const submission = new URLSearchParams();
    submission.append(GOOGLE_FORM_FIELDS.name, form.name);
    submission.append(GOOGLE_FORM_FIELDS.role, form.role);
    submission.append(GOOGLE_FORM_FIELDS.skills, form.skills);
    submission.append(GOOGLE_FORM_FIELDS.resumeLink, form.resumeLink);

    setStatus("Submitting...");

    await fetch(GOOGLE_FORM_ACTION, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: submission.toString(),
    });

    const nextCandidate = {
      id: Date.now(),
      name: form.name || "Anonymous Candidate",
      role: form.role || "Open to opportunities",
      location: "Submitted profile",
      skills: form.skills || "Skills pending",
      resumeLink: form.resumeLink || "Resume link pending",
    };

    setCandidates((current) => [nextCandidate, ...current]);
    setForm({
      name: "",
      role: "",
      skills: "",
      resumeLink: "",
    });
    setStatus("Added to the pool. Your profile was sent to the spreadsheet.");
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
            Key skills
            <input
              value={form.skills}
              onChange={(event) => updateField("skills", event.target.value)}
              placeholder="Strategy, SQL, team leadership"
            />
          </label>
          <label>
            Resume link
            <input
              value={form.resumeLink}
              onChange={(event) => updateField("resumeLink", event.target.value)}
              placeholder="https://drive.google.com/..."
            />
          </label>
          <button type="submit">Add to pool</button>
          {status && <p className="form-status">{status}</p>}
        </form>

        <section className="recent-pool">
          <p className="kicker">Recently added</p>
          <div className="candidate-grid compact-grid">
            {candidates.slice(0, 3).map((candidate) => (
              <article className="candidate-card" key={candidate.id}>
                <div>
                  <p>{candidate.role}</p>
                  <h3>{candidate.name}</h3>
                  <span>{candidate.location || "Submitted profile"}</span>
                </div>
                <p>{candidate.skills}</p>
                <small>{candidate.resumeLink || candidate.resumeName}</small>
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
