import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

type Options = {
  /** Max number of lines the text may use. */
  maxLines?: number;
  /** Minimum font-size in px. Defaults to 12. */
  minFontSizePx?: number;
  /** Text to measure; defaults to the element's text content. */
  text?: string;
};

/**
 * Auto-resizes the font-size of an element so its content fits within a max line count.
 * Works even when the visible element uses CSS line-clamp by measuring with an offscreen clone.
 */
export function useAutoFitText<T extends HTMLElement = HTMLElement>(
  options: Options = {}
) {
  const { maxLines = 2, minFontSizePx = 12, text } = options;

  const elRef = useRef<T | null>(null);

  const measureAndFit = useCallback(() => {
    const el = elRef.current;
    if (!el) return;

    // Clear inline font-size so we can recompute the CSS max size on widen
    el.style.fontSize = '';

    // Compute current styles to mirror in the measuring node (post-clear)
    const baseStyles = getComputedStyle(el);
    let startFontPx = parseFloat(baseStyles.fontSize || '16');
    // Nudge start slightly up to avoid getting stuck below CSS clamp max due to rounding
    startFontPx = Math.max(startFontPx, Math.ceil(startFontPx));
    // If we somehow can't compute sizing, bail
    if (!isFinite(startFontPx) || startFontPx <= 0) return;

    // Prepare a hidden measuring element (offscreen, no clamp)
    const meas = document.createElement('div');
    meas.textContent = text ?? el.textContent ?? '';
    // Copy text-related styles for fidelity
    const copyProps = [
      'fontFamily',
      'fontWeight',
      'fontStyle',
      'letterSpacing',
      'textTransform',
      'textIndent',
      'wordSpacing',
      'whiteSpace',
      'wordBreak',
      'overflowWrap',
      'textRendering',
      'hyphens',
    ] as const;
    copyProps.forEach((p) => {
      meas.style[p] = baseStyles[p];
    });
    meas.style.position = 'fixed';
    meas.style.top = '-9999px';
    meas.style.left = '0';
    meas.style.visibility = 'hidden';
    meas.style.pointerEvents = 'none';
    meas.style.whiteSpace = 'normal';
    meas.style.display = 'block';
    meas.style.boxSizing = 'border-box';
    meas.style.margin = '0';
    meas.style.padding = '0';
    meas.style.border = '0';

    // Use the actual available width of the element (content-box)
    const width = Math.floor(
      el.clientWidth || el.getBoundingClientRect().width
    );
    meas.style.width = `${width}px`;
    meas.style.lineHeight = baseStyles.lineHeight; // preserve the 1.2 unitless ratio

    document.body.appendChild(meas);

    const fitsAt = (fontPx: number) => {
      meas.style.fontSize = `${fontPx}px`;
      // Allowed height in px for maxLines
      const lhPx =
        parseFloat(getComputedStyle(meas).lineHeight || `${fontPx * 1.2}`) ||
        fontPx * 1.2;
      const allowed = lhPx * maxLines + 0.5; // small epsilon
      const needed = meas.scrollHeight;
      return needed <= allowed;
    };

    // Binary search from min..start (or max override)
    let lo = minFontSizePx;
    let hi = Math.max(startFontPx, minFontSizePx);

    // Fast path: if the starting size fits, keep it
    if (fitsAt(hi)) {
      el.style.fontSize = `${hi}px`;
      document.body.removeChild(meas);
      return;
    }

    // Otherwise, search for the largest size that fits
    let best = lo;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (fitsAt(mid)) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    el.style.fontSize = `${best}px`;
    document.body.removeChild(meas);
  }, [maxLines, minFontSizePx, text]);

  // Fit on mount and whenever deps change (layout effect to avoid flicker)
  useLayoutEffect(() => {
    measureAndFit();
  }, [measureAndFit]);

  // Observe size and text changes
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let frame: number | undefined;
    const scheduleFit = () => {
      if (frame !== undefined) return;
      frame = requestAnimationFrame(() => {
        frame = undefined;
        measureAndFit();
      });
    };

    const ro = new ResizeObserver(scheduleFit);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);

    // MutationObserver for text changes
    const mo = new MutationObserver(scheduleFit);
    mo.observe(el, { childList: true, characterData: true, subtree: true });

    return () => {
      ro.disconnect();
      mo.disconnect();
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [measureAndFit]);

  const setRef = useCallback((node: T | null) => {
    elRef.current = node;
  }, []);

  return setRef;
}
