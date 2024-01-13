"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { navBar } from "@/constants";
import BurgerImage from "@/public/Burger.svg";
import CrossImage from "@/public/Cross.svg";

import stylesVar from "@/styles/mixins.module.scss";
import styles from "./styles.module.scss";
import { useWindowSize } from "@/hooks";
import { ThemeContext } from "@/app/_context";

export function Navigation() {
  const { theme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const pathname = usePathname();
  const size = useWindowSize();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [viewIsMobile, setviewIsMobile] = useState(false);

  useEffect(() => {
    if (size.width) {
      setviewIsMobile(size.width < parseInt(stylesVar.tablet));
      if (!(size.width < parseInt(stylesVar.tablet))) {
        setIsHamburgerOpen(false);
      }
    }
  }, [viewIsMobile, size]);

  return (
    <nav className={styles.container} id={"nav"}>
      <Link
        href={"/"}
        className={cn(styles.link, styles.home, {
          [styles.current]: pathname === "/"
        })}
        onClick={() => {
          // closes menu after link click
          setMobileMenuIsOpen(false);
        }}
      >
        <h1 className={styles.title}>Ed/Wong</h1>
      </Link>
      <div
        className={cn(styles.burger, isHamburgerOpen && styles.burgerOpen)}
        onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
      >
        <i className={styles.burgerIcon}>
          <Image
            src={BurgerImage}
            width={38}
            height={21}
            alt="Burger menu icon"
          />
        </i>
        <i className={styles.cross}>
          <Image src={CrossImage} width={55} height={55} alt="Cross icon" />
        </i>
      </div>
      <div
        className={cn(
          viewIsMobile ? styles.mobile : styles.desktop,
          viewIsMobile && isHamburgerOpen ? styles.navOpen : styles.navClose
        )}
      >
        <Link
          href={"/"}
          onClick={() => setIsHamburgerOpen(false)}
          className={cn(
            styles.link,
            styles.mobileHome,
            pathname === "/" && styles.current
          )}
        >
          Home
        </Link>
        {navBar.map(({ name, link }, idx) => (
          <Link
            key={idx}
            href={link}
            onClick={() => setIsHamburgerOpen(false)}
            className={cn(
              styles.link,
              pathname.includes(link) && styles.current
            )}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
