import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

import WavoipInstance from "wavoip-api";
import parsePhoneNumber from "libphonenumber-js";
import useSound from "use-sound";

import SoundCalling from "../assets/sounds/calling.mp3";
import SoundRinging from "../assets/sounds/ring.mp3";

export const WebPhone = createContext(null);

export const WebPhoneProvider = ({
  children,
  defaultConfig,
  channels,
}) => {
  const screensState = {
    AVAILABLE_SCREEN: 0,
    CALL_SCREEN: 1,
    CONNECTING_DEVICE: 2,
    QRCODE_SCREEN: 3,
    INCOMING_CALL_SCREEN: 4,
    NO_INTERNET: 5,
    TOKEN_INCORRECT: 6,
  };

  const [config, setConfig] = useState(defaultConfig);
  const [token, setToken] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [screenState, setScreenState] = useState(
    screensState.AVAILABLE_SCREEN
  );
  const [Wavoip, setWavoip] = useState(null);
  const [WavoipInstances, setWavoipIntances] = useState({});
  const [phoneInfos, setPhoneInfos] = useState({});
  const [callState, setCallState] = useState(null);
  const [callId, setCallId] = useState(null);
  const [tokenInCall, setTokenInCall] = useState(null);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null);
  const [device_status, setDeviceStatus] = useState("connecting");
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [intervalCallDuration, setIntervalCallDuration] = useState();
  const [intervalTerminating, setIntervalTerminating] = useState();
  const [qrCode, setQRCode] = useState("");
  const [callError, setCallError] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [callStatus, setCallStatus] = useState("");
  const [selectedToken, setSelectedToken] = useState(null);

  const [playPhoneCalling, { stop: stopPhoneCalling }] = useSound(
    SoundCalling,
    { volume: 0.4, loop: true }
  );
  const [playPhoneRinging, { stop: stopPhoneRinging }] = useSound(
    SoundRinging,
    { volume: 1.0, loop: true }
  );

  const duration = () => {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    const formatTime = (num) => (num < 10 ? `0${num}` : num);

    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  };

  useEffect(() => {
    console.log("aqui")

    const callStatus = () => {
      switch (callState) {
        case "offer":
          playPhoneRinging();
          setIsOpen(true);
  
          return "Chamando...";
        case "call-start":
          playPhoneCalling();
  
          return "Ligando...";
        case "relaylatency":
        case "preaccept":
          return "Chamando...";
        case "mute_v2":
        case "accept":
          stopPhoneRinging();
          stopPhoneCalling();
  
          return `${duration()}`;
        case "accept_elsewhere":
          stopPhoneRinging();
  
          return "Aceito por outro usuário";
        case "reject_elsewhere":
          stopPhoneRinging();
  
          return "Rejeitado por outro usuário";
        case "reject":
          stopPhoneRinging();
          stopPhoneCalling();
  
          return "Chamada rejeitada";
        case "terminate":
          stopPhoneRinging();
          stopPhoneCalling();
  
          return "Chamada finalizada";
        default:
          return "Status não identificado";
      }
    };

    setCallStatus(callStatus());
  }, [callState, durationSeconds]);

  const resetStates = () => {
    setIsMuted(false);
    setCallState("");
    setProfilePictureURL("");

    setDurationSeconds(0);
    clearInterval(intervalCallDuration);

    setTokenInCall(null);
    setCallId(null);
  };

  const getCurrentQRCode = () => {
    Wavoip.getCurrentQRCode().then((qrcode) => {
      setQRCode(qrcode);
    });
  };

  const getCurrentDeviceStatus = () => {
    Wavoip.getCurrentDeviceStatus().then((status) => {
      setDeviceStatus(status);
    });
  };

  const startDevice = async (token, canAcceptCall) => {
    try {
      setToken(token);
      if(!selectedToken) {
        setSelectedToken(token);
      }

      const Device = new WavoipInstance();
      const WhatsappInstance = await Device.connect(token);

      // WhatsappInstance?.socket?.on('connect', () => {
      // });

      // WhatsappInstance.socket.io.on("error", () => {
      //   setScreenState(screensState.NO_INTERNET);
      // });

      setWavoip(WhatsappInstance);

      let newWavoipInstances = WavoipInstances
      newWavoipInstances[token] = {
        instance: WhatsappInstance,
        canAcceptCall: canAcceptCall
      };
      setWavoipIntances({
        ...newWavoipInstances
      });
    } catch (error) {
      console.error("[*] - Error to start webphone", error);
    }
  };

  const startCall = async (phone, token = null) => {
    try {
      let tokens = Object.entries(WavoipInstances);
      console.log(tokens, "tokens")

      if(config.call.fallback) {
        if(token) {
          tokens = tokens.sort((a, b) => {
            if (a[0] === token) return -1;
            if (b[0] === token) return 1;
            return 0;
          });
        }
      } else {
        if(!token) {
          setCallError("Linha não específicada");
        }

        tokens = [token]
      }

      let phoneParsed =
      parsePhoneNumber(`+${phone}`)?.formatInternational() || phone;
      setPhone(phone);
      setName(phoneParsed);

      let error = [];

      for(let [current_token, wavoip] of tokens) {
        let isCalling = await wavoip?.instance.callStart({
          whatsappid: phone,
        })
          .then((response) => {
            if (response.type === "success") {
              error = [];
              setCallState("call-start");
              setCallId(response?.result?.call_id);
              setTokenInCall(current_token);
              setScreenState(screensState.CALL_SCREEN);
              setProfilePictureURL(response?.result?.profile_picture);

              return true;
            } else {
              error.push(response?.result);
              console.error("error call", current_token, response);
            }
          })
          .catch((response) => {
            console.error("error call", current_token, response);
            error.push(response?.result);
          });

        if(isCalling) {
          break;
        }
      }

      // setCallError(response?.result);
    } catch (error) {
      console.error("[*] - Error to start call", error);
    }
  };

  const mute = async () => {
    try {
      let wavoip = WavoipInstances[tokenInCall]?.instance;

      let response = await wavoip.mute();
      setIsMuted(true);

      return response;
    } catch (error) {
      console.error("[*] - Error to mute", error);
    }
  };

  const unMute = async () => {
    try {
      let wavoip = WavoipInstances[tokenInCall]?.instance;

      let response = await wavoip.unMute();
      setIsMuted(false);

      return response;
    } catch (error) {
      console.error("[*] - Error to unmute", error);
    }
  };

  const endCall = async () => {
    try {
      let wavoip = WavoipInstances[tokenInCall]?.instance;
      let response = await wavoip.endCall();

      return response;
    } catch (error) {
      console.error("[*] - Error to end call", error);
    }
  };

  const acceptCall = async () => {
    try {
      let wavoip = WavoipInstances[tokenInCall]?.instance;
      let response = await wavoip.acceptCall();

      // let response = await Wavoip.acceptCall();

      setCallState("accept");
      setScreenState(screensState.CALL_SCREEN);

      return response;
    } catch (error) {
      console.error("[*] - Error to accept call", error);
    }
  };

  const rejectCall = async () => {
    try {
      let wavoip = WavoipInstances[tokenInCall]?.instance;
      let response = await wavoip.rejectCall();

      stopPhoneRinging();
      setScreenState(screensState.AVAILABLE_SCREEN);
      resetStates();

      return response;
    } catch (error) {
      console.error("[*] - Error to reject call", error);
    }
  };

  const changeSelectedToken = () => {
    const tokens = Object.keys(phoneInfos);

    const currentIndex = tokens.findIndex((token) => token == selectedToken);
    const nextToken = currentIndex + 1;

    if(nextToken < tokens.length) {
      setSelectedToken(tokens[nextToken]);
    }
    else {
      setSelectedToken(tokens[0]);
    }
  }

  useEffect(() => {
    console.log("aqui")
    let tokens = Object.entries(WavoipInstances);

    for(let [current_token, wavoip] of tokens) {
      if (wavoip.instance) {
        wavoip.instance.socket.off("signaling");
        wavoip.instance.socket.off("device_status");
        wavoip.instance.socket.off("qrcode");
  
        wavoip.instance.socket.on("signaling", (...args) => {
          if(tokenInCall) {
            if(current_token != tokenInCall) {
              return;
            }
          }
          
          const data = args[0];

          if (data?.tag === "offer") {
            if(callId) {
              return;
            }
       
            setCallId("incoming");
            setTokenInCall(current_token);
          
            const phone = data?.content?.from_tag;
            const profile_picture = data?.content?.profile_picture;
            let phoneParsed =
              parsePhoneNumber(`+${phone}`)?.formatInternational() || phone;
  
            setPhone(phone);
            setName(phoneParsed);
            setProfilePictureURL(profile_picture);
          }
  
          setCallState(data?.tag);
        });

        wavoip.instance.socket.on("device_status", (data) => {
          if(selectedToken === current_token) {
            setDeviceStatus(data);
          }
        });

        wavoip.instance.socket.on("qrcode", (data) => {
          if(selectedToken === current_token) {
            setQRCode(data);
          }
        });

        wavoip.instance.getAllInfo()
          .then((response) => {

            console.log(response, current_token);
            setPhoneInfos((oldPhoneInfos) => (
              {
                ...oldPhoneInfos,
                [`${current_token}`]: {
                  ...response?.result || {}
                }
              }
            ))
          })
          .catch((response) => {
            console.error(response, "getAllInfo error");
          });
          
        getCurrentQRCode();
        getCurrentDeviceStatus();
      }
    }
  }, [WavoipInstances, callId, tokenInCall, selectedToken]);

  useEffect(() => {
    console.log("aqui")

    clearInterval(intervalTerminating);

    switch (callState) {
      case "offer":
        setScreenState(screensState.INCOMING_CALL_SCREEN);

        break;
      case "accept_elsewhere":
        if (screenState == screensState.INCOMING_CALL_SCREEN) {
          let intervalAcceptElseWhere = setTimeout(() => {
            setScreenState(screensState.AVAILABLE_SCREEN);
            resetStates();
          }, 2000);

          setIntervalTerminating(intervalAcceptElseWhere);
        }

        break;
      case "reject_elsewhere":
        if (screenState == screensState.INCOMING_CALL_SCREEN) {
          let intervalRejectElseWhere = setTimeout(() => {
            setScreenState(screensState.AVAILABLE_SCREEN);
            resetStates();
          }, 2000);

          setIntervalTerminating(intervalRejectElseWhere);
        }

        break;

        break;
      case "terminate":
        let intervalTerminate = setTimeout(() => {
          setScreenState(screensState.AVAILABLE_SCREEN);
          resetStates();
        }, 2500);

        setIntervalTerminating(intervalTerminate);

        clearInterval(intervalCallDuration);

        break;
      case "reject":
        let intervalReject = setTimeout(() => {
          setScreenState(screensState.AVAILABLE_SCREEN);
          resetStates();
        }, 2500);

        setIntervalTerminating(intervalReject);

        clearInterval(intervalCallDuration);

        break;
      case "relaylatency":
      case "preaccept":
        break;
      case "accept":
        setDurationSeconds(0);

        const intervalId = setInterval(() => {
          setDurationSeconds((seconds) => seconds + 1);
        }, 1000);

        setIntervalCallDuration(intervalId);

        break;
    }
  }, [callState]);

  useEffect(() => {
    if (device_status === "connecting") {
      setScreenState(screensState.QRCODE_SCREEN);
    } else if (device_status === "open") {
      setScreenState(screensState.AVAILABLE_SCREEN);
    }
  }, [device_status]);

  useEffect(() => {
    console.log("aqui")
    let status = phoneInfos[selectedToken]?.status;

    if (status === "connecting") {
      setScreenState(screensState.QRCODE_SCREEN);
    } else if (status === "open") {
      setScreenState(screensState.AVAILABLE_SCREEN);
    }
  }, [selectedToken]);

  useEffect(() => {
    console.log("aqui")

    window.wavoip_webphone = {
      startDevice: startDevice,
      startCall: startCall,
      mute: mute,
      unMute: unMute,
      endCall: endCall,
      acceptCall: acceptCall,
      rejectCall: rejectCall,
      setIsOpen: (is_open) => {
        setIsOpen(is_open);

        return is_open;
      },
      setConfig: (config) => {
        setConfig({
          ...defaultConfig,
          ...config,
        });
      },
    };
  }, [
    startDevice,
    startCall,
    mute,
    unMute,
    endCall,
    acceptCall,
    setIsOpen,
    setConfig,
  ]);

  useEffect(() => {
    console.log("aqui")

    channels.forEach((channel) => {
      if(!WavoipInstances[channel.token]) {
        startDevice(channel.token);
      }
    });

    let activeTokens = Object.keys(WavoipInstances);

    activeTokens.forEach((active_token) => {
      if(!channels.includes(active_token)) {
        let calldisconect = WavoipInstances[active_token]?.instance?.socket?.disconnect();

        let newWavoipInstances = WavoipInstances;
        delete newWavoipInstances[active_token];

        setWavoipIntances({
          ...newWavoipInstances
        });
      }
    })
    
  }, [channels]);

  return (
    <WebPhone.Provider
      value={{
        token,
        config,
        isOpen,
        setIsOpen,
        screensState,
        screenState,
        setScreenState,
        duration,
        callState,
        startCall,
        acceptCall,
        rejectCall,
        endCall,
        mute,
        unMute,
        phone,
        name,
        callStatus,
        qrCode,
        callError,
        isMuted,
        profilePictureURL,
        phoneInfos,
        selectedToken,
        changeSelectedToken
      }}
    >
      {children}
    </WebPhone.Provider>
  );
};

export const useWebphone = () => {
  const content = useContext(WebPhone);

  if (!content) {
    throw new Error("Trying to use useCall but don't have a WebPhoneProvider");
  }

  return content;
};
