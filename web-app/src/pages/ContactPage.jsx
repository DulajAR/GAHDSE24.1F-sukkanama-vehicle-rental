import React from "react";
import ContactInfo from "../components/ContactInfo";
import ContactFormSection from "../components/ContactFormSection";
import ContactHeader from "../components/ContactHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";


const ContactPage = () => {
  return (
    <>
      <Header />
      <ContactHeader/>
      <ContactInfo />
      <ContactFormSection />
      <Newsletter />
      <Footer/>
    </>
  );
};

export default ContactPage;