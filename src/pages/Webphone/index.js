import React from "react";
import styles from "./styles.module.scss";

import { useWebphone } from "../../contexts/Webphone";

// import { Button, HStack, VStack } from "@chakra-ui/react";
// import Draggable from "react-draggable";
// import { DotsNine, DotsSix, X } from "@phosphor-icons/react";
import { ReactComponent as ArrowsLeftRight } from "../../assets/icons/ArrowsLeftRight.svg";
import { ReactComponent as Phone } from "../../assets/icons/Phone.svg";
import { ReactComponent as X } from "../../assets/icons/X.svg";

import { InProgressLayout } from "../../layouts/Webphone/InProgress";
import { AvailableLayout } from "../../layouts/Webphone/Available";
import { IncomingCallLayout } from "../../layouts/Webphone/IncomingCall";
import { QRCodeLayout } from "../../layouts/Webphone/QRCode";
// import { IncomingCallLayout } from "../../layouts/Webphone/IncomingCall";
// import { ConnectionLayout } from "../../layouts/Webphone/NoConnection";
// import { DeviceNotFound } from "../../layouts/Webphone/DeviceNotFound";
// import { ChannelsList } from "../../layouts/Webphone/ChannelsList";

import { Button } from "../../components/Button";
import { Draggable } from "../../components/Draggable";

import { ReactComponent as DotsSix } from "../../assets/icons/DotsSix.svg";
import parsePhoneNumber from "libphonenumber-js";

export const Webphone = () => {
  const { config, isOpen, setIsOpen, screenState, screensState, changeSelectedToken, selectedToken, phoneInfos } =
    useWebphone();

  return (
    <>
      <div
        className={styles.webphone_wrapper}
      >
        {isOpen && (
          <Draggable>
            <div
              className={styles.draggable}
              canDrag={1}
            >
              <div
                className={styles.header}
                canDrag={1}
              >
                <DotsSix
                  size={24}
                  color="white"
                  className="handle"
                  cursor="move"
                  canDrag={1}
                />
              </div>


              {([screensState.AVAILABLE_SCREEN, screensState.QRCODE_SCREEN].includes(screenState) && Object.keys(phoneInfos).length > 1) && (
                <div
                  className={styles.header_phone_selector}
                  canDrag={1}
                  onClick={() => {
                    changeSelectedToken()
                  }}
                >
                  <ArrowsLeftRight
                    height={17}
                    width={17}
                    canDrag={1}
                  />
                  <p>{ (parsePhoneNumber(`+${phoneInfos[selectedToken]?.phone}`)?.formatInternational() || phoneInfos[selectedToken]?.phone)  || selectedToken}</p>

                </div>
              )}

              {screenState === screensState.AVAILABLE_SCREEN && (
                <AvailableLayout />
              )}
              {screenState === screensState.CALL_SCREEN && <InProgressLayout />}
              {screenState === screensState.INCOMING_CALL_SCREEN && (
                <IncomingCallLayout />
              )}
              {screenState === screensState.QRCODE_SCREEN && <QRCodeLayout />}
              {/*
             
              {screenState === screensState.CALL_SCREEN && <InProgressLayout />}
              {screenState === screensState.QRCODE_SCREEN && <QRCodeLayoyt />}
              {screenState === screensState.NO_INTERNET && <ConnectionLayout />}
              {screenState === screensState.TOKEN_INCORRECT && (
                <DeviceNotFound />
              )} */}

            </div>
          </Draggable>
        )}
      </div>

      <div
        className={`${styles.button_float} ${styles[`button_float--${config.button.position_y === "top" ? "top" : "bottom"}`]} ${styles[`button_float--${config.button.position_x === "left" ? "left" : "right"}`]}`}
      >
        {config.button.visible && (
          <Button
            bgColor={config.button.color}
            height="60px"
            width="60px"
            borderRadius="100%"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <X height={20} width={20} color="white" />
            ) : (
              <Phone height={20} width={20} color="white" />
            )}
          </Button>
        )}
      </div>
    </>
  );
};
