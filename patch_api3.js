const fs = require('fs');
let code = fs.readFileSync('outputs/app.js', 'utf8');

code = code.replace(/gemini-1\.5-flash/g, 'gemini-3.5-flash');

fs.writeFileSync('outputs/app.js', code);
console.log('Fixed model names.');
