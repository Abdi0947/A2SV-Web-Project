import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import './ContactForm.css';

const ContactForm: React.FC = () => {
  const { values, errors, handleChange, validate, reset } = useForm({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', values);
      setIsSuccess(true);
      reset();
      setIsSubmitting(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="contact-container">
      <div className="contact-form-wrapper">
        <div className="contact-form-card">
          {isSuccess ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Message Sent Successfully!</h2>
              <p className="success-text">Thank you for contacting us. We will get back to you soon.</p>
            </div>
          ) : (
            <>
              <h1 className="form-title">Contact us</h1>

              <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={values.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Enter your message"
                rows={4}
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

                <button type="submit" className="send-button" disabled={isSubmitting}>
                  {isSubmitting ? 'SENDING...' : 'SEND'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
