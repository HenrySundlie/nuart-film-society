// src/components/SafeImg.tsx
import styled from '@emotion/styled';
import React from 'react';

// ============================================================================
// Styled Components
// ============================================================================

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(1.05) contrast(1.02);
  transform: translateZ(0);
  transition: transform 700ms cubic-bezier(0.2, 0.7, 0, 1);

  /* Ensure no spacing issues */
  margin: 0;
  padding: 0;
  display: block;
`;

// ============================================================================
// Component Types
// ============================================================================

type Props = React.ComponentProps<'img'>;

// ============================================================================
// Main Component
// ============================================================================

export default function SafeImg({
  src,
  loading = 'lazy',
  decoding = 'async',
  ...rest
}: Props) {
  const [err, setErr] = React.useState(false);
  const finalSrc = !err && typeof src === 'string' && src.length > 0 ? src : '';

  if (!finalSrc) return null; // nothing valid to render

  return (
    <StyledImg
      src={finalSrc}
      onError={() => setErr(true)}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
}
