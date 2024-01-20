"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { motion } from "framer-motion";
import { Spiral as Hamburger } from "hamburger-react";

import { navBar } from "@/constants";
import { useWindowSize } from "@/hooks";
import { ThemeContext } from "@/context";
import { ThemeToggle } from "@/components";

import stylesVar from "@/styles/mixins.module.scss";
import styles from "./styles.module.scss";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const pathname = usePathname();
  const size = useWindowSize();
  const { theme } = useContext(ThemeContext);

  const [viewIsMobile, setviewIsMobile] = useState(
    size.width < parseInt(stylesVar.tablet)
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);

    // immediately call it to see if the client has scrolled or not yet
    setScrolled(window.scrollY > 0);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setviewIsMobile(size.width < parseInt(stylesVar.tablet));
    if (!(size.width < parseInt(stylesVar.tablet))) {
      setMobileMenuIsOpen(false);
    }
  }, [viewIsMobile, size]);

  // for freezing the body
  if (typeof window !== "undefined") {
    if (mobileMenuIsOpen) {
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "unset";
      document.body.style.overflow = "unset";
    }
  }

  return (
    <div
      className={cn(styles.navBarOuter, {
        [styles.light]: theme === "light",
        [styles.dark]: theme === "dark"
      })}
    >
      <motion.nav
        className={cn(styles.navBar, {
          [styles.shadow]: scrolled || mobileMenuIsOpen
        })}
        initial={{ height: "90px", backdropFilter: "blur(10px)" }}
        animate={{
          height: mobileMenuIsOpen ? "100vh" : "90px",
          backdropFilter: mobileMenuIsOpen ? "blur(50px)" : "blur(10px)"
        }}
        transition={{
          type: "spring",
          duration: 0.5
        }}
      >
        <div className={styles.navBarInner}>
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
            <h3 className={styles.title}>Ed/Wong</h3>
          </Link>
          {viewIsMobile ? (
            <div className={styles.hamburgerContainer}>
              <Hamburger
                toggled={mobileMenuIsOpen}
                onToggle={setMobileMenuIsOpen}
                color={`${
                  theme === "light" ? "rgb(104, 104, 104)" : "rgb(255,255,255)"
                }`}
              />
            </div>
          ) : null}
          <div
            className={cn(styles.navList, {
              [styles.navListOpen]: mobileMenuIsOpen
            })}
          >
            {navBar.map(({ name, link }, idx) => (
              <Link
                key={idx}
                href={link}
                onClick={() => {
                  // closes menu after link click
                  setMobileMenuIsOpen(false);
                }}
                className={cn(styles.link, {
                  [styles.current]: pathname.startsWith(link)
                })}
              >
                {name}
              </Link>
            ))}
          </div>
          <div
            className={cn(styles.themeSwitcher, {
              [styles.navListOpen]: mobileMenuIsOpen,
              [styles.mobile]: viewIsMobile
            })}
          >
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
