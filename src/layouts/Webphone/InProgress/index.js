import React from "react";
// import { 
//   DotsNine, 
//   Microphone, 
//   MicrophoneSlash, 
//   PhoneDisconnect, 
//   SpeakerHigh 
// } from "@phosphor-icons/react";
import { ReactComponent as SpeakerHigh } from "../../../assets/icons/SpeakerHigh.svg";
import { ReactComponent as Microphone } from "../../../assets/icons/Microphone.svg";
import { ReactComponent as MicrophoneSlash } from "../../../assets/icons/MicrophoneSlash.svg";
import { ReactComponent as PhoneDisconnect } from "../../../assets/icons/PhoneDisconnect.svg";
import { ReactComponent as DotsNine } from "../../../assets/icons/DotsNine.svg";

import { useWebphone } from "../../../contexts/Webphone";

import styles from './styles.module.scss';
import Avatar from "../../../components/Avatar";

export const InProgressLayout = () => {
  const { callStatus, name, endCall, mute, unMute, isMuted, profilePictureURL } = useWebphone();

  return (
    <div className={styles.in_progress_layout} canDrag={1}>
      <div className={styles.avatar_section} canDrag={1}>
        <Avatar 
          size="large"
          alt="Avatar" 
          src={profilePictureURL || "default-avatar.png"}
          name={name}
          canDrag={1}
        />
   
        <p className={styles.name} canDrag={1}>{name}</p>
        <p className={styles.call_status} canDrag={1}>{callStatus}</p>
      </div>

      <div className={styles.controls} canDrag={1}>
        <div className={styles.grid}>
          <button className={styles.keyboard} disabled>
            <SpeakerHigh size={18} />
            <span className={styles.desc}>sound</span>
          </button>
          <button className={styles.keyboard} disabled>
            <DotsNine width={18} height={18} stroke="currentColor" color="currentColor" />
          </button>
          {isMuted ? (
            <button className={styles.keyboard} highlighted onClick={unMute}>
              <MicrophoneSlash  width={18} height={18} />
              <span className={styles.desc}>unmute</span>
            </button>
          ) : (
            <button className={styles.keyboard} onClick={mute}>
              <Microphone  width={18} height={18} />
              <span className={styles.desc}>mute</span>
            </button>
          )}
        </div>
      </div>

      <div className={styles.end_call} canDrag={1}>
        <button className={styles.end_call_button} onClick={endCall}>
          <PhoneDisconnect width={15} height={15} color="white" />
        </button>
      </div>
    </div>
  );
};
