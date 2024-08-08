const fs = require('fs');
const path = require('path');

const locales = ['ar', 'de', 'en', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];
const baseDir = path.join(__dirname, 'locales');

locales.forEach((locale) => {
  const localeDir = path.join(baseDir, locale);
  const localeFile = path.join(baseDir, `${locale}.json`);
  const commonFile = path.join(localeDir, 'common.json');

  if (!fs.existsSync(localeDir)) {
    fs.mkdirSync(localeDir);
  }

  if (fs.existsSync(localeFile)) {
    fs.renameSync(localeFile, commonFile);
  }
});

console.log('Locales have been restructured successfully.');