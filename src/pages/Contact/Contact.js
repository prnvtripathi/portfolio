import React from "react";
import './Contact.css'
import { RoughNotation } from "react-rough-notation";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className="container">
      <h1>Wanna be in <RoughNotation show={true} type="underline" color="#1fd954" strokeWidth={5} animationDuration={400}>touch?</RoughNotation></h1>
      <div className="text-zone">
        <div className="form">
          <h2>Send a <span className="font-change">personalised</span> message!</h2>
          <form>
            <input className="input-fields name-field" name="name" type='text' placeholder="Name" />
            <input className="input-fields emailid-field" name="email" type='email' placeholder="Email-Id" />
            <textarea className="message" name="message" placeholder="message" />
            <button className='submit'>Let's go</button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
