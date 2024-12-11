"use client";

import { useState } from "react";
import classes from "./page.module.scss";
import FindForm from "../components/find/FindForm";

export default function Home() {
  const [list, setList] = useState<Array<DeliveryType>>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch("/api/delivery", {
        headers: {
          Accept: "application/json",
          method: "POST",
        },
        method: "POST",
        body: JSON.stringify({ number: "1508" }),
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
      <FindForm isLoading={isLoading} submitHandler={submitHandler} />
      {list.length !== 0 && (
        <section className={classes.list}>
          <h3>1508 박시진님의 택배 리스트</h3>
          <ul className={classes.list}>
            {list.map((item, i) => (
              <li key={i}>
                <span>{item.date}</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
