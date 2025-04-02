'use client'; // 表示此組件只在客戶端運行
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { TbBoxMultiple } from 'react-icons/tb';
import { motion } from 'framer-motion';
import './navigation.css';
import useWindowSize from '../../../hook/useWindowSize';

const navigation = [
  { to: '/', title: 'Home', target: '_self' },
  { to: '/about', title: 'About', target: '_self' },
  { to: '/posts', title: '文章專區', target: '_self' },
  { to: '/study', title: '日本留學', target: '_self' },
  { to: '/work', title: '打工度假', target: '_self' },
  { to: '/QA', title: '常見Q&A', target: '_self' },
  { to: '/download', title: '下載專區', target: '_self' },
  { to: '/contact', title: '聯絡我們', target: '_blank' },
];

const SpMenu = ({ navigation, ishamburgerClicked, setIsHamburgerClicked }) => {
  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 70,
      },
    }),
  };

  return (
    <nav className="hamburger-menu-wrapper">
      <div
        className={
          ishamburgerClicked
            ? 'hamburger-body hamburger-body-clicked'
            : 'hamburger-body'
        }
      >
        <motion.ul
          className="hamburger-list"
          initial="hidden"
          animate={ishamburgerClicked ? 'visible' : 'hidden'}
        >
          {navigation.map((nav, index) => (
            <motion.li key={index} custom={index} variants={itemVariants}>
              <Link
                href={nav.to}
                target={nav.target}
                onClick={() => setIsHamburgerClicked(!ishamburgerClicked)}
              >
                <span className="hamburger-menu-icon">
                  <img
                    src="/goyoursbear-line-W.svg"
                    alt="hamburger menu goyours icon"
                  />
                </span>
                {index === 7 ? (
                  <span className="hamburger-contact-us-button">
                    <img
                      src="/goyoursbear-icon-w.svg"
                      alt="hamburger menu goyours icon"
                    />
                  </span>
                ) : null}
                <p id={`navText${index}`}>{nav.title}</p>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </nav>
  );
};

export default function Navigation() {
  const [prevScrollPos, setPrevScrollPos] = useState(0); // 初始值設為 0
  const [visible, setVisible] = useState(true);
  const [ishamburgerClicked, setIsHamburgerClicked] = useState(false);
  const windowSize = useWindowSize();

  // 處理滾動事件
  useEffect(() => {
    // 設置初始 scroll 位置
    setPrevScrollPos(window.pageYOffset);

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // 處理漢堡選單打開時禁用滾動
  useEffect(() => {
    if (ishamburgerClicked) {
      const preventScroll = (e) => e.preventDefault();
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('wheel', preventScroll, { passive: false });
      return () => {
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('wheel', preventScroll);
      };
    }
  }, [ishamburgerClicked]);

  return (
    <>
      <nav className="nav-wrapper">
        <nav
          className={`${windowSize > 1024 ? 'mainNav-pc' : 'mainNav'} ${
            ishamburgerClicked ? 'mainNav-hamburger-clicked' : ''
          } ${visible && windowSize <= 1024 ? 'nav-visible-sp' : 'nav-hidden'}`}
        >
          <div
            className={`${windowSize > 1024 ? 'nav-logo-pc' : 'nav-logo-sp'} ${
              visible ? 'nav-visible' : 'nav-hidden'
            }`}
          >
            <Link href="/">
              <Image
                src="/LOGO-03.png"
                alt="GoYours LOGO,高優國際留學商標"
                width={250}
                height={80}
              />
            </Link>
          </div>
          <div
            className={`navMenu ${windowSize > 1024 ? 'nav-list' : ''} ${
              visible ? 'nav-visible' : 'nav-hidden'
            }`}
          >
            <ul>
              {navigation.map((nav, index) => (
                <li key={index}>
                  <Link href={nav.to} target={nav.target}>
                    <span className="nav-wrapper">
                      <span className="upperP-wrapper">
                        <p id={`navText${index}`}>
                          {nav.title}
                          <span className="nav-icon">
                            {index === 7 ? <TbBoxMultiple /> : null}
                          </span>
                        </p>
                      </span>
                      <span className="downP-wrapper">
                        <p id={`navText${index}`}>
                          {nav.title}
                          <span className="nav-icon">
                            {index === 7 ? <TbBoxMultiple /> : null}
                          </span>
                        </p>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="hamburger-line-wrapper"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsHamburgerClicked(!ishamburgerClicked);
            }}
          >
            <span
              className={ishamburgerClicked ? 'hamburger-active-line' : ''}
            ></span>
            <span
              className={ishamburgerClicked ? 'hamburger-active-line' : ''}
            ></span>
            <span
              className={ishamburgerClicked ? 'hamburger-active-line' : ''}
            ></span>
          </div>
        </nav>
      </nav>

      <SpMenu
        navigation={navigation}
        ishamburgerClicked={ishamburgerClicked}
        setIsHamburgerClicked={setIsHamburgerClicked}
      />
    </>
  );
}
