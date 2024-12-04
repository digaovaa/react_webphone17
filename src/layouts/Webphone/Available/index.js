import React, { useState } from "react";
// import { Phone } from "@phosphor-icons/react";
import { useWebphone } from "../../../contexts/Webphone";

import useSound from 'use-sound';

import SoundDTMF1 from '../../../assets/sounds/dtmf-1.mp3';
import SoundDTMF2 from '../../../assets/sounds/dtmf-2.mp3';
import SoundDTMF3 from '../../../assets/sounds/dtmf-3.mp3';
import SoundDTMF4 from '../../../assets/sounds/dtmf-4.mp3';
import SoundDTMF5 from '../../../assets/sounds/dtmf-5.mp3';
import SoundDTMF6 from '../../../assets/sounds/dtmf-6.mp3';
import SoundDTMF7 from '../../../assets/sounds/dtmf-7.mp3';
import SoundDTMF8 from '../../../assets/sounds/dtmf-8.mp3';
import SoundDTMF9 from '../../../assets/sounds/dtmf-9.mp3';
import SoundDTMF0 from '../../../assets/sounds/dtmf-0.mp3';
import SoundDTMFHash from '../../../assets/sounds/dtmf-hash.mp3';
import SoundDTMFStar from '../../../assets/sounds/dtmf-star.mp3';

import styles from './styles.module.scss';
import { Keyboard } from "../../../components/Keyboard";

import { ReactComponent as Phone } from "../../../assets/icons/Phone.svg";

export const AvailableLayout = () => {
  const [playDTMF1] = useSound(SoundDTMF1);
  const [playDTMF2] = useSound(SoundDTMF2);
  const [playDTMF3] = useSound(SoundDTMF3);
  const [playDTMF4] = useSound(SoundDTMF4);
  const [playDTMF5] = useSound(SoundDTMF5);
  const [playDTMF6] = useSound(SoundDTMF6);
  const [playDTMF7] = useSound(SoundDTMF7);
  const [playDTMF8] = useSound(SoundDTMF8);
  const [playDTMF9] = useSound(SoundDTMF9);
  const [playDTMF0] = useSound(SoundDTMF0);
  const [playDTMFHash] = useSound(SoundDTMFHash);
  const [playDTMFStar] = useSound(SoundDTMFStar);
  const { startCall, callError, selectedToken } = useWebphone();

  const [phone, setPhone] = useState("");

  const playDTMFSounds = (key) => {
    switch (key) {
      case "1": playDTMF1(); break;
      case "2": playDTMF2(); break;
      case "3": playDTMF3(); break;
      case "4": playDTMF4(); break;
      case "5": playDTMF5(); break;
      case "6": playDTMF6(); break;
      case "7": playDTMF7(); break;
      case "8": playDTMF8(); break;
      case "9": playDTMF9(); break;
      case "0": playDTMF0(); break;
      case "#": playDTMFHash(); break;
      case "*": playDTMFStar(); break;
    }
  }

  const handleOnClickKeyboard = (key) => {
    setPhone(phone + key);
    playDTMFSounds(key);
  }

  return (
    <div className={styles.container} canDrag={1}>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputPhone} 
          value={phone}
          placeholder="Digite o telefone"
          onChange={(event) => {
            const valueOnlyNumbers = event.target.value.replace(/[^\d]/g, "");
            setPhone(valueOnlyNumbers);
          }}
        />
        {callError && <div className={styles.errorText}>{callError}</div>}
      </div>

      <div className={styles.grid}>
        <Keyboard title="1" desc="" onClick={() => { handleOnClickKeyboard("1"); }} />
        <Keyboard title="2" desc="abc" onClick={() => { handleOnClickKeyboard("2") }} />
        <Keyboard title="3" desc="def" onClick={() => { handleOnClickKeyboard("3") }} />
        <Keyboard title="4" desc="ghi" onClick={() => { handleOnClickKeyboard("4") }} />
        <Keyboard title="5" desc="jkl" onClick={() => { handleOnClickKeyboard("5") }} />
        <Keyboard title="6" desc="mno" onClick={() => { handleOnClickKeyboard("6") }} />
        <Keyboard title="7" desc="pqrs" onClick={() => { handleOnClickKeyboard("7") }} />
        <Keyboard title="8" desc="tuv" onClick={() => { handleOnClickKeyboard("8") }} />
        <Keyboard title="9" desc="wxyz" onClick={() => { handleOnClickKeyboard("9") }} />
        <Keyboard title="*" onClick={() => { handleOnClickKeyboard("*") }} />
        <Keyboard title="0" desc="+" onClick={() => { handleOnClickKeyboard("0") }} />
        <Keyboard title="#" onClick={() => { handleOnClickKeyboard("#") }} />
      </div>

      <button
        className={styles.callButton}
        onClick={() => startCall(phone, selectedToken)}
      >
        <Phone />
      </button>
    </div>
  );
}
