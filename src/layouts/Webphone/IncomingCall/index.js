import React from "react";
import { useWebphone } from "../../../contexts/Webphone";
import styles from "./styles.module.scss";
import Avatar from "../../../components/Avatar";

import { ReactComponent as PhoneDisconnect } from "../../../assets/icons/PhoneDisconnect.svg";
import { ReactComponent as Phone } from "../../../assets/icons/Phone.svg";

export const IncomingCallLayout = () => {
  const { name, callStatus, callState, profilePictureURL, acceptCall, rejectCall } = useWebphone();

  return (
    <div className={styles.container} canDrag={1}>
      <div className={styles.profileContainer} canDrag={1}>
        <Avatar
          size="large"
          alt="Avatar"
          src={profilePictureURL || "default-avatar.png"}
          name={name}
          canDrag={1}
        />
        <p className={styles.name} canDrag={1}>{name}</p>
        <p className={styles.status} canDrag={1}>{callStatus}</p>
      </div>

      <div className={styles.buttonContainer} canDrag={1}>
        <button
          className={`${styles.button} ${styles.accept}`}
          disabled={callState !== "offer"}
          onClick={acceptCall}
        >
          <Phone height={15} width={15} color="white" />
        </button>

        <button
          className={`${styles.button} ${styles.reject}`}
          disabled={callState !== "offer"}
          onClick={rejectCall}
        >
          <PhoneDisconnect height={15} width={15} color="white" />
        </button>
      </div>
    </div>
  );
};
