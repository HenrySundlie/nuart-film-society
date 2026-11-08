import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Markdown from '../components/Markdown';
import {
  HomePage, Hero, PageTitle, HomeColumns, Sidebar, SidebarCard,
  SidebarHeading, EmailField, ContactLinks, CopyEmailButton, CopyToast,
  ArticlesNavigation, Editorial, FooterFinePrint,
} from '../styles/HomePage.styles';
import homeMd from '../content/home.md?raw';

const sections = homeMd.trim().split(/\n\n(?=## )/);
const email = 'nuartfilmclub@gmail.com';

export default function Home() {
  const [copyMessage, setCopyMessage] = useState('');
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(copyTimeout.current), []);

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
      setCopyMessage('Email copied');
    } catch {
      setCopyMessage('Unable to copy. Please select the email address.');
    }
    copyTimeout.current = setTimeout(() => setCopyMessage(''), 3000);
  };

  return (
    <HomePage>
      <Hero>
        <img
          src="/images/historic-main-street.png"
          alt="Historic Main Street in Moscow, Idaho, with the Nuart Theatre marquee"
          loading="eager"
          fetchPriority="high"
        />
        <PageTitle>NUART FILM SOCIETY</PageTitle>
      </Hero>

      <HomeColumns>
        <Sidebar aria-label="Announcements and contact">
          <SidebarCard aria-labelledby="announcements-heading">
            <SidebarHeading id="announcements-heading">Announcements</SidebarHeading>
            <p>Want to stay in the loop? Sign up to notified about each week’s film:</p>
            {/* The Figma field is a visual preview. Enable it when a mailing-list
                provider is connected; never imply an address has been saved. */}
            <EmailField
              type="email"
              placeholder="eddiemannix@gmail.com"
              aria-label="Email address — signup coming soon"
              title="Email signup coming soon"
              disabled
            />
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
              </li>
            </ContactLinks>
            <CopyToast role="status" aria-live="polite">{copyMessage}</CopyToast>
          </SidebarCard>

          <ArticlesNavigation aria-label="Articles">
            <Link to="/articles">
              Articles &amp; Reviews
              <img src="/images/external-link.png" width="14" height="14" alt="" />
            </Link>
            <p>This page is under development -- more coming soon!</p>
          </ArticlesNavigation>
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
    </HomePage>
  );
}
