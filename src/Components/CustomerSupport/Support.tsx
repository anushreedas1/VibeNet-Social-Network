import { FunctionComponent } from 'react';
import styles from './Supportmodule.css';

const Support: FunctionComponent = () => {
  return (
    <div className={styles.support} style={{ background: 'linear-gradient(135deg, #f0f2ff 50%, #141414 50%)' }}>
      <div className={styles.support}>
      <div className={styles.leftSection}>
        <h1 className={styles.heading}>
          Let's Get in <span className={styles.touch}>Touch!</span>
        </h1>
        <p className={styles.subheading}>
          Have a question or need assistance? Reach out to us via email, phone, or the contact form below. We're eager to assist you.
        </p>
        <p className={styles.niceToHear}>Nice hearing from you!</p>
        <img className={styles.binocularImage} alt="Girl looking through binoculars" src="long-haired-girl-watching-through-binoculars.png" />
        <div className={styles.socialMediaIcons}>
          <img src="facebook-icon.png" alt="Facebook" />
          <img src="whatsapp-icon.png" alt="WhatsApp" />
          <img src="telegram-icon.png" alt="Telegram" />
        </div>
        <div className={styles.brand}>
          <span>Vibe</span><span className={styles.net}>Net</span>
        </div>
      </div>
      <div className={styles.rightSection}>
        <form className={styles.contactForm}>
          <label className={styles.label}>Full Name:</label>
          <input className={styles.input} type="text" placeholder="Your Name" />
          <label className={styles.label}>Email:</label>
          <input className={styles.input} type="email" placeholder="Your Email" />
          <label className={styles.label}>Message:</label>
          <textarea className={styles.textarea} placeholder="Your Message"></textarea>
          <button className={styles.submitButton} type="submit">Submit</button>
        </form>
        <div className={styles.contactDetails}>
          <h2>Contact Us:</h2>
          <p>+91 9203904734</p>
          <p>vibenet@gmail.com</p>
          <p>VIT (Vellore Institute of Technology)</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Support;
