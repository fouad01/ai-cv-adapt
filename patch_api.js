const fs = require('fs');
let code = fs.readFileSync('outputs/app.js', 'utf8');

code = code.replace(
  "priority: '', tab: 'adapted', jsonError: '', aiKey: '', aiModel: 'gemini-2.0-flash', adapted: false",
  "priority: '', tab: 'adapted', jsonError: '', aiKey: localStorage.getItem('cv-adapt-apikey') || '', aiModel: localStorage.getItem('cv-adapt-model') || 'gemini-2.0-flash', track: localStorage.getItem('cv-adapt-track') || 'alternance', adapted: false"
);

code = code.replace(
  "function loadDefaultCv(language,track='alternance'){state.cv=cloneCv(defaultCvFor(language,track));save();shell();toast((language==='en'?'English':'French')+' '+(track==='job'?'regular job':'alternance')+' CV loaded.');}",
  "function loadDefaultCv(language,track='alternance'){state.cv=cloneCv(defaultCvFor(language,track));state.track=track;localStorage.setItem('cv-adapt-track',track);save();shell();toast((language==='en'?'English':'French')+' '+(track==='job'?'regular job':'alternance')+' CV loaded.');}"
);

code = code.replace(
  '<input id="apikey" type="password" placeholder="Paste your key"/><label for="model">Model</label><select id="model"><option>gemini-2.0-flash</option><option>gemini-1.5-pro</option></select>',
  '<input id="apikey" type="password" placeholder="Paste your key" value="${esc(state.aiKey)}"/><label for="model">Model</label><select id="model"><option ${state.aiModel===\'gemini-2.0-flash\'?\'selected\':\'\'}>gemini-2.0-flash</option><option ${state.aiModel===\'gemini-1.5-pro\'?\'selected\':\'\'}>gemini-1.5-pro</option></select>'
);

code = code.replace(
  "$('#adapt').onclick=()=>{state.adapted=true;state.tab='adapted'; toast('CV adapted to the target role'); shell()};",
  "$('#adapt').onclick=adaptWithGemini;"
);

code = code.replace(
  "reader.readAsText(f)}; document.addEventListener('blur', editHandler, true); }",
  "reader.readAsText(f)}; $('#apikey').oninput=e=>{state.aiKey=e.target.value.trim();localStorage.setItem('cv-adapt-apikey',state.aiKey)}; $('#model').onchange=e=>{state.aiModel=e.target.value;localStorage.setItem('cv-adapt-model',state.aiModel)}; document.addEventListener('blur', editHandler, true); }"
);

const newFunc = `
async function adaptWithGemini(){
  if(!state.aiKey){toast('Please paste your Gemini API key first.');$('#apikey')?.focus();return;}
  const btn=$('#adapt');const orig=btn.innerHTML;btn.innerHTML='Adapting...';btn.disabled=true;
  try{
    toast('Analyzing job and adapting CV...');
    const prompt=promptText(state.track||'alternance');
    const res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + state.aiModel + ':generateContent?key=' + state.aiKey, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{responseMimeType:"application/json"}})});
    if(!res.ok)throw new Error('API Error: ' + res.status);
    const data=await res.json();
    const rawJson=data.candidates?.[0]?.content?.parts?.[0]?.text;
    if(!rawJson)throw new Error('No content returned from AI');
    const clean=rawJson.trim().replace(/^\\s*\`\`\`(?:json)?\\s*/i,'').replace(/\\s*\`\`\`\\s*$/,'');
    const next=JSON.parse(clean);
    if(!next.personal||!Array.isArray(next.experience))throw new Error('Invalid CV shape returned');
    state.cv=next;state.adapted=true;state.tab='adapted';save();shell();toast('CV successfully adapted by AI!');
  }catch(err){
    console.error(err);toast('Adaptation failed: '+err.message);btn.innerHTML=orig;btn.disabled=false;
  }
}
`;

code = code.replace(
  "catch(error){toast('Clipboard does not contain valid CV JSON.')}}",
  "catch(error){toast('Clipboard does not contain valid CV JSON.')}}\n" + newFunc
);

fs.writeFileSync('outputs/app.js', code);
console.log('Patched app.js successfully.');
