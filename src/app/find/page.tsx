"use client";

import { SyntheticEvent, useState } from "react";
import classes from "./page.module.scss";

function getDaysElapsed(inputDate: string): number {
  const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (!dateRegex.test(inputDate)) {
    throw new Error(
      "Invalid date format. Expected format: yyyy-mm-dd hh:mm:ss"
    );
  }

  const [datePart, timePart] = inputDate.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  const inputDateTime = new Date(year, month - 1, day, hours, minutes, seconds);

  const now = new Date();

  const diffInMillis = now.getTime() - inputDateTime.getTime();

  const daysElapsed = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));

  return daysElapsed;
}

const getDeliveryDanger = (daysElapsed: number): string => {
  if (daysElapsed < 3) {
    return "safe";
  }

  if (daysElapsed < 7) {
    return "warning";
  }

  return "danger";
};

const FindPage = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [list, setList] = useState<Array<InboxItem>>([]);
  const [name, setName] = useState<string>("");
  const [dotNumbers, setDotNumbers] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const formData = new FormData(target);

    const datas: string[] = [];

    for (const data of formData.entries()) {
      datas.push(data[1] as string);
    }

    const deliveryName = datas[0].trim();

    setName(deliveryName);

    if (isFirstTime) {
      setIsFirstTime(false);
    }

    const intervalId = setInterval(() => {
      setDotNumbers((prev) => (prev + 1) % 4);
    }, 500);

    setIsLoading(true);

    try {
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
      clearInterval(intervalId);
      setDotNumbers(3);
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h1>택배 찾기</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <label htmlFor="delivery-name">이름</label>
        <input type="text" id="delivery-name" name="deliveryName" />
        <div className={classes.submit}>
          <button className={isLoading ? classes.loading : ""}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="24"
              height="24"
            >
              {isLoading ? (
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
              ) : (
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              )}
            </svg>
            <span>찾기</span>
          </button>
        </div>
      </form>
      {!isFirstTime && (
        <section className={classes.list}>
          <h3>
            {name}님의 택배 리스트
            {!isLoading && list.length === 0 && "가 비었어요"}
          </h3>
          {isLoading ? (
            <div className={classes.loading}>
              <span>
                {name}님의 택배 리스트를 찾는 중{".".repeat(dotNumbers)}
              </span>
            </div>
          ) : (
            list.length !== 0 && (
              <table>
                <thead>
                  <tr>
                    <th>송장번호</th>
                    <th>품명</th>
                    <th>지난 시간(일)</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, i) => (
                    <tr key={i}>
                      <td>{item.invoice}</td>
                      <td>{item.item}</td>
                      {/* <td>{item.date}</td> */}
                      <td
                        className={
                          classes[getDeliveryDanger(getDaysElapsed(item.date))]
                        }
                      >
                        {getDaysElapsed(item.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </section>
      )}
      <p className={classes.notify}>7일이 지난 택배는 자동으로 폐기됩니다.</p>
    </main>
  );
};

export default FindPage;
