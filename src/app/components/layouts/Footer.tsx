import { FC } from "react";

import Link from "next/dist/client/link";

import classes from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.control}>
        <div>
          <span>Front End</span>
          <span>1508 박시진</span>
          <span>+82 10 3314 6432</span>
          <span>gbs.s240088@ggh.goe.go.kr</span>
        </div>
        <div>
          <span>Back End</span>
          <span>1510 박현</span>
          <span>+82 10 9320 4044</span>
          <span>gbs.s240090@ggh.goe.go.kr</span>
        </div>
        <div>
          <span>About</span>
          <span>2024 경기북과학고등학교 창의소프트웨어 해커톤</span>
        </div>
      </div>
      <p>
        Copyright 2024. All rights reserved by Sijin Park And Hyun Park of SADA.
      </p>
    </footer>
  );
};

export default Footer;
