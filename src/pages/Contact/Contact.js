import React, { useRef } from "react";
import emailjs from '@emailjs/browser'
import './Contact.css'
import { RoughNotation } from "react-rough-notation";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { SiHashnode } from 'react-icons/si'
import Footer from '../Footer/Footer'
import { motion } from "framer-motion";

const Contact = () => {

  const form = useRef();

  const createAlert = (message) => {
    const alertBox = document.querySelector('.alert');
    alertBox.innerHTML = message;
    alertBox.style.display = 'block';
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 3000);
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_o1b9i7m', 'template_pdd27nv', form.current, 'NkREpU3WwM0aYiRku')
      .then((result) => {
        createAlert(`Message sent successfully! I'll get back to you soon.`)
      }, (error) => {
        createAlert(`Something went wrong! Please try again.`)
      });
  };

  return (
    <div className="container">
      <h1>Wanna be in <RoughNotation show={true} type="underline" color="#1fd954" strokeWidth={5} animationDuration={400}>touch?</RoughNotation></h1>
      <motion.p
        initial={{ opacity: 0, x: 1000 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="contact-text"
      >If you have a job or freelancing gig, that you think I can do.</motion.p>
      <div className="text-zone">
        <div className="form">
          <motion.h2
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Send a <span className="font-change">
              personalised</span> message!
          </motion.h2>
          <form ref={form} onSubmit={sendEmail}>
            <input className="input-fields name-field" name="from_name" type='text' placeholder="Name here!" required />
            <input className="input-fields emailid-field" name="from_email" type='email' placeholder="Drop your email here!" required />
            <textarea className="message" name="message" placeholder="What do you want to say?" required />
            <button className='submit' type='submit'>Let's Go</button>
          </form>
          <div className="alert"></div>
        </div>
        <div className="socials">
          <h2>Or <RoughNotation show={true} type="circle" padding={8} animationDelay={400} color="red" strokeWidth={4}>ping</RoughNotation> me here.</h2>
          <div className="icons">
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="icon-box"
            ><a href="https://www.linkedin.com/in/tripathipranav14/"><FaLinkedin size={36} /></a></motion.div>
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="icon-box"
            ><a href="https://www.twitter.com/prnvtwts/"><FaTwitter size={36} /></a></motion.div>
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="icon-box"
            ><a href="mailto:tripathipranav14@gmail.com?subject=Message from Portfolio Website"><FaEnvelope size={36} /></a></motion.div>
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="icon-box"
            ><a href="https://www.github.com/prnvtripathi/"><FaGithub size={36} /></a></motion.div>
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="icon-box"
            ><a href="https://instagram.com/prnvtripathi?igshid=Yzg5MTU1MDY="><FaInstagram size={36} /></a></motion.div>
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="icon-box"
            ><a href="https://prnvtripathi.hashnode.dev/"><SiHashnode size={36} /></a></motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
