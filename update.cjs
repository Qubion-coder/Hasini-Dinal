const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Replace Text
appContent = appContent.replace(/Shammi/g, 'Udani');
appContent = appContent.replace(/Vikum/g, 'Darshana');
appContent = appContent.replace(/December 11, 2026 10:13:00/g, 'November 06, 2026 08:50:00');
appContent = appContent.replace(/Loving Daughter of Mr\. Deva Pradeep Nadhun Dharmawickrama & Mrs\. Dehinga Sherene Thabrew/g, 'Daughter of Mr. & Mrs. Liyanage');
appContent = appContent.replace(/Loving Son of Mr\. Hewadewage Sarath Weerasinghe & Mrs\. Hewadewage Kamani Yamuna Kumari Mel/g, 'Son of Mr. & Mrs. Gunapala');

const oldTimeline = /\(Poruwa Ceremony at 10\.13 AM\) FRIDAY, 11 DECEMBER 2026\. Registration at 9\.02 AM\./g;
const newTimeline = `FRIDAY, 06 NOVEMBER 2026<br/><br/>Breakfast: 7.30 AM - 9.00 AM<br/>Poruwa Ceremony: 8.50 AM - 9.30 AM<br/>Lunch: 12.30 PM - 3.00 PM<br/>Couple leaving from hotel: 3.47 PM`;
appContent = appContent.replace(oldTimeline, `<div dangerouslySetInnerHTML={{ __html: \`${newTimeline}\` }} />`);

appContent = appContent.replace(/Paradise Inn Bolgoda/g, 'Paradise in Bolgoda');
appContent = appContent.replace(/Crystal Atrium/g, 'The grand ballroom');
appContent = appContent.replace(/https:\/\/maps\.app\.goo\.gl\/unygqW4e3i385R3q7\?g_st=ic/g, 'https://maps.app.goo.gl/7ANfcjDaysvMSrR1A');

// Replace Colors to Light Green and White
// Old: 
// #d4af37 (Gold) -> #86efac (Light Green)
// #f7e7ce (Cream) -> #ffffff (White) or #f0fdf4
// #4e342e (Brown) -> #166534 (Dark Green text)
// #3e2723 (Dark Brown bg) -> #14532d (Very Dark Green) or #f0fdf4 (Light Green)
// #8d6e63 (Light Brown) -> #4ade80 (Green)
// #C9A227 (Gold alt) -> #86efac

// Let's use a fresh, light green and white theme.
// Backgrounds that were very dark (#3e2723, #4e342e) maybe make them dark green or light green.
// "Light green and white" -> we should make the primary dark color a nice green, and backgrounds white/light green.
appContent = appContent.replace(/#d4af37/gi, '#4ade80');
appContent = appContent.replace(/#f7e7ce/gi, '#ffffff');
appContent = appContent.replace(/#4e342e/gi, '#166534');
appContent = appContent.replace(/#3e2723/gi, '#14532d');
appContent = appContent.replace(/#8d6e63/gi, '#86efac');
appContent = appContent.replace(/#C9A227/gi, '#4ade80');

// Also fix RSVP numbers if they were hardcoded
appContent = appContent.replace(/\+44 7397 738800/g, ''); 
appContent = appContent.replace(/\+94 70 464 4005/g, ''); 
appContent = appContent.replace(/RSVP - Darshana  \| Udani /g, 'RSVP - Udani & Darshana');

fs.writeFileSync(appPath, appContent);
console.log('App.tsx updated');

// Update CSS
const cssPath = path.join(__dirname, 'src', 'index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(/--color-emerald: #3e2723;/g, '--color-emerald: #14532d;');
cssContent = cssContent.replace(/--color-paper: #fcfcf0;/g, '--color-paper: #ffffff;');
cssContent = cssContent.replace(/#efebe9/gi, '#f0fdf4');
cssContent = cssContent.replace(/#d7ccc8/gi, '#dcfce7');
cssContent = cssContent.replace(/#bcaaa4/gi, '#bbf7d0');
cssContent = cssContent.replace(/#a1887f/gi, '#86efac');
cssContent = cssContent.replace(/#8d6e63/gi, '#4ade80');
cssContent = cssContent.replace(/#795548/gi, '#22c55e');
cssContent = cssContent.replace(/#6d4c41/gi, '#16a34a');
cssContent = cssContent.replace(/#5d4037/gi, '#15803d');
cssContent = cssContent.replace(/#4e342e/gi, '#166534');
cssContent = cssContent.replace(/#3e2723/gi, '#14532d');

cssContent = cssContent.replace(/--color-ivory: #FFFFF0;/g, '--color-ivory: #ffffff;');
cssContent = cssContent.replace(/--color-champagne: #F7E7CE;/g, '--color-champagne: #f0fdf4;');
cssContent = cssContent.replace(/--color-background: #fdfaf5;/g, '--color-background: #ffffff;');

// Hex replacements in CSS
cssContent = cssContent.replace(/#b8860b/gi, '#22c55e');
cssContent = cssContent.replace(/#d4af37/gi, '#4ade80');
cssContent = cssContent.replace(/#f7e7ce/gi, '#ffffff');
cssContent = cssContent.replace(/#996515/gi, '#16a34a');
cssContent = cssContent.replace(/#FEDB37/gi, '#86efac');
cssContent = cssContent.replace(/#FDB931/gi, '#4ade80');
cssContent = cssContent.replace(/#9f7928/gi, '#16a34a');
cssContent = cssContent.replace(/#8A6E2F/gi, '#15803d');
cssContent = cssContent.replace(/#FFFFAC/gi, '#f0fdf4');
cssContent = cssContent.replace(/#D1B464/gi, '#4ade80');
cssContent = cssContent.replace(/#5d4a1f/gi, '#14532d');
cssContent = cssContent.replace(/#2e1c14/gi, '#14532d');

fs.writeFileSync(cssPath, cssContent);
console.log('index.css updated');
