export async function copyToClipboard(text: string) {
  try {
    // Modern browsers
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function'
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers / webviews
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // Prevent scrolling on iOS
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length); // iOS support

    const success = document.execCommand('copy');

    document.body.removeChild(textarea);

    return success;
  } catch (err) {
    console.error('Copy failed:', err);
    return false;
  }
}

export const SHORT_URL_BASE = `http://${window.location.host}`;
