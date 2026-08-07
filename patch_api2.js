const fs = require('fs');
let code = fs.readFileSync('outputs/app.js', 'utf8');

code = code.replace(/gemini-2\.0-flash/g, 'gemini-1.5-flash');

code = code.replace(
  '<select id="model"><option ${state.aiModel===\'gemini-1.5-flash\'?\'selected\':\'\'}>gemini-1.5-flash</option><option ${state.aiModel===\'gemini-1.5-pro\'?\'selected\':\'\'}>gemini-1.5-pro</option></select>',
  '<select id="model"><option value="gemini-1.5-flash" ${state.aiModel===\'gemini-1.5-flash\'?\'selected\':\'\'}>gemini-1.5-flash</option><option value="gemini-1.5-pro" ${state.aiModel===\'gemini-1.5-pro\'?\'selected\':\'\'}>gemini-1.5-pro</option></select>'
);

code = code.replace(
  "models/' + state.aiModel + ':generateContent",
  "models/' + state.aiModel.trim() + ':generateContent"
);

fs.writeFileSync('outputs/app.js', code);
console.log('Fixed model names.');
