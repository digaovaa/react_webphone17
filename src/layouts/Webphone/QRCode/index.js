import React from "react";
import { QRCodeCanvas as QRCode } from "qrcode.react";
import { useWebphone } from "../../../contexts/Webphone";
import styles from "./styles.module.scss";

export const QRCodeLayout = () => {
  const { qrCode } = useWebphone();

  return (
    <div className={styles.container} canDrag={1}>
      <div className={styles.qrCodeBox} canDrag={1}>
        {qrCode ? (
          <QRCode
            value={qrCode}
            renderAs="canvas"
            includeMargin={true}
            imageSettings={{
              src: "./whatsapp.png",
              height: 50,
              width: 50,
              excavate: false,
            }}
          />
        ) : (
          <div className={styles.spinnerBox} canDrag={1}>
            <div className={styles.spinner} canDrag={1}></div>
          </div>
        )}
      </div>
      <p className={styles.title} canDrag={1}>Conectar Whatsapp</p>

      <ol className={styles.instructions} canDrag={1}>
        <li canDrag={1}>Abra o WhatsApp no seu celular.</li>
        <li canDrag={1}>Toque em Mais opções ou Configurações e selecione aparelhos conectados.</li>
        <li canDrag={1}>Toque em conectar um aparelho.</li>
        <li canDrag={1}>Aponte o celular para essa tela para capturar o QRcode.</li>
      </ol>
    </div>
  );
};
