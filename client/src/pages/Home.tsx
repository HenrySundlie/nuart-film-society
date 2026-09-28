import { useEffect, useRef, useState } from 'react';
import Markdown from '../components/Markdown';
import {
  CopyEmailButton,
  CopyToast,
  HeaderImageContainer,
  PageTitle,
  ContentSection,
  ContentText,
  FloatingLogo,
  TitleActions,
  TitleActionButton,
  HomeFooter,
  FooterGrid,
  FooterHeading,
  FooterText,
  FooterFinePrint,
  FooterCard,
} from '../styles/HomePage.styles';
import { MOBILE_QUERY } from '../utils/responsive';
import Menu from '../components/Menu';
import SafeImg from '../components/SafeImg';
import MobileActionCard from '../components/MobileActionCard';
import MainStreetImage from '/images/Main Street east side_0001 cropped.jpg';
import NuartOnMainStreet from '/images/NuartonMainStreetCropped.jpg';
import homeMd from '../content/home.md?raw';

const Home = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [showFloatingLogo, setShowFloatingLogo] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_QUERY).matches
  );
  const isMobileRef = useRef(isMobile);
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | undefined>(undefined);

  const handleCopyEmail = async () => {
    const email = 'nuartfilmclub@gmail.com';
    // Clear any existing dismissal timer
    if (copyTimeoutRef.current) {
      window.clearTimeout(copyTimeoutRef.current);
    }
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(textarea);
      }
    }
    setCopied(true);
    copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Detect mobile viewport and keep updated
    const mql = window.matchMedia(MOBILE_QUERY);
    const updateIsMobile = () => {
      isMobileRef.current = mql.matches;
      setIsMobile(mql.matches);
      // If we switch to desktop, hide the logo
      if (!isMobileRef.current) {
        setShowFloatingLogo(false);
      }
    };
    updateIsMobile();
    mql.addEventListener?.('change', updateIsMobile);

    const thresholdPx = 200;
    const hysteresis = 8; // prevent flicker at the boundary
    const onScroll = () => {
      if (!isMobileRef.current) return;
      const title = titleRef.current;
      if (!title) return;
      const rect = title.getBoundingClientRect();
      // Show logo when title has moved up by threshold
      const shouldShow = rect.top < -thresholdPx || rect.bottom <= 0;
      // Simple hysteresis: if currently visible, keep until we pass back below threshold - hysteresis
      setShowFloatingLogo(
        shouldShow
          ? true
          : rect.top < -(thresholdPx - hysteresis)
            ? true
            : false
      );
    };

    // Run once to initialize, then on scroll
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      mql.removeEventListener?.('change', updateIsMobile);
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <HeaderImageContainer darkFade={showFloatingLogo}>
        <FloatingLogo visible={showFloatingLogo}>NUART</FloatingLogo>
        <PageTitle
          ref={titleRef}
          fontWeight={400}
          letterSpacing="0.5rem"
          as="h1"
          overlay
        >
          NUART FILM SOCIETY
        </PageTitle>
        {/* Desktop-only quick navigation under the title */}
        {!isMobile && (
          <TitleActions aria-label="Primary navigation">
            <TitleActionButton href="/films">Films</TitleActionButton>
            <TitleActionButton href="/articles">
              Articles & Reviews
            </TitleActionButton>
          </TitleActions>
        )}
        <SafeImg
          src={isMobile ? NuartOnMainStreet : MainStreetImage}
          alt="Historic Main Street"
          loading="eager"
          fetchPriority="high"
        />
      </HeaderImageContainer>

      {/* Ensure the Menu icon appears in sync with the floating logo on mobile */}
      {isMobile && <Menu visibleOverride={showFloatingLogo} />}

      {/* Mobile action card now sits entirely below the header image */}
      <MobileActionCard />

      <ContentSection>
        <ContentText>
          <Markdown>{homeMd}</Markdown>
        </ContentText>

        {/* Footer: Contact + Credits moved to fine print */}
        <HomeFooter aria-labelledby="home-footer-heading">
          <FooterGrid>
            <FooterCard>
              <FooterHeading id="home-footer-heading">Contact Us</FooterHeading>
              <FooterText>
                <p>Reach out to us on social or send us an email.</p>
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/nuarttheatermoscow"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/nuartfilmsociety"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <CopyEmailButton
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address nuartfilmclub@gmail.com to clipboard"
                    >
                      nuartfilmclub@gmail.com
                    </CopyEmailButton>
                    {copied && (
                      <CopyToast
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        Email copied
                      </CopyToast>
                    )}
                  </li>
                </ul>
              </FooterText>
            </FooterCard>
          </FooterGrid>

          <FooterFinePrint>
            <address>516 S Main Street, Moscow, Idaho</address>
            <span>
              Photography courtesy of Latah County Historical Society Photograph
              Collection.
            </span>
            <span>
              Website design and development by Henry Sundlie and Clive Miller.
            </span>
            <span>© {currentYear} Nuart Film Society</span>
          </FooterFinePrint>
        </HomeFooter>
      </ContentSection>
    </>
  );
};

export default Home;
