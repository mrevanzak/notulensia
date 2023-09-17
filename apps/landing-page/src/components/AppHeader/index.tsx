"use client";

import Script from "next/script";
import {Container} from "../Container";

const links = [
  {
    to: "/#features",
    label: "Features",
  },
  {
    to: "/#solution",
    label: "Solution",
  },
  {
    to: "/#reviews",
    label: "Reviews",
  },
];

const uuid = (): string => {
  const hashTable = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  const arr = [] as string[];
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      arr[i] = "-";
    } else {
      arr[i] = hashTable[Math.ceil(Math.random() * hashTable.length - 1)];
    }
  }
  return arr.join("");
};

const onLoad = (): void => {
  let isToggled = false;
  const navlinks = document.querySelector("#navlinks");
  const hamburger = document.querySelector("#hamburger");
  const layer = document.querySelector("#navLayer");

  const toggleNavlinks = function (): void {
    if (isToggled) {
      navlinks?.classList.add(
        "!visible",
        "!scale-100",
        "!opacity-100",
        "!lg:translate-y-0"
      );
      hamburger?.classList.add("toggled");
      layer?.classList.add("origin-top", "scale-y-100");
    } else {
      navlinks?.classList.remove(
        "!visible",
        "!scale-100",
        "!opacity-100",
        "!lg:translate-y-0"
      );
      hamburger?.classList.remove("toggled");
      layer?.classList.remove("origin-top", "scale-y-100");
    }
  };

  hamburger?.addEventListener("click", () => {
    isToggled = !isToggled;
    toggleNavlinks();
  });

  if (navlinks) {
    const x = navlinks.querySelector("ul");
    const y: HTMLCollection | undefined = x?.children;
    const _links = [...[y]];
    _links.forEach((link) => {
      (link as unknown as Element).addEventListener("click", () => {
        isToggled = !isToggled;
        toggleNavlinks();
      });
    });
  }
};

export function AppHeader(): JSX.Element {
  return (
    <>
      <Script onLoad={onLoad} />
      <header>
        <nav className="absolute z-10 w-full border-b border-black/5 dark:border-white/5 lg:border-transparent">
          <Container>
            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 md:gap-0 md:py-4">
              <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
                <a
                  aria-label="logo"
                  className="flex items-center space-x-2"
                  href="/#home"
                >
                  <div aria-hidden="true" className="flex space-x-1">
                    <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-white" />
                    <div className="h-6 w-2 bg-primary" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    Astrolus
                  </span>
                </a>

                <div className="relative flex max-h-10 items-center lg:hidden">
                  <button
                    aria-label="humburger"
                    className="relative -mr-6 p-6"
                    id="hamburger"
                    type="button"
                  >
                    <div
                      aria-hidden="true"
                      className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"
                      id="line"
                    />
                    <div
                      aria-hidden="true"
                      className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"
                      id="line2"
                    />
                  </button>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 dark:bg-gray-900/70 lg:hidden"
                id="navLayer"
              />
              <div
                className="invisible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:visible lg:relative lg:flex lg:w-7/12 lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none"
                id="navlinks"
              >
                <div className="w-full text-gray-600 dark:text-gray-200 lg:w-auto lg:pr-4 lg:pt-0">
                  <ul className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                    {links.map((link) => (
                      <li key={uuid()}>
                        <a
                          className="hover:text-primary block transition dark:hover:text-white md:px-4"
                          href={link.to}
                        >
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        className="flex gap-2 font-semibold text-gray-700 transition hover:text-primary dark:text-white dark:hover:text-white md:px-4"
                        href="https://tailus.gumroad.com/l/astls-premium"
                        rel="noopener"
                        target="_blank"
                      >
                        <span>Premium</span>
                        <span className="flex rounded-full bg-primary/20 px-1.5 py-0.5 text-xs tracking-wider text-purple-700 dark:bg-white/10 dark:text-orange-300">
                          {" "}
                          new
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="mt-12 lg:mt-0">
                  <a
                    className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                    href="/register"
                  >
                    <span className="relative text-sm font-semibold text-white">
                      {" "}
                      Get Started
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </nav>
      </header>
    </>
  );
}
