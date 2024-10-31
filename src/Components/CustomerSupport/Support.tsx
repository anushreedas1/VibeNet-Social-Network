import { FunctionComponent } from 'react';
import styles from './Supportmodule.css';

const Support: FunctionComponent = () => {
  return (
    <div className={styles.support}>
      <div className={styles.supportChild} />
      <div className={styles.groupParent}>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <div className={styles.groupItem} />
          <div className={styles.groupInner} />
          <div className={styles.fullName}>Full Name:</div>
          <div className={styles.email}>Email:</div>
          <div className={styles.message}>Message:</div>
        </div>
        <b className={styles.niceHearingFrom}>Nice hearing from you!</b>
        <div className={styles.frameChild} />
        <div className={styles.frameItem} />
        <div className={styles.username} />
        <div className={styles.username1} />
        <img className={styles.frameInner} alt="" src="Rectangle 7.svg" />
        <div className={styles.username2} />
        <div className={styles.submitWrapper}>
          <div className={styles.submit}>
            <p className={styles.haveAQuestion}>Submit</p>
          </div>
        </div>
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
      <img
        className={styles.longHairedGirlWatchingThroIcon}
        alt=""
        src="long-haired-girl-watching-through-binoculars (2) 1.png"
      />
      <img className={styles.socialMediaIcons} alt="" src="Social media icons.svg" />
      <div className={styles.contactUsParent}>
        <div className={styles.contactUs}>Contact Us:</div>
        <div className={styles.conrtacrt}>
          <div className={styles.div}>+91 9203904734</div>
          <div className={styles.vibenetgmailcom}>vibenet@gmail.com</div>
          <div className={styles.vitVelloreInstitute}>VIT (Vellore Institute of Technology)</div>
          <img className={styles.icbaselinePhoneIcon} alt="" src="ic:baseline-phone.svg" />
          <img className={styles.icbaselineEmailIcon} alt="" src="ic:baseline-email.svg" />
          <img className={styles.mdiaddressMarkerIcon} alt="" src="mdi:address-marker.svg" />
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
