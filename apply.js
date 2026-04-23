const { useEffect, useState } = React;

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPtqHjrERNrxXzZVcS7_FPVKasvTkZXBSLuibkTiAgHx_ceSXv1MVBjJhUPFxBtu4lrw/exec";

const starterCandidates = [
  {
    id: 1,
    name: "Maya Chen",
    role: "Product Designer",
    location: "Los Angeles, CA",
    skills: "Figma, systems, research",
    zipCode: "90012",
    resumeName: "maya-chen-resume.pdf",
  },
  {
    id: 2,
    name: "Andre Brooks",
    role: "Frontend Engineer",
    location: "Austin, TX",
    skills: "React, TypeScript, accessibility",
    zipCode: "78701",
    resumeName: "andre-brooks-resume.pdf",
  },
  {
    id: 3,
    name: "Sam Rivera",
    role: "Growth Marketer",
    location: "Remote",
    skills: "Lifecycle, analytics, paid social",
    zipCode: "Remote",
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
    skills: "",
    zipCode: "",
    resumeFile: null,
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    localStorage.setItem("effortlessCandidates", JSON.stringify(candidates));
  }, [candidates]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.resumeFile) {
      setStatus("Please attach your resume before submitting.");
      return;
    }

    setStatus("Uploading resume...");

    try {
      const fileBase64 = await fileToBase64(form.resumeFile);

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: form.name,
          role: form.role,
          skills: form.skills,
          zipCode: form.zipCode,
          fileName: form.resumeFile.name,
          fileType: form.resumeFile.type || "application/octet-stream",
          fileBase64,
        }),
      });

      const nextCandidate = {
        id: Date.now(),
        name: form.name || "Anonymous Candidate",
        role: form.role || "Open to opportunities",
        location: form.zipCode || "Zip code pending",
        skills: form.skills || "Skills pending",
        zipCode: form.zipCode || "Pending",
        resumeName: form.resumeFile.name,
      };

      setCandidates((current) => [nextCandidate, ...current]);
      setForm({
        name: "",
        role: "",
        skills: "",
        zipCode: "",
        resumeFile: null,
      });
      event.target.reset();
      setStatus("Added to the pool. Your resume was uploaded.");
    } catch {
      setStatus("Something went wrong. Please try again.");
    }
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
            Zip code
            <input
              value={form.zipCode}
              onChange={(event) => updateField("zipCode", event.target.value)}
              placeholder="90210"
              inputMode="numeric"
            />
          </label>
          <label>
            Resume file
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) =>
                updateField("resumeFile", event.target.files[0] || null)
              }
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
                  <span>Zip {candidate.zipCode || candidate.location || "pending"}</span>
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
