import { useState } from "react";
import "./App.css";

const App = () => {
  const [length, setLength] = useState<number>(12);
  const [useLetters, setUseLetters] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<"Weak" | "Medium" | "Strong" | "">("");

  const generatePassword = () => {
    let characters = "";
    if (useLetters) characters += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) characters += "0123456789";
    if (useSymbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (characters.length === 0) {
      setPassword("Please select at least one option");
      setStrength("");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    setPassword(newPassword);
    evaluateStrength(newPassword);
  };

  const evaluateStrength = (pwd: string) => {
    let score = 0;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (pwd.length >= 12) score++;

    if (score <= 1) setStrength("Weak");
    else if (score <= 3) setStrength("Medium");
    else setStrength("Strong");
  };

  const copyToClipboard = () => {
    if (password && password !== "Please select at least one option") {
      navigator.clipboard.writeText(password);
    }
  };

  return (
    <div className="container fade-in">
      <h1>Password Generator 🔐</h1>

      <div className="password-box">
        <input type="text" value={password} readOnly />
        <button onClick={copyToClipboard}>Copy</button>
      </div>

      {password && (
        <div className={`strength ${strength.toLowerCase()}`}>
          Strength: {strength}
        </div>
      )}

      <div className="options">
        <label>
          Length:
          <input
            type="number"
            min={4}
            max={50}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={useLetters}
            onChange={(e) => setUseLetters(e.target.checked)}
          />
          Include Alphabets
        </label>

        <label>
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
          />
          Include Numbers
        </label>

        <label>
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
          />
          Include Special Characters
        </label>
      </div>

      <button className="generate-btn" onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  );
};

export default App;
