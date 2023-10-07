"use client";
import type {ReactElement, ReactNode} from "react";
import React, {useRef} from "react";
import {Button} from "primereact/button";
import {StyleClass} from "primereact/styleclass";

export default function LandingPage(): ReactElement {
  const homeRef = useRef<null | (HTMLElement & ReactNode)>(null);
  const homeButtonRef = useRef<null | (HTMLAnchorElement & ReactNode)>(null);
  const pricingButtonRef = useRef<null | (HTMLAnchorElement & ReactNode)>(null);

  const featuresRef = useRef<null | (HTMLDivElement & ReactNode)>(null);
  const featuresButtonRef = useRef<null | (HTMLAnchorElement & ReactNode)>(
    null
  );
  const pricingRef = useRef<null | (HTMLDivElement & ReactNode)>(null);

  const eventsRef = useRef<null | (HTMLDivElement & ReactNode)>(null);
  const eventsButtonRef = useRef<null | (HTMLAnchorElement & ReactNode)>(null);
  const videoRef = useRef<null | (HTMLDivElement & ReactNode)>(null);
  const videoButtonRef = useRef<null | (HTMLAnchorElement & ReactNode)>(null);

  const scrollToElement = (
    el: React.RefObject<null | (HTMLElement & ReactNode)>
  ): void => {
    setTimeout(() => {
      el.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }, 200);
  };

  return (
    <div>
      <div
        className="bg-cover bg-no-repeat bg-bottom py-6 px-3 md:px-6 relative"
        style={{background: "url(/layout/images/landing/landing-main.jpg)"}}
      >
        <div
          className="w-full h-full absolute z-0"
          style={{
            background:
              "linear-gradient(0deg, var(--primary-600), var(--primary-400))",
            opacity: "0.6",
            top: "0",
            left: "0",
          }}
        />
        <div
          className="my-0 mx-auto w-full z-2 relative"
          style={{maxWidth: "1200px"}}
        >
          <div className="flex flex-column gap-5 lg:flex-row justify-content-between">
            <div className="flex justify-content-center lg:justify-content-start align-items-center gap-4">
              <ul className="list-none flex gap-6 p-0 m-0">
                <StyleClass
                  enterClassName="hidden"
                  leaveToClassName="hidden"
                  nodeRef={homeButtonRef}
                  selector="#menu"
                >
                  <a
                    className="text-white cursor-pointer transition-duration-200 hover:text-primary-100"
                    href="#home"
                    onClick={() => {
                      scrollToElement(homeRef);
                    }}
                    ref={homeButtonRef}
                  >
                    <span>Home</span>
                  </a>
                </StyleClass>
                <StyleClass
                  enterClassName="hidden"
                  leaveToClassName="hidden"
                  nodeRef={featuresButtonRef}
                  selector="#menu"
                >
                  <a
                    className="text-white cursor-pointer transition-duration-200 hover:text-primary-100"
                    href="#home"
                    onClick={() => {
                      scrollToElement(featuresRef);
                    }}
                    ref={featuresButtonRef}
                  >
                    <span>Features</span>
                  </a>
                </StyleClass>
                <StyleClass
                  enterClassName="hidden"
                  leaveToClassName="hidden"
                  nodeRef={eventsButtonRef}
                  selector="#menu"
                >
                  <a
                    className="text-white cursor-pointer transition-duration-200 hover:text-primary-100"
                    href="#home"
                    onClick={() => {
                      scrollToElement(eventsRef);
                    }}
                    ref={eventsButtonRef}
                  >
                    <span>Events</span>
                  </a>
                </StyleClass>
                <StyleClass
                  enterClassName="hidden"
                  leaveToClassName="hidden"
                  nodeRef={pricingButtonRef}
                  selector="#menu"
                >
                  <a
                    className="text-white cursor-pointer transition-duration-200 hover:text-primary-100"
                    href="#home"
                    onClick={() => {
                      scrollToElement(pricingRef);
                    }}
                    ref={pricingButtonRef}
                  >
                    <span>Pricing</span>
                  </a>
                </StyleClass>
                <StyleClass
                  enterClassName="hidden"
                  leaveToClassName="hidden"
                  nodeRef={videoButtonRef}
                  selector="#menu"
                >
                  <a
                    className="text-white cursor-pointer transition-duration-200 hover:text-primary-100"
                    href="#home"
                    onClick={() => {
                      scrollToElement(videoRef);
                    }}
                    ref={videoButtonRef}
                  >
                    <span>Video</span>
                  </a>
                </StyleClass>
              </ul>
            </div>
            <div className="flex justify-content-center lg:justify-content-end align-items-center gap-3">
              <Button
                className="w-8rem  text-white hover:text-gray-700 transition-duration-200 hover:bg-white"
                label="Login"
                outlined
              />
              <Button
                className="w-8rem  text-white hover:text-gray-700 transition-duration-200 hover:bg-white"
                label="Register"
                outlined
              />
            </div>
          </div>
          <div className="flex flex-column align-items-center gap-5 mt-6 pt-0">
            <svg
              height="86"
              viewBox="0 0 86 86"
              width="86"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <linearGradient
                  id="b"
                  x1="50%"
                  x2="50%"
                  y1="-66.708%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="var(--primary-400)" />
                  <stop offset="100%" stopColor="var(--primary-700)" />
                </linearGradient>
                <circle cx="43" cy="43" id="f" r="43" />
                <path
                  d="M66.29 12.931L56.14 0 43.17 10.353l-8.939-8.036-8.955 9.04-5.233-1.237L3.49 29.463H0v14.333h86.796V29.463h-2.49L69.427 11.97l-3.136.961z"
                  id="d"
                />
              </defs>
              <g fill="none" fillRule="evenodd">
                <mask fill="#fff" id="c">
                  <use xlinkHref="#f" />
                </mask>
                <use fill="url(#b)" xlinkHref="#f" />
                <g fill="#FFF" fillRule="nonzero" mask="url(#c)">
                  <path d="M42.638 69.342c.352.001.68-.18.866-.478l4.075-6.528c.101-.163.155-.35.155-.542l-.073-36.195 4.088.008a1.018 1.018 0 0 0 1.02-1.02l-.006-3.065a1.026 1.026 0 0 0-1.024-1.024l-6.133-.013-.022-11.604A4.052 4.052 0 0 0 46.6 6.18a4.081 4.081 0 0 0-1.203-2.893 4.081 4.081 0 0 0-2.893-1.204 4.045 4.045 0 0 0-2.889 1.191 4.045 4.045 0 0 0-1.191 2.89 4.084 4.084 0 0 0 1.027 2.701l.013 6.498.001.001.008 4.087.001 1.02-6.132-.01a1.018 1.018 0 0 0-1.02 1.02l.007 3.065c0 .565.46 1.024 1.024 1.024l4.088.01.072 36.194c0 .19.055.38.157.542l4.102 6.543c.186.301.515.482.866.483zm-1.13-53.552l2.04-2.04.003 1.198-2.04 2.04-.002-1.198zm1.012-5.53c.35 0 .693-.043 1.022-.127l.001.727-2.04 2.04-.005-2.772c.327.085.67.13 1.022.132zm-2.052-4.092a2.022 2.022 0 0 1 .596-1.445 2.023 2.023 0 0 1 1.444-.595c.545 0 1.06.214 1.447.6.387.388.599.901.6 1.447.002.546-.21 1.06-.595 1.444a2.022 2.022 0 0 1-1.444.596 2.054 2.054 0 0 1-2.048-2.047zm1.05 13.711l2.04-2.04.005 2.643-2.045-.005v-.598zm-7.15 2.627l6.133.013 10.22.02.002 1.023-4.088-.009-8.176-.016-4.089-.009-.002-1.022zm5.188 38.979l-.072-35.902 2.045.005.05 25.161c.001.564.46 1.022 1.023 1.024.566 0 1.023-.457 1.021-1.02l-.05-25.162 2.043.004.072 35.903-3.056 4.895-3.076-4.908z" />
                  <path d="M43.237 6.896a1.022 1.022 0 0 0-.004-1.446c-.4-.4-1.047-.402-1.445-.003a1.023 1.023 0 0 0 .003 1.446c.4.4 1.047.401 1.446.003z" />
                </g>
                <g mask="url(#c)">
                  <g transform="translate(-.796 44.687)">
                    <mask fill="#fff" id="e">
                      <use xlinkHref="#d" />
                    </mask>
                    <use fill="#FFF" xlinkHref="#d" />
                    <path
                      d="M49.358 5.645L52.5 8.078l2.59-2.115 2.186 1.642 1.857-1.642 2.453.613-5.156-6.609zM25.496 11.277l4.572-1.625 2.616 2.788 3.203-2.97 2.98 1.964L41.58 8.62l-7.082-6.393z"
                      fill="#F1E1E6"
                      mask="url(#e)"
                    />
                  </g>
                </g>
              </g>
            </svg>

            <span className="text-white text-4xl">
              PrimeReact Presents Avalon
            </span>
            <span className="text-white text-2xl text-center line-height-3">
              Minimal and elegant responsive application template with a premium
              look for PrimeReact components.
            </span>
            <Button className="w-12rem" label="Learn More" size="small" />
          </div>
        </div>
      </div>

      <div
        className="flex justify-content-center py-6 px-3 lg:px-6 w-full"
        id="features"
        ref={featuresRef}
      >
        <div
          className="grid justify-content-center w-full"
          style={{maxWidth: "1200px"}}
        >
          <div className="col-12 md:col-6 lg:col-3">
            <div className="relative h-4rem">
              <svg
                className="absolute bottom-0 h-3rem"
                viewBox="0 0 72 32"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <linearGradient
                    id="a"
                    x1="1.048%"
                    x2="99.408%"
                    y1="50%"
                    y2="50%"
                  >
                    <stop offset="0%" stopColor="var(--primary-400)" />
                    <stop offset="100%" stopColor="var(--primary-700)" />
                  </linearGradient>
                </defs>
                <g
                  fill="url(#a)"
                  fillRule="nonzero"
                  transform="translate(-146 -634)"
                >
                  <path
                    d="M178.8 665.2c0 .48.32.8.8.8h28v-1.6h-28c-.48 0-.8.32-.8.8zM160.72 646h-14c-.4 0-.72.32-.72.64v18.72c0 .32.32.64.72.64h13.76c.4 0 .72-.32.72-.64v-18.88c0-.32-.24-.48-.48-.48zM217.2 650h-8c-.48 0-.8.32-.8.8v14.4c0 .48.32.8.8.8h8c.48 0 .8-.32.8-.8v-14.4c0-.48-.32-.8-.8-.8z"
                    stroke="var(--surface-border)"
                  />
                  <path
                    d="M172.8 659.6h7.6V642c0-.48.32-.8.8-.8h7.2v-5.6c0-.88-.72-1.6-1.6-1.6h-31.2c-.88 0-1.6.72-1.6 1.6v9.6h7.2c.48 0 .8.32.8.8v13.6h9.2v4.8H166c-.48 0-.8.32-.8.8 0 .48.32.8.8.8h12v-1.6h-5.2v-4.8z"
                    stroke="var(--surface-border)"
                  />
                  <path
                    d="M212.4 649.2v-6.4c0-.48-.32-.8-.8-.8H182c-.48 0-.8.32-.8.8v20c0 .48.32.8.8.8h25.6v-14.4h4.8z"
                    stroke="var(--surface-border)"
                  />
                </g>
              </svg>
            </div>
            <h3 className="text-2xl font-medium">Responsive Layout</h3>
            <p className="text-base m-0 mt-2 text-color">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt dolor magna aliqua.
            </p>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="relative h-4rem">
              <svg
                className="absolute bottom-0 h-3rem"
                viewBox="0 0 43 43"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="a"
                    x1="1.048%"
                    x2="99.408%"
                    y1="50%"
                    y2="50%"
                  >
                    <stop offset="0%" stopColor="var(--primary-400)" />
                    <stop offset="100%" stopColor="var(--primary-600)" />
                  </linearGradient>
                </defs>
                <path
                  d="M43 43l-2.702-15.695-7.094-7.093 9.42-9.418L32.19.361l-9.42 9.418-7.725-7.728S9.811-3.18 3.563 3.067l-.5.5c-6.249 6.247-1.001 11.479-1.001 11.479l7.71 7.727L.35 32.191l10.436 10.434 9.42-9.418 7.074 7.077L43 43zm-13.893-9.958l2.777-.245a1 1 0 0 0 .9-.85l.415-2.802 4.503.055.83 4.827-4.502 4.501-5.038-.855.115-4.631zm3.427-5.902L14.4 8.989l1.77-1.771 19.957 19.967-3.592-.045zm-19.55-16.72l18.26 18.255-.326 2.196-2.426.215-18.08-18.096 2.571-2.57zM36.44 38.928l2.502-2.501.555 3.07-3.057-.57zm-9.91-30.08l2.271 2.27 1.416-1.415-2.276-2.27 4.247-4.247 7.604 7.602-8.004 8.003.855.855-8.46-8.453 2.347-2.345zM5.589 5.092c2.887-2.886 5.603-2.68 7.45-1l1.72 1.72-8.955 8.954c-2.902-3.001-2.651-3.026-2.857-4.002-.495-2.326 1.126-4.156 2.642-5.672zm1.616 11.109l1.776-1.796 18.14 18.121-.09 3.472C16.345 25.304 10.481 19.492 7.205 16.2zm3.582 23.593L3.183 32.19l4.247-4.246 2.271 2.27 1.416-1.415-2.271-2.27 2.346-2.346 7.604 7.602-8.01 8.008z"
                  fill="url(#a)"
                  fillRule="nonzero"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-medium">Modern Design</h3>
            <p className="text-base m-0 mt-2 text-color">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="relative h-4rem">
              <svg
                className="absolute bottom-0 h-3rem"
                viewBox="0 0 35 44"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="a"
                    x1="1.048%"
                    x2="99.408%"
                    y1="50%"
                    y2="50%"
                  >
                    <stop offset="0%" stopColor="var(--primary-400)" />
                    <stop offset="100%" stopColor="var(--primary-600)" />
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="nonzero">
                  <path
                    d="M34.9 38.7c0 2.8-2.3 5.1-5.1 5.1H5.1c-2.8 0-5.1-2.3-5.1-5.1V5.2C0 2.4 2.3.1 5.1.1h17.3l.6.2c.2.1.3.2.4.3l10.9 11.1c.2.2.3.4.4.7v.2l.1.5v25.6h.1z"
                    fill="url(#a)"
                    stroke="var(--surface-ground)"
                  />
                  <path
                    d="M8.8 20.3h17.4v2.8H8.8zM8.8 33.2h9.4V36H8.8zM8.8 26.6h17.4v2.8H8.8zM23.6 10.3c0 .8.6 1.4 1.4 1.4h4.3L23.6 6v4.3z"
                    fill="var(--surface-ground)"
                  />
                </g>
              </svg>
            </div>
            <h3 className="text-2xl font-medium">Well Documented</h3>
            <p className="text-base m-0 mt-2 text-color">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="relative h-4rem">
              <svg
                className="absolute bottom-0 h-3rem"
                viewBox="0 0 50 34"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="a"
                    x1="1.048%"
                    x2="99.408%"
                    y1="50%"
                    y2="50%"
                  >
                    <stop offset="0%" stopColor="var(--primary-400)" />
                    <stop offset="100%" stopColor="var(--primary-600)" />
                  </linearGradient>
                </defs>
                <path
                  d="M29.1.001a2.786 2.786 0 0 0-2.603 2.056l-8.33 28.295a2.875 2.875 0 0 0 .646 2.762 2.75 2.75 0 0 0 2.671.807 2.806 2.806 0 0 0 2.02-1.956l8.329-28.294a2.873 2.873 0 0 0-.44-2.552A2.758 2.758 0 0 0 29.099 0zM13.937 3.538a2.75 2.75 0 0 0-1.952.796L.88 14.944A2.855 2.855 0 0 0 0 17.011c0 .784.319 1.532.88 2.067l11.106 10.61a2.747 2.747 0 0 0 2.71.652 2.817 2.817 0 0 0 1.91-2.067 2.873 2.873 0 0 0-.803-2.718l-8.936-8.533 8.936-8.554a2.867 2.867 0 0 0 .73-3.118 2.778 2.778 0 0 0-2.595-1.812zm22.037 0a2.781 2.781 0 0 0-2.524 1.852 2.866 2.866 0 0 0 .746 3.078l8.936 8.554-8.936 8.533a2.873 2.873 0 0 0-.802 2.718 2.817 2.817 0 0 0 1.908 2.067 2.747 2.747 0 0 0 2.711-.651l11.106-10.61c.561-.536.88-1.284.88-2.068 0-.783-.319-1.532-.88-2.067L38.014 4.334a2.748 2.748 0 0 0-2.039-.796z"
                  fill="url(#a)"
                  fillRule="nonzero"
                  stroke="var(--surface-ground)"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-medium">Clean Code</h3>
            <p className="text-base m-0 mt-2 text-color">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>

      <div
        className="surface-ground relative overflow-hidden lg:h-28rem"
        style={{height: "600px"}}
      >
        <div
          className="my-0 mx-auto pt-6 w-full pl-5 lg:pl-6 xl:pl-0 z-1 relative"
          style={{maxWidth: "1200px"}}
        >
          <svg
            className="mb-3 w-6rem"
            viewBox="0 0 92 92"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <rect
                height="56.075"
                id="g"
                rx="4"
                width="56.075"
                x="11.613"
                y="11.613"
              />
              <filter
                filterUnits="objectBoundingBox"
                height="142.8%"
                id="a"
                width="142.8%"
                x="-21.4%"
                y="-21.4%"
              >
                <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur
                  in="shadowOffsetOuter1"
                  result="shadowBlurOuter1"
                  stdDeviation="4"
                />
                <feColorMatrix
                  in="shadowBlurOuter1"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
              </filter>
            </defs>
            <g fill="none" fillRule="evenodd">
              <g transform="rotate(45 35.408 49.893)">
                <use
                  fill="var(--primary-400)"
                  filter="url(#a)"
                  xlinkHref="#b"
                />
                <use fill="var(--surface-card)" xlinkHref="#g" />
              </g>
              <path
                d="M45.763 73.964c.29 0 .56-.15.714-.395l3.364-5.38a.847.847 0 0 0 .129-.446V37.954h3.364a.84.84 0 0 0 .84-.84l.001-2.524a.84.84 0 0 0-.84-.84l-5.048-.001v-9.551c.543-.616.841-1.397.842-2.225 0-.898-.35-1.744-.986-2.379a3.345 3.345 0 0 0-2.379-.985c-.9 0-1.744.35-2.38.985a3.342 3.342 0 0 0-.985 2.38c0 .85.318 1.628.842 2.221V32.908l-.001.84h-5.047a.841.841 0 0 0-.84.842v2.523a.84.84 0 0 0 .84.841h3.365v29.79a.84.84 0 0 0 .128.445l3.365 5.38a.837.837 0 0 0 .712.395zm-.84-44.073l1.681-1.682v.986l-1.681 1.682v-.986zm.841-4.553c.287 0 .57-.037.841-.106v.598l-1.683 1.683V25.23c.27.07.551.107.842.107zm-1.682-3.364c0-.45.175-.872.493-1.19.317-.318.74-.493 1.19-.493.448 0 .87.175 1.189.493.318.318.491.74.492 1.189 0 .45-.175.872-.493 1.19a1.683 1.683 0 0 1-2.871-1.189zm.841 11.283l1.683-1.683v2.175h-1.684l.001-.492zm-5.889 2.174h13.458l.001.841H39.035v-.841zm4.206 32.071V37.954h1.683l-.001 20.71a.843.843 0 0 0 1.683-.001V37.954h1.682v29.549l-2.524 4.034-2.523-4.035z"
                fill="var(--primary-400)"
                fillRule="nonzero"
              />
            </g>
          </svg>
          <h2 className="m-0 p-0 text-color text-2xl m-0 mx-auto">
            Introducing PrimeReact Avalon
          </h2>
          <p
            className="text-color-secondary"
            style={{width: "400px", lineHeight: "1.5"}}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            velit neque, aliquam sed dolor eu, sagittis rutrum erat. Donec eu
            risus vitae tellus rhoncus iaculis.
          </p>
        </div>
        <img
          alt="image-discover"
          className="absolute right-0 bottom-0 z-0"
          src="/layout/images/landing/image-discover.png"
          style={{width: "800px"}}
        />
      </div>

      <div
        className="flex justify-content-center surface-card py-6 w-full bg-cover bg-no-repeat bg-bottom py-6 px-3 lg:px-6 relative"
        id="events"
        ref={eventsRef}
      >
        <div
          className="grid w-full justify-content-center relative z-2"
          style={{maxWidth: "1200px"}}
        >
          <div className="col-12 md:col-4">
            <div
              className="p-5 border-round h-full"
              style={{backgroundColor: "rgba(214, 51, 132, 0.8)"}}
            >
              <img
                alt="icon-ui"
                className="mb-3"
                src="/layout/images/landing/icon-ui.svg"
              />
              <p className="text-white m-0 mb-2 font-semibold text-lg">
                UI Components
              </p>
              <p className="text-white m-0 font-semibold text-lg">100+</p>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div
              className="p-5 border-round h-full"
              style={{backgroundColor: "rgba(13, 110, 253, 0.8)"}}
            >
              <img
                alt="icon-hours"
                className="mb-3"
                src="/layout/images/landing/icon-hours.svg"
              />
              <p className="text-white m-0 mb-2 font-semibold text-lg">
                Hours of Development
              </p>
              <p className="text-white m-0 font-semibold text-lg">425</p>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div
              className="p-5 border-round h-full"
              style={{backgroundColor: "rgba(102, 16, 242, 0.8)"}}
            >
              <img
                alt="icon-coffee"
                className="mb-3"
                src="/layout/images/landing/icon-coffee.svg"
              />
              <p className="text-white m-0 mb-2 font-semibold text-lg">
                Cups of Coffee Consumed
              </p>
              <p className="text-white m-0 font-semibold text-lg">129</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex justify-content-center py-6 w-full px-3 lg:px-6"
        id="pricing"
        ref={pricingRef}
      >
        <div
          className="grid justify-content-center w-full"
          style={{maxWidth: "1200px"}}
        >
          <div className="col-12 lg:col-4">
            <div className="border-1 surface-border surface-card h-full text-color border-round">
              <div className="p-5 border-bottom-1 surface-border">
                <h3 className="text-xl m-0 mb-1 text-800">Beginner</h3>
                <span className="text-600">For starters and side projects</span>
                <p className="text-color-secondary mt-2 font-medium">
                  $10 / per year
                </p>
              </div>
              <div>
                <ul className="p-0 mt-0" style={{minHeight: "175px"}}>
                  <li className="list-none px-5 py-2 border-bottom-1 surface-border">
                    <span className="text-color-secondary">Responsive</span>
                  </li>
                  <li className="list-none px-5 py-2 border-bottom-1 surface-border">
                    <span className="text-color-secondary">Push Messages</span>
                  </li>
                </ul>
              </div>
              <div className="py-5 px-5">
                <Button className="flex justify-content-center w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
          <div className="col-12 lg:col-4">
            <div className="border-1 surface-border surface-card h-full text-color border-round">
              <div className="p-5 border-bottom-1 surface-border">
                <h3 className="text-xl m-0 mb-1 text-800">Professional</h3>
                <span className="text-600">For starters and side projects</span>
                <p className="text-color-secondary font-medium mt-2">
                  $25 / per year
                </p>
              </div>
              <div>
                <ul className="p-0 mt-0" style={{minHeight: "175px"}}>
                  <li className="list-none px-5 py-2 border-bottom-1 surface-border">
                    <span className="text-color-secondary">Responsive</span>
                  </li>
                  <li className="list-none px-5 py-2 border-bottom-1 surface-border">
                    <span className="text-color-secondary">Push Messages</span>
                  </li>
                  <li className="list-none px-5 py-2 border-bottom-1 surface-border">
                    <span className="text-color-secondary">7/24 Support</span>
                  </li>
                </ul>
              </div>
              <div className="py-5 px-5">
                <Button className="flex justify-content-center w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
          <div className="col-12 lg:col-4">
            <div className="border-1 surface-border surface-card h-full text-color border-round">
              <div className="p-5 border-bottom-1 surface-border">
                <h3 className="text-xl m-0 mb-1 text-800">Enterprise</h3>
                <span className="text-600">For starters and side projects</span>
                <p className="text-color-secondary mt-2 font-medium">
                  Get a quote
                </p>
              </div>
              <div>
                <ul className="p-0 mt-0" style={{minHeight: "175px"}}>
                  <li className="list-none px-5 py-2 border-bottom-1 surface-border">
                    <span className="text-color-secondary">Responsive</span>
                  </li>
                  <li className="list-none px-5 py-2 border-bottom-1 surface-border">
                    <span className="text-color-secondary">Push Messages</span>
                  </li>
                  <li className="list-none px-5 py-2 border-bottom-1 surface-border">
                    <span className="text-color-secondary">
                      7/24 High Priority Support
                    </span>
                  </li>
                  <li className="list-none px-5 py-2 border-bottom-1 surface-border">
                    <span className="text-color-secondary">Free Shipping</span>
                  </li>
                </ul>
              </div>
              <div className="py-5 px-5">
                <Button className="flex justify-content-center w-full">
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex justify-content-center py-6 w-full bg-cover bg-no-repeat bg-bottom py-6 px-3 lg:px-6 relative"
        id="video"
        ref={videoRef}
      >
        <div
          className="w-full h-full absolute z-0"
          style={{
            background:
              "linear-gradient(0deg, var(--primary-700), var(--primary-500))",
            opacity: "0.8",
            top: "0",
            left: "0",
          }}
        />

        <div
          className="grid grid-nogutter align-items-center justify-content-center relative z-2 px-3 lg:px-6"
          style={{maxWidth: "1200px"}}
        >
          <div className="col-12 lg:col-6 text-center mb-5">
            <iframe
              allowFullScreen
              className="w-full md:w-40rem"
              height="300"
              src="https://www.youtube.com/embed/WVkX7gkNeyA"
              title="Youtube"
            />
          </div>
          <div className="col-12 lg:col-6 text-center mb-5 lg:text-right">
            <svg
              className="mb-3 w-6rem"
              viewBox="0 0 92 92"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <rect
                  height="56.075"
                  id="j"
                  rx="4"
                  width="56.075"
                  x="11.613"
                  y="11.613"
                />
                <filter
                  filterUnits="objectBoundingBox"
                  height="142.8%"
                  id="v"
                  width="142.8%"
                  x="-21.4%"
                  y="-21.4%"
                >
                  <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
                  <feGaussianBlur
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                    stdDeviation="4"
                  />
                  <feColorMatrix
                    in="shadowBlurOuter1"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                </filter>
              </defs>
              <g fill="none" fillRule="evenodd">
                <g transform="rotate(45 35.408 49.893)">
                  <use fill="#000" filter="url(#v)" xlinkHref="#b" />
                  <use fill="var(--surface-card)" xlinkHref="#j" />
                </g>
                <path
                  d="M45.508 32H32.154c-.677 0-1.23.554-1.23 1.23v3.693H27.23c-.677 0-1.231.554-1.231 1.23v19.878c0 .677.554 1.23 1.23 1.23h27.508c.677 0 1.231-.553 1.231-1.23v-4l6.216 4c.43.246.861.369 1.353.369.431 0 .8-.123 1.17-.308.8-.43 1.292-1.292 1.292-2.215v-15.57c0-.922-.492-1.784-1.292-2.215-.8-.43-1.723-.369-2.523.123l-6.216 4v-4c0-.677-.554-1.23-1.23-1.23h-8v-3.693c0-.738-.554-1.292-1.231-1.292zm-12.123 2.462h10.892v2.461H33.385v-2.461zm30.153 5.784V56l-7.569-4.862v-6.03l7.57-4.862zm-10.03 16.616H28.462V39.385h25.046v17.477z"
                  fill="var(--primary-500)"
                  fillRule="nonzero"
                />
              </g>
            </svg>

            <h2 className="text-white m-0 mb-2">
              Introducing PrimeReact Avalon
            </h2>
            <p className="text-white m-0 mb-4" style={{lineHeight: "1.5"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              velit neque, aliquam sed dolor eu, sagittis rutrum erat.
            </p>
            <Button>Learn More</Button>
          </div>
        </div>
      </div>

      <div
        className="flex align-items-center justify-content-center py-5"
        style={{backgroundColor: "#292b2c"}}
      >
        <div className="grid w-full" style={{maxWidth: "1200px"}}>
          <div className="col-12 lg:col-6">
            <img alt="avalon-landing" src="/layout/images/landing/avalon.png" />
          </div>
          <div className="col-12 lg:col-6">
            <ul className="list-none m-0 text-center p-0">
              <div className="grid">
                <div className="col-12 lg:col-6 text-center">
                  <li className="block text-lg text-left pb-2">
                    <a
                      className="text-white border-bottom-1 border-transparent hover:border-white"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li className="block text-lg text-left pb-2">
                    <a
                      className="text-white border-bottom-1 border-transparent hover:border-white"
                      href="/#/landing#features"
                    >
                      Features
                    </a>
                  </li>
                  <li className="block text-lg text-left pb-2">
                    <a
                      className="text-white border-bottom-1 border-transparent hover:border-white"
                      href="/#/landing#events"
                    >
                      Events
                    </a>
                  </li>
                </div>
                <div className="col-12 lg:col-6 text-center">
                  <li className="block text-lg text-left pb-2">
                    <a
                      className="text-white border-bottom-1 border-transparent hover:border-white"
                      href="/#/landing#pricing"
                    >
                      Pricing
                    </a>
                  </li>
                  <li className="block text-lg text-left pb-2">
                    <a
                      className="text-white border-bottom-1 border-transparent hover:border-white"
                      href="/#/landing#video"
                    >
                      Video
                    </a>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
