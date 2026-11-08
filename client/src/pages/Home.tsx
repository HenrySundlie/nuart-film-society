import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Markdown from '../components/Markdown';
import EmailSignup from '../components/EmailSignup';
import Menu from '../components/Menu';
import MobileHomeContent from '../components/MobileHomeContent';
import { MOBILE_QUERY } from '../utils/responsive';
import {
  HomePage, Hero, TopFade, FloatingLogo, PageTitle, HomeColumns, Sidebar, SidebarCard,
  SidebarHeading, ContactLinks, CopyEmailButton, CopyToast,
  SidebarNavigation, Editorial, FooterFinePrint,
} from '../styles/HomePage.styles';
import homeMd from '../content/home.md?raw';

const sections = homeMd.trim().split(/\n\n(?=## )/);
const email = 'nuartfilmclub@gmail.com';

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  const [showFloatingLogo, setShowFloatingLogo] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(copyTimeout.current), []);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const title = titleRef.current;
    if (!isMobile || !title) return;

    // Match master: reveal the compact header once the full title leaves view.
    const observer = new IntersectionObserver(([entry]) => {
      setShowFloatingLogo(!entry.isIntersecting);
    });
    observer.observe(title);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (!copyMessage) return;

    const dismiss = () => {
      clearTimeout(copyTimeout.current);
      setCopyMessage('');
    };
    const actions = ['pointerdown', 'click', 'keydown', 'wheel', 'touchmove', 'scroll', 'visibilitychange'] as const;

    // Capture catches nested scrolling and runs before link/button handlers.
    for (const action of actions) {
      document.addEventListener(action, dismiss, { capture: true, passive: true });
    }
    window.addEventListener('blur', dismiss);
    window.addEventListener('resize', dismiss);

    return () => {
      for (const action of actions) {
        document.removeEventListener(action, dismiss, true);
      }
      window.removeEventListener('blur', dismiss);
      window.removeEventListener('resize', dismiss);
    };
  }, [copyMessage]);

  const copyEmail = async () => {
    clearTimeout(copyTimeout.current);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const field = document.createElement('textarea');
        field.value = email;
        field.style.position = 'fixed';
        field.style.left = '-9999px';
        document.body.appendChild(field);
        field.select();
        try {
          if (!document.execCommand('copy')) throw new Error('Copy failed');
        } finally {
          field.remove();
        }
      }
      setCopyMessage('Copied to clipboard');
    } catch {
      setCopyMessage('Unable to copy. Please select the email address.');
    }
    copyTimeout.current = setTimeout(() => setCopyMessage(''), 1500);
  };

  return (
    <HomePage>
      <TopFade darkFade={isMobile && showFloatingLogo} aria-hidden="true" />
      <Hero>
        <FloatingLogo visible={isMobile && showFloatingLogo}>NUART</FloatingLogo>
        <img
          src={isMobile
            ? '/images/NuartonMainStreetCropped.jpg'
            : '/images/Main Street east side_0001 cropped.jpg'}
          alt="Historic Main Street in Moscow, Idaho, with the Nuart Theatre marquee"
          loading="eager"
          fetchPriority="high"
        />
        <PageTitle ref={titleRef}>NUART FILM SOCIETY</PageTitle>
      </Hero>
      {isMobile && <Menu visibleOverride={showFloatingLogo} />}

      {isMobile ? (
        <MobileHomeContent copyEmail={copyEmail} copyMessage={copyMessage} />
      ) : (
        <HomeColumns>
          <Sidebar aria-label="Announcements and contact">
            <SidebarCard aria-labelledby="announcements-heading">
              <SidebarHeading id="announcements-heading">Announcements</SidebarHeading>
              <p>Want to stay in the loop? Sign up to notified about each week’s film:</p>
              <EmailSignup />
            </SidebarCard>

            <SidebarCard aria-labelledby="contact-heading" className="contact-card">
              <SidebarHeading id="contact-heading">Contact Us</SidebarHeading>
              <p>Reach out to us on social<br />or send us an email.</p>
              <ContactLinks>
                <li>
                  <a href="https://www.facebook.com/nuarttheatermoscow" target="_blank" rel="noreferrer noopener">Facebook</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/nuartfilmsociety" target="_blank" rel="noreferrer noopener">Instagram</a>
                </li>
                <li>
                  <CopyEmailButton type="button" onClick={copyEmail} aria-label={`Copy email address ${email} to clipboard`}>
                    {email}
                  </CopyEmailButton>
                  <CopyToast role="status" aria-live="polite">{copyMessage}</CopyToast>
                </li>
              </ContactLinks>
            </SidebarCard>

            <SidebarNavigation aria-label="Past Films">
              <Link to="/films">
                Past Films
                <img src="/images/external-link.png" width="14" height="14" alt="" />
              </Link>
              <p>See our past films.</p>
            </SidebarNavigation>

            <SidebarNavigation aria-label="Articles">
              <Link to="/articles">
                Articles &amp; Reviews
                <img src="/images/external-link.png" width="14" height="14" alt="" />
              </Link>
              <p>This page is under development -- more coming soon!</p>
            </SidebarNavigation>
          </Sidebar>

          <Editorial>
            {sections.map((section) => (
              <section key={section.split('\n')[0]}>
                <Markdown>{section}</Markdown>
              </section>
            ))}
            <FooterFinePrint>
              <address>516 S Main Street, Moscow, Idaho</address>
              <span>Photography courtesy of Latah County Historical Society Photograph Collection.</span>
              <span>Website design and development by Henry Sundlie and Clive Miller.</span>
              <span>© {new Date().getFullYear()} Nuart Film Society</span>
            </FooterFinePrint>
          </Editorial>
        </HomeColumns>
      )}
    </HomePage>
  );
}
