import React from 'react';
import "./Contact.css";
import contactImg from "../../images/background-img.jpg";

const Contact = () => {
  return (
    <section className='contact'>
      <div className='container'>
        <div className='section-title'>
          <h2>Contact</h2>
        </div>

        <div className='contact-content grid'>
          <div className='contact-img'>
            <img src = {contactImg} alt = "Beautiful purple and green garden" />
          </div>
          <div className='contact-text'>
            <h2 className='contact-title fs-26 ls-1'>Contact us</h2>
            <p className='fs-17'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Accusamus dignissimos consequuntur vero commodi provident maiores, iusto atque corrupti voluptate vel sequi consectetur 
            unde aliquam corporis saepe animi non, tempora reiciendis molestias sed laudantium dolores. 
            Assumenda aperiam fuga quo voluptate commodi ullam aliquam expedita voluptas delectus.</p>
            <form className='contact-form'>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' className='form-control' />
              </div>
              <div className='form-group email'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' className='form-control' />
              </div>
              <div className='form-group message'>
                <label htmlFor='message'>Message</label>
                <textarea id='message' name='message' className='form-control'></textarea>
              </div>
              <button type='submit' className='form-group btn btn-primary'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact