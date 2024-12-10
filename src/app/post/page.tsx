"use client";

import { useState } from "react";
import classes from "./page.module.scss";

export default function Home() {
  const [isFinding, setIsFinding] = useState<boolean>(false);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFinding(true);
  };

  return (
    <main>
      <h1>택배 올리기</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.inputs}>
          <label htmlFor="hakbun">학번</label>
          <input type="text" placeholder="" id="hakbun" />
          <label htmlFor="name">이름</label>
          <input type="text" placeholder="" id="name" />
          <label htmlFor="songjang">송장번호</label>
          <input type="text" placeholder="" id="songjang" />
        </div>
        <div className={classes.submit}>
          <button className={isFinding ? classes.loading : ""}>
            {isFinding ? (
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
            <span>올리기</span>
          </button>
        </div>
      </form>
    </main>
  );
}
