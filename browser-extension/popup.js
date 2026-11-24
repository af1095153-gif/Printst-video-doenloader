const KIKPIN_HOME_URL = 'https://kikpin.me/';

const statusContainer = document.getElementById('tab-status');
const statusText = document.getElementById('status-text');
const primaryButton = document.getElementById('primary-button');
const manualForm = document.getElementById('manual-form');
const manualInput = document.getElementById('manual-url');
const feedback = document.getElementById('form-feedback');

let activePinUrl = '';

function isPinterestUrl(value) {
  try {
    const parsedUrl = new URL(value);
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') return false;

    const hostname = parsedUrl.hostname.toLowerCase();
    return (
      hostname === 'pin.it' ||
      hostname.endsWith('.pin.it') ||
      /^(?:[a-z0-9-]+\.)*pinterest\.[a-z]{2,}(?:\.[a-z]{2,})?$/.test(hostname)
    );
  } catch {
    return false;
  }
}

function getKikPinUrl(pinUrl) {
  return pinUrl ? `${KIKPIN_HOME_URL}?url=${encodeURIComponent(pinUrl)}` : KIKPIN_HOME_URL;
}

function showFeedback(message, isError = false) {
  feedback.textContent = message;
  feedback.classList.toggle('is-error', isError);
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (chrome.runtime.lastError) {
    statusText.textContent = 'Could not read the current tab';
    primaryButton.disabled = false;
    return;
  }

  const activeTab = tabs?.[0];
  activePinUrl = isPinterestUrl(activeTab?.url || '') ? activeTab.url : '';

  if (activePinUrl) {
    statusContainer.classList.add('is-pin');
    statusText.textContent = 'Pinterest Pin detected';
    manualInput.value = activePinUrl;
    primaryButton.textContent = 'Download in HD';
  } else {
    statusText.textContent = 'Not on a Pinterest Pin';
    primaryButton.textContent = 'Open KikPin.me';
  }

  primaryButton.disabled = false;
});

primaryButton.addEventListener('click', () => {
  chrome.tabs.create({ url: getKikPinUrl(activePinUrl) });
});

manualInput.addEventListener('input', () => {
  manualInput.removeAttribute('aria-invalid');
  showFeedback('Opens KikPin in a new tab.');
});

manualForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const manualUrl = manualInput.value.trim();

  if (!isPinterestUrl(manualUrl)) {
    manualInput.setAttribute('aria-invalid', 'true');
    showFeedback('Enter a valid Pinterest or pin.it link.', true);
    manualInput.focus();
    return;
  }

  manualInput.removeAttribute('aria-invalid');
  showFeedback('Opening KikPin…');
  chrome.tabs.create({ url: getKikPinUrl(manualUrl) });
});
