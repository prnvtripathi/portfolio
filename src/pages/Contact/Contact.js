import React from "react";
import './Contact.css'
import { RoughNotation } from "react-rough-notation";

const Contact = () => {
  return (
    <div className="container">
      <h1>Wanna be in <RoughNotation show={true} type="underline" color="#1fd954" strokeWidth={5} animationDuration={400}>touch?</RoughNotation></h1>
      <div>
        <form>
          <input name="name" type='text' placeholder="Name"/>
          <input name="email" type='email' placeholder="Email-Id"/>
          <textarea name="message" placeholder="message"/>
        </form>
      </div>
    </div>
  );
};

export default Contact;
