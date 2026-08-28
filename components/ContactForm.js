"use client";
// components/ContactForm.js
import { useState } from "react";

// Web3Forms access key -- this is meant to be public/client-side by design
// (it identifies which form submissions route to, same as how Web3Forms'
// own docs show it embedded directly in HTML).
const WEB3FORMS_ACCESS_KEY = "0b972141-2878-4914-9b70-867ccab932bd";

const inputStyle = {
  width: "100%",
  padding: "0.6rem 0.75rem",
  border: "1px solid var(--color-border)",
  borderRadius: "6px",
  fontFamily: "inherit",
  fontSize: "1rem",
  color: "var(--color-text)",
};

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New message from the Rockstar CMO contact form");
    formData.append("from_name", "Rockstar CMO website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ padding: "1.5rem", backgroundColor: "#f5f5f5", borderRadius: "8px", maxWidth: "500px" }}>
        <p style={{ margin: 0, fontWeight: 700 }}>Thanks &mdash; we&rsquo;ll get back to you soon!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="name" style={{ display: "block", marginBottom: "0.35rem", fontWeight: 700 }}>
          Name *
        </label>
        <input id="name" name="name" type="text" required style={inputStyle} />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="email" style={{ display: "block", marginBottom: "0.35rem", fontWeight: 700 }}>
          Email *
        </label>
        <input id="email" name="email" type="email" required style={inputStyle} />
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        <label htmlFor="message" style={{ display: "block", marginBottom: "0.35rem", fontWeight: 700 }}>
          Message *
        </label>
        <textarea id="message" name="message" required rows={5} style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      {/* Honeypot spam trap -- standard Web3Forms pattern. Hidden from real
          users; bots that fill every field will trip it and get silently
          rejected server-side. */}
      <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <button
        type="submit"
        className="btn-primary"
        disabled={status === "sending"}
        style={{ border: "none", cursor: status === "sending" ? "default" : "pointer", opacity: status === "sending" ? 0.7 : 1 }}
      >
        {status === "sending" ? "Sending\u2026" : "Submit"}
      </button>

      {status === "error" && (
        <p style={{ color: "#F22F29", marginTop: "0.75rem" }}>
          Something went wrong &mdash; please try again, or email us directly.
        </p>
      )}
    </form>
  );
}
