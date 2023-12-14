const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Run in non-headless mode to see the browser
	executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // Specify the path to Chrome
    args: [
      '--start-fullscreen', // Start in fullscreen (kiosk mode)
      '--disable-infobars', // Disables the "Chrome is being controlled by automated test software" infobar
      '--no-first-run', // Skip the first run wizards (like the default browser check)
      '--no-default-browser-check', // Disables the default browser checking
    ],
	ignoreDefaultArgs: ['--enable-automation']
  });

  const pages = await browser.pages();
  const page = pages[0]; // Now 'page' is defined.

  await page.setViewport({ width: 1920, height: 1200 });

  await page.goto('https://zoom.earth/maps/satellite/#view=47.20757,-120.44257,8z/overlays=radar,labels:off');
  await page.waitForSelector('button.play'); // Wait for the play button to be loaded
  
  // Simulate a click on the play button
  await page.click('button.play');
  
  await page.waitForTimeout(1000); // Adjust the timeout as needed

  const selectorsToHide = [
    'button.title',
    'nav.panel.layers.select-satellite',
    'button.search',
    'button.settings',
    'button.about',
    'button.share',
    'button.geolocation',
    'div.group.measure',
    'div.group.zoom',
    'div.group.overlays',
    'div.footer-coordinate',
	'aside.notifications',
	'div.panel.ad-header',
	'div.panel.ad-side',
	'div.main-tooltip.clock.play.bottom.show',
	'div.main-tooltip.clock.pause.bottom.show',
  ];

  for (const selector of selectorsToHide) {
    await page.evaluate((sel) => {
      const elements = document.querySelectorAll(sel);
      elements.forEach(element => element.style.display = 'none');
    }, selector);
  }
  // await browser.close();
})();
