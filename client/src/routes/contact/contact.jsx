import { useState, useRef } from "react";
import "./contact.scss";

function ContactPage() {
  const [showPopup, setShowPopup] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowPopup(true);

    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="contactPage">
      {showPopup && (
        <div className="popup">
          <p>Form submitted successfully!</p>
        </div>
      )}
      <div className="header">
        <h1>Contact Us</h1>
      </div>
      <div className="content">
        <div className="section">
          <h2>Get in Touch</h2>
          <p>
            We are here to help you with any questions or concerns you may have.
            Feel free to reach out to us via the contact form below or through
            our email and phone number provided.
          </p>
        </div>
        <div className="section">
          <h2>Contact Information</h2>
          <p>
            <strong>Email:</strong> viveksh1952003@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +91 8234567890
          </p>
          <p>
            <strong>Address:</strong> 1234 VueEstate St, South Block, Delhi 110011
          </p>
        </div>
        <div className="section">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                ref={nameRef}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                ref={messageRef}
                required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
