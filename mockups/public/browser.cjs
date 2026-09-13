// Use a project-installed Playwright first, or the bundled desktop runtime.
const path = require('path');
function playwright() {
  try { return require('playwright'); } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
    const modules = process.env.PLAYWRIGHT_MODULES || path.join(
      process.env.USERPROFILE || process.env.HOME || '',
      '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules',
    );
    try { return require(path.join(modules, 'playwright')); } catch {
      throw new Error('Zainstaluj playwright lub ustaw PLAYWRIGHT_MODULES na katalog node_modules zawierający playwright.');
    }
  }
}
exports.launch = () => playwright().chromium.launch({
  headless: true,
  ...(process.env.BROWSER_CHANNEL === 'chromium' ? {} : { channel: process.env.BROWSER_CHANNEL || 'msedge' }),
});
exports.pages = {
  home: 'strona-glowna/preview-qa.html',
  contact: 'kontakt/mockup-kontakt.html',
  booking: 'rezerwacja/mockup-rezerwacja.html',
};
