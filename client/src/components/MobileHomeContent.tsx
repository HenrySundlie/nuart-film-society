import Markdown from './Markdown';
import EmailSignup from './EmailSignup';
import MobileActionCard from './MobileActionCard';
import {
  ContentSection, ContentText, HomeFooter, FooterGrid, FooterCard,
  FooterHeading, FooterText, FooterFinePrint, CopyEmailButton, CopyToast,
} from '../styles/MobileHome.styles';
import homeMd from '../content/home.md?raw';

type Props = {
  copyEmail: () => Promise<void>;
  copyMessage: string;
};

export default function MobileHomeContent({ copyEmail, copyMessage }: Props) {
  return (
    <>
      <MobileActionCard />
      <ContentSection>
        <ContentText>
          <Markdown>{homeMd}</Markdown>
        </ContentText>

        <HomeFooter aria-label="Announcements and contact">
          <FooterGrid>
            <FooterCard aria-labelledby="announcements-heading">
              <FooterHeading id="announcements-heading">Announcements</FooterHeading>
              <FooterText>
                <p>Want to stay in the loop? Sign up to be notified about each week’s film:</p>
                <EmailSignup />
              </FooterText>
            </FooterCard>

            <FooterCard aria-labelledby="contact-heading">
              <FooterHeading id="contact-heading">Contact Us</FooterHeading>
              <FooterText>
                <p>Reach out to us on social or send us an email.</p>
                <ul>
                  <li>
                    <a href="https://www.facebook.com/nuarttheatermoscow" target="_blank" rel="noreferrer noopener">Facebook</a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/nuartfilmsociety" target="_blank" rel="noreferrer noopener">Instagram</a>
                  </li>
                  <li>
                    <CopyEmailButton type="button" onClick={copyEmail} aria-label="Copy email address nuartfilmclub@gmail.com to clipboard">
                      nuartfilmclub@gmail.com
                    </CopyEmailButton>
                    {copyMessage && <CopyToast role="status" aria-live="polite">{copyMessage}</CopyToast>}
                  </li>
                </ul>
              </FooterText>
            </FooterCard>
          </FooterGrid>

          <FooterFinePrint>
            <address>516 S Main Street, Moscow, Idaho</address>
            <span>Photography courtesy of Latah County Historical Society Photograph Collection.</span>
            <span>Website design and development by Henry Sundlie and Clive Miller.</span>
            <span>© {new Date().getFullYear()} Nuart Film Society</span>
          </FooterFinePrint>
        </HomeFooter>
      </ContentSection>
    </>
  );
}
