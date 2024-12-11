"use client";

import { FC } from "react";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import Link from "next/link";

import classes from "./Header.module.scss";
// import Image from "next/image";

const Header: FC = () => {
  const pathname = usePathname();

  const getAnchorClassName = (link: string) => {
    return pathname!.startsWith(`/${link}`) ? classes.active : "";
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        {/* <Image src="/logo.png" width="32" height="32" alt="" /> */}
        <span>북곽택배</span>
      </Link>
      <nav className={classes.nav}>
        <Link legacyBehavior href="/find">
          <a className={getAnchorClassName("find")}>택배 찾기</a>
        </Link>
        <Link legacyBehavior href="/post">
          <a className={getAnchorClassName("post")}>택배 등록</a>
        </Link>
        <Link legacyBehavior href="/ranking">
          <a className={getAnchorClassName("ranking")}>랭킹</a>
        </Link>
        <Link legacyBehavior href="/moniter">
          <a className={getAnchorClassName("moniter")}>모니터링</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
