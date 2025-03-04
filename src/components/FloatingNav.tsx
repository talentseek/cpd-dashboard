"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import styles from "@/components/styles/FloatingNav.module.css";

const FloatingNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {["hero", "landscape", "data", "blueprint", "integration", "transformation", "cta"].map((section) => (
          <li key={section}>
            <Button
              className={styles.button}
              onClick={() => scrollTo(section)}
              aria-label={`Navigate to ${section} section`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FloatingNav;