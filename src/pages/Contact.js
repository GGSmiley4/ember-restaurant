import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { CheckIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '../components/Icons';

const INFO = [
  { icon: MapPinIcon, title: 'Address', lines: ['Downtown'] },
  { icon: PhoneIcon, title: 'Phone', lines: ['08 919 353'] },
  { icon: MailIcon, title: 'Email', lines: ['ember@gmail.com'] },
  { icon: ClockIcon, title: 'Opening hours', lines: ['Daily 11:00 – 23:00'] },
];

const EMPTY = { name: '', email: '', topic: 'General question', message: '' };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'Your message should be at least 10 characters.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

  
    setSent(true);
    setValues(EMPTY);
  };

  return (
    <>
      <PageHeader eyebrow="Contact" title="We'd love to hear from you">
        Questions about an order, catering or feedback on a dish? Send us a message.
      </PageHeader>

      <section className="section section-tight">
        <div className="container">
          <div className="info-grid">
            {INFO.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="card info-card">
                <span className="step-icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                {lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="card form-card contact-form">
            {sent ? (
              <div className="sent">
                <span className="sent-icon">
                  <CheckIcon size={28} />
                </span>
                <h2>Message sent!</h2>
                <p className="muted">Thanks for getting in touch. We&apos;ll reply as soon as we can.</p>
                <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2>Send a message</h2>
                <div className="form-row">
                  <div className={`field ${errors.name ? 'has-error' : ''}`}>
                    <label htmlFor="contact-name">Name</label>
                    <input id="contact-name" name="name" value={values.name} onChange={handleChange} />
                    {errors.name && <p className="field-error">{errors.name}</p>}
                  </div>
                  <div className={`field ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="contact-email">Email</label>
                    <input id="contact-email" name="email" type="email" value={values.email} onChange={handleChange} />
                    {errors.email && <p className="field-error">{errors.email}</p>}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="contact-topic">Topic</label>
                  <select id="contact-topic" name="topic" value={values.topic} onChange={handleChange}>
                    <option>General question</option>
                    <option>Problem with an order</option>
                    <option>Catering and events</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className={`field ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" rows={5} value={values.message} onChange={handleChange} />
                  {errors.message && <p className="field-error">{errors.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
