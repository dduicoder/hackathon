"use client";

import { SyntheticEvent, useState } from "react";
import classes from "./page.module.scss";

export default function Home() {
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [list, setList] = useState<Array<InboxItem>>([]);
  const [name, setName] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const formData = new FormData(target);

    const datas: string[] = [];

    for (const data of formData.entries()) {
      datas.push(data[1] as string);
    }

    const [deliveryName] = datas;

    setName(deliveryName);

    setIsFirstTime(false);

    try {
      setIsLoading(true);

      const response = await fetch("/api/delivery", {
        method: "POST",
        body: JSON.stringify({ name: deliveryName }),
      });

      if (response) {
        const data = await response.json();

        setList(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h1>택배 찾기</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <label htmlFor="delivery-name">이름</label>
        <input
          type="text"
          // placeholder=""
          id="delivery-name"
          name="deliveryName"
        />
        <div className={classes.submit}>
          <button className={isLoading ? classes.loading : ""}>
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
      {!isFirstTime &&
        (list.length === 0 ? (
          <section className={classes.list}>
            <h3>{name}님의 택배 리스트가 비었어요</h3>
          </section>
        ) : (
          <section className={classes.list}>
            <h3>{name}님의 택배 리스트</h3>
            {isLoading ? (
              <div className={classes.loading}>
                <span>로딩중..</span>
              </div>
            ) : (
              <ul className={classes.list}>
                <li>
                  <span>날짜</span>
                  <div>
                    <span>품명</span>
                    <span>송장번호</span>
                  </div>
                </li>
                {list.map((item, i) => (
                  <li key={i}>
                    <span>{item.date}</span>
                    <div>
                      <span>{item.name}</span>
                      <span>{item.inv_num}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
    </main>
  );
}
