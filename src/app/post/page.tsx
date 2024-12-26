"use client";

import { useRef, useState } from "react";
import classes from "./page.module.scss";
import Webcam from "react-webcam";
import { BarcodeDetector } from "barcode-detector/pure";
import { useNotification } from "../components/notification/NotificationProvider";

export default function Home() {
  const notification = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null);

  const captureAndProcessBarcodes = async () => {
    if (!("BarcodeDetector" in window)) {
      notification({
        type: "ERROR",
        message: "이 브라우저에서는 바코드를 읽을 수 없어요",
      });
      return;
    }

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        try {
          const barcodeDetector = new BarcodeDetector({
            formats: ["code_128", "code_39", "ean_13", "qr_code"], // Add more formats if needed
          });

          const img = new Image();
          img.src = imageSrc;

          img.onload = async () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (!context) return;

            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);

            const detectedBarcodes = await barcodeDetector.detect(canvas);

            if (detectedBarcodes.length === 0) {
              notification({
                type: "ERROR",
                message: "바코드를 찾지 못했어요",
              });
              return;
            }

            const allBarcodes = detectedBarcodes.map(
              (barcode) => barcode.rawValue || ""
            );
            console.log("All detected barcodes:", allBarcodes);

            // Filter for a barcode with exactly 12 letters
            const matchingBarcode = allBarcodes.find(
              (barcode) => barcode.length === 12
            );

            if (matchingBarcode) {
              setSelectedBarcode(matchingBarcode);
            } else {
              //No barcode with exactly 12 letters found.
              notification({
                type: "ERROR",
                message: "12글자 바코드가 없어요",
              });
            }
          };
        } catch (error) {
          console.error("Error processing barcodes:", error);
          notification({
            type: "ERROR",
            message:
              "바코드를 정상적으로 처리하지 못했어요. 다시 시도해 주세요.",
          });
        }
      }
    }
  };

  const sendDataToServer = async () => {
    if (!selectedBarcode) {
      notification({
        type: "ERROR",
        message: "No barcode data to send. Please scan a barcode first!",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ barcode: selectedBarcode }),
      });

      if (response.ok) {
        notification({
          type: "SUCCESS",
          message: "택배가 성공적으로 등록했어요",
        });
      } else {
        notification({
          type: "ERROR",
          message: "택배를 등록하지 못했어요",
        });
      }
    } catch (error) {
      console.error("Error sending data:", error);
      notification({
        type: "ERROR",
        message: "데이터를 보내는 데 오류가 발생했어요",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h1>택배 등록</h1>
      <h3>택배 사진을 영역 안에 넣고 등록 버튼을 눌러주세요</h3>
      <Webcam
        className={classes.webcam}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <div className={classes.submit}>
        <button onClick={captureAndProcessBarcodes}>바코드 읽기</button>
        <button
          className={isLoading ? classes.loading : ""}
          onClick={sendDataToServer}
        >
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="24"
              height="24"
            >
              <circle
                cx="256"
                cy="256"
                r="192"
                fill="none"
                stroke="white"
                strokeWidth="48"
                strokeDasharray="301.59 301.59"
                strokeLinecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 256 256"
                  to="360 256 256"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="30"
              viewBox="0 0 640 512"
            >
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
            </svg>
          )}
          <span>등록</span>
        </button>
      </div>
      {/* {barcodes.length > 0 && (
        <>
          <h3>찾은 바코드</h3>
          <ul>
            {barcodes.map((barcode, index) => (
              <li key={index}>{barcode}</li>
            ))}
          </ul>
        </>
      )} */}
      {selectedBarcode && <h3>선택된 바코드: {selectedBarcode}</h3>}
    </main>
  );
}
