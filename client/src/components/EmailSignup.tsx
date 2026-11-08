import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { EmailField } from '../styles/HomePage.styles';
import { emailSignupUrl } from '../config/emailSignup';
import { theme } from '../theme';

const SignupForm = styled.form`
  width: 100%;
  margin: 0;
`;

const FieldContainer = styled.div`
  position: relative;
`;

const SignupField = styled(EmailField)`
  &[data-processing='true'] {
    color: transparent;
    -webkit-text-fill-color: transparent;
    caret-color: transparent;
  }

  &[aria-invalid='true'] { border-color: ${theme.colors.text.secondary}; }

  &:focus-visible {
    outline: 1px solid ${theme.colors.link};
    outline-offset: 2px;
  }
`;

const processingPulse = keyframes`
  from { opacity: 0.7; }
  to { opacity: 1; }
`;

const Processing = styled.span`
  position: absolute;
  inset: 0;
  height: 38px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  pointer-events: none;
  color: ${theme.colors.text.secondary};
  font-size: 13px;
  animation: ${processingPulse} 900ms ease-in-out infinite alternate;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const SignupError = styled.p`
  && {
    margin: 8px 0 0;
    color: ${theme.colors.text.secondary};
    font-size: 13px;
    line-height: 1.4;
  }
`;

const SignupStatus = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`;

export default function EmailSignup() {
  const id = useId().replace(/:/g, '');
  const frameName = `signup-response-${id}`;
  const field = useRef<HTMLInputElement>(null);
  const request = useRef('');
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('Enter your email and press Enter to sign up.');

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      // Google's HTML sandbox may send from a generated subdomain. Match its
      // origin and this submission's random ID, never arbitrary window messages.
      const trustedOrigin = event.origin === 'https://script.google.com'
        || event.origin === 'https://script.googleusercontent.com'
        || /^https:\/\/[a-z0-9-]+-script\.googleusercontent\.com$/.test(event.origin);
      const data = event.data;
      if (!trustedOrigin || !request.current || !data || data.type !== 'nuart-signup'
        || data.requestId !== request.current || typeof data.ok !== 'boolean') return;
      clearTimeout(timeout.current);
      request.current = '';
      setPending(false);
      if (data.ok) {
        if (field.current) field.current.value = '';
        setSaved(true);
        setMessage('Your email has been saved. Thank you!');
      } else {
        const error = 'Could not save your email. Press Enter to try again.';
        setError(error);
        setMessage(error);
      }
    };
    window.addEventListener('message', receive);
    return () => {
      window.removeEventListener('message', receive);
      clearTimeout(timeout.current);
    };
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    if (request.current) {
      event.preventDefault();
      return;
    }
    const address = field.current?.value.trim() || '';
    // An empty submission is a quiet no-op, without a browser validation popup.
    if (!address) {
      event.preventDefault();
      setError('');
      setMessage('Enter your email and press Enter to sign up.');
      return;
    }
    if (address.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)
      || field.current?.validity.typeMismatch) {
      event.preventDefault();
      const error = 'Use an email like name@example.com.';
      setError(error);
      setMessage(error);
      return;
    }
    if (!emailSignupUrl) {
      event.preventDefault();
      const error = 'Signups are unavailable right now. Please try again later.';
      setError(error);
      setMessage(error);
      return;
    }
    const form = event.currentTarget;
    if (field.current) field.current.value = address;
    const requestId = crypto.randomUUID();
    (form.elements.namedItem('requestId') as HTMLInputElement).value = requestId;
    (form.elements.namedItem('origin') as HTMLInputElement).value = window.location.origin;
    request.current = requestId;
    setSaved(false);
    setError('');
    setPending(true);
    setMessage('Processing your signup…');
    // Do not treat an iframe load or an opaque fetch response as a saved email.
    timeout.current = setTimeout(() => {
      request.current = '';
      setPending(false);
      const error = 'Could not confirm the save. Press Enter to try again.';
      setError(error);
      setMessage(error);
    }, 45000);
  };

  return (
    <SignupForm
      action={emailSignupUrl}
      method="post"
      target={frameName}
      onSubmit={submit}
      noValidate
      aria-label="Film announcements signup"
      aria-busy={pending}
    >
      <FieldContainer>
        <SignupField
          ref={field}
          type="email"
          name="email"
          placeholder={saved ? 'Email saved. Thank you!' : 'eddiemannix@gmail.com'}
          aria-label="Email address"
          aria-describedby={`signup-status-${id}`}
          aria-invalid={error ? true : undefined}
          data-processing={pending || undefined}
          autoComplete="email"
          enterKeyHint="go"
          title="Press Enter to sign up"
          required
          readOnly={pending}
          disabled={!emailSignupUrl}
          onInput={() => {
            setError('');
            setSaved(false);
            setMessage('Press Enter to sign up.');
          }}
        />
        {pending && <Processing aria-hidden="true">Processing…</Processing>}
      </FieldContainer>
      {error && <SignupError aria-hidden="true">{error}</SignupError>}
      <input type="hidden" name="origin" />
      <input type="hidden" name="requestId" />
      <input type="text" name="website" autoComplete="off" tabIndex={-1} aria-hidden="true" hidden />
      {/* Enables native Enter/Go submission without adding a visible control. */}
      <button type="submit" hidden>Sign up</button>
      <SignupStatus id={`signup-status-${id}`} role="status" aria-live="polite">{message}</SignupStatus>
      <iframe name={frameName} title="Email signup response" hidden />
    </SignupForm>
  );
}
