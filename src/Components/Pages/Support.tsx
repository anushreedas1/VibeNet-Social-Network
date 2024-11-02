import { FunctionComponent, useState } from 'react';
import styles from './Sup.module.css';
import longHairedGirl from "../../assets/images/long-haired-girl-watching-through-binoculars (2) 1.png"; // Adjust path as needed
import socialMediaIcons from "../../assets/images/Social media icons.svg"; // Adjust path as needed
import phoneIcon from "../../assets/images/ic_baseline-phone.svg"; // Adjust path as needed
import emailIcon from "../../assets/images/ic_baseline-email.svg"; // Adjust path as needed
import addressIcon from "../../assets/images/mdi_address-marker.svg"; // Adjust path as needed

const Support: FunctionComponent = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add form submission logic here
    window.location.href = '/response'; // Redirect to response page
  };

  return (
    <div className={styles.support}>
      <div className={styles.supportChild} />
      <div className={styles.groupParent}>
        <div className={styles.rectangleParent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <label className={styles.fullName}>
                Full Name:
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className={styles.inputField} // Add styling for consistency
                />
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.email}>
                Email ID:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.inputField} // Add styling for consistency
                />
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.message}>
                Message:
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className={styles.inputUsername2} // Use your specified CSS class for dimensions
                />
              </label>
            </div>
            <div className={styles.submitWrapper}>
              <button type="submit" className={styles.submit}>
                Submit
              </button>
            </div>
          </form>
        </div>
        <b className={styles.niceHearingFrom}>Nice hearing from you!</b>
        <div className={styles.frameChild} />
        <div className={styles.frameItem} />
      </div>
      <div className={styles.supportItem} />
      <div className={styles.letsGetInTouchParent}>
        <div className={styles.letsGetInContainer}>
          <span>{`Lets Get in `}</span>
          <b className={styles.touch}>Touch!</b>
        </div>
        <div className={styles.haveAQuestionContainer}>
          <p className={styles.haveAQuestion}>
            {`Have a question or need assistance? Reach out to us via email, `}
          </p>
          <p className={styles.haveAQuestion}>
            phone, or the contact form below. We're eager to assist you.
          </p>
        </div>
      </div>
      <img className={styles.longHairedGirlWatchingThroIcon} alt="" src={longHairedGirl} />
      <img className={styles.socialMediaIcons} alt="" src={socialMediaIcons} />
      <div className={styles.contactUsParent}>
        <div className={styles.contactUs}>Contact Us:</div>
        <div className={styles.conrtacrt}>
          <div className={styles.div}>+91 6290464748</div>
          <div className={styles.vibenetgmailcom}>admin.vibenet@gmail.com</div>
          <div className={styles.vitVelloreInstitute}>VIT (Vellore Institute of Technology)</div>
          <img className={styles.icbaselinePhoneIcon} alt="" src={phoneIcon} />
          <img className={styles.icbaselineEmailIcon} alt="" src={emailIcon} />
          <img className={styles.mdiaddressMarkerIcon} alt="" src={addressIcon} />
        </div>
      </div>
      <div className={styles.vibenetWrapper}>
        <i className={styles.vibenet}>
          <span>Vibe</span>
          <span className={styles.net}>Net</span>
        </i>
      </div>
    </div>
  );
};

export default Support;
