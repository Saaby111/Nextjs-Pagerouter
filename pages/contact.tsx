'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container mt-4">
      <h2>Contact Us</h2>
      {!submitted ? (
        <form className="mt-3" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Message for us</label>
            <textarea className="form-control" rows={4} required />
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      ) : (
        <p>Thanks! We'll get back to you soon.</p>
      )}
    </div>
  );
}
