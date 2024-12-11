"use client";

import { useState } from "react";
import classes from "./page.module.scss";

export default function Home() {
  const list = [
    { date: "2024.12.11", name: "물", status: "asdf" },
    { date: "2024.12.12", name: "라면", status: "asdf" },
  ];

  const [isFinding, setIsFinding] = useState<boolean>(false);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFinding(true);
  };

  return (
    <main>
      <h1>택배 찾기</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.inputs}>
          <label htmlFor="hakbun">학번</label>
          <input type="text" placeholder="" id="hakbun" />
          <label htmlFor="name">이름</label>
          <input type="text" placeholder="" id="name" />
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
                width="24"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            )}
            <span>찾기</span>
          </button>
        </div>
      </form>
      {list.length !== 0 && (
        <section className={classes.list}>
          <h3>1508 박시진님의 택배 리스트</h3>
          <ul className={classes.list}>
            {list.map((item, i) => (
              <li key={i}>
                <span>{item["date"]}</span>
                <span>{item["name"]}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
