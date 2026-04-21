const { useState } = React;

function App() {
  const [name, setName] = useState("");

  return (
    <main className="card">
      <p className="eyebrow">Practice React App</p>
      <h1>Type in your name</h1>
      <p className="intro">
        This version uses a React component and state to update the greeting as
        you type.
      </p>

      <label className="field" htmlFor="nameInput">
        Your name
      </label>
      <input
        id="nameInput"
        name="name"
        type="text"
        placeholder="Enter your name"
        autoComplete="off"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <section className="output" aria-live="polite">
        <span className="output-label">Preview</span>
        <p id="greeting">{name.trim() ? `Hi, ${name.trim()}.` : "Hi there."}</p>
      </section>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
