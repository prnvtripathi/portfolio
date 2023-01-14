import React, { useRef } from "react";
import emailjs from '@emailjs/browser'
import './Contact.css'
import { RoughNotation } from "react-rough-notation";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { SiHashnode } from 'react-icons/si'
import Footer from '../Footer/Footer'

const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_o1b9i7m', 'template_pdd27nv', form.current, 'NkREpU3WwM0aYiRku')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  const reloadPage = () => {
    window.location.reload(true)
  }

  return (
    <div className="container">
      <h1>Wanna be in <RoughNotation show={true} type="underline" color="#1fd954" strokeWidth={5} animationDuration={400}>touch?</RoughNotation></h1>
      <p className="contact-text">If you have a job or freelancing gig, that you think I can do.</p>
      <div className="text-zone">
        <div className="form">
          <h2>Send a <span className="font-change">personalised</span> message!</h2>
          <form ref={form} onSubmit={sendEmail}>
            <input className="input-fields name-field" name="from_name" type='text' placeholder="Name" />
            <input className="input-fields emailid-field" name="from_email" type='email' placeholder="Email-Id" />
            <textarea className="message" name="message" placeholder="message" />
            <input className='submit' value="Let's go" type='submit' onClick={reloadPage} />
          </form>
        </div>
        <div className="socials">
          <h2>Or <RoughNotation show={true} type="circle" padding={8} animationDelay={400} color="red" strokeWidth={4}>ping</RoughNotation> me here.</h2>
          <div className="icons">
            <div className="icon-box"><a href="https://www.linkedin.com/in/tripathipranav14/"><FaLinkedin size={36} /></a></div>
            <div className="icon-box"><a href="https://www.twitter.com/prnvtwts/"><FaTwitter size={36} /></a></div>
            <div className="icon-box"><a href="mailto:tripathipranav14@gmail.com?subject=Message from Portfolio Website"><FaEnvelope size={36} /></a></div>
            <div className="icon-box"><a href="https://www.github.com/prnvtripathi/"><FaGithub size={36} /></a></div>
            <div className="icon-box"><a href="https://instagram.com/prnvtripathi?igshid=Yzg5MTU1MDY="><FaInstagram size={36} /></a></div>
            <div className="icon-box"><a href="https://prnvtripathi.hashnode.dev/"><SiHashnode size={36} /></a></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
