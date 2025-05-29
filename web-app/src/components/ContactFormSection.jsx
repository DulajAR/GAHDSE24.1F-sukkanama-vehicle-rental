import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      alert("Message submitted successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error saving message: ", error);
      alert("Submission failed. Try again.");
    }
  };

  return (
    <section id="form-details">
      <form onSubmit={handleSubmit}>
        <span>LEAVE A MESSAGE</span>
        <h2>We would love to hear from you</h2>
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="E-Mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
        <textarea
          cols="30"
          rows="10"
          placeholder="Your Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button className="normal" type="submit">Submit</button>
      </form>

      <div className="people">
        <div>
          <img src={img1} alt="Dulaj Ayeshmantha" />
          <p>
            <span>Dulaj Ayeshmantha</span> CEO / Founder <br />
            Phone: +94 788568282 <br />
            Email: dulajayeshmantha91@gmail.com
          </p>
        </div>
        <div>
          <img src={img2} alt="Felicia Gunasekara" />
          <p>
            <span>Felicia Gunasekara</span> Operations Manager <br />
            Phone: +94 761825864 <br />
            Email: sandeegunasekera@gmail.com
          </p>
        </div>
        <div>
          <img src={img3} alt="Navodya Dewmini" />
          <p>
            <span>Navodya Dewmini</span> Customer Support Manager <br />
            Phone: +94 753236372 <br />
            Email: dnavodya049@gmail.com
          </p>
        </div>
        <div>
          <img src={img4} alt="Saveena Sathsaranee" />
          <p>
            <span>Saveena Sathsaranee</span> Technical Lead / Developer <br />
            Phone: +94 764806258 <br />
            Email: saveenaanabel@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
