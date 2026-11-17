const $=s=>document.querySelector(s);
const messages=$("#messages"), input=$("#prompt"), status=$("#status");
function add(text,who){const el=document.createElement("div");el.className="msg "+who;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;}
function speak(text){if(!( "speechSynthesis" in window))return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-IN";u.rate=.96;speechSynthesis.speak(u);}
function reply(q){
 const s=q.toLowerCase().trim();
 if(/time|समय|टाइम/.test(s)) return "The current time on your device is "+new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})+".";
 if(/date|तारीख|आज कौन/.test(s)) return "Today is "+new Date().toLocaleDateString(undefined,{weekday:"long",year:"numeric",month:"long",day:"numeric"})+".";
 if(/battery|बैटरी/.test(s)) {
  if(navigator.getBattery){return navigator.getBattery().then(b=>"Battery level: "+Math.round(b.level*100)+"%. "+(b.charging?"Device is charging.":"Device is not charging."));}
  return "Battery information is not exposed by this browser on your device.";
 }
 if(/open youtube|youtube खोल|youtube kholo/.test(s)){window.open("https://www.youtube.com","_blank","noopener");return "Opening YouTube in a new tab. Your browser may ask you to allow it.";}
 if(/open google|google खोल|google kholo/.test(s)){window.open("https://www.google.com","_blank","noopener");return "Opening Google in a new tab.";}
 if(/hello|hi|नमस्ते|हेलो/.test(s))return "Hello. JARVIS is online. How may I assist you?";
 return "I can handle basic built-in commands right now, but a connected AI service is not configured yet. To enable full AI answers, this website needs a secure backend and an API key stored there—not inside this public website. See README for setup.";
}
async function send(q){q=(q||input.value).trim();if(!q)return;input.value="";add(q,"user");status.textContent="PROCESSING COMMAND";try{let ans=await reply(q);add(ans,"bot");speak(ans);}catch(e){add("I couldn't complete that command. Please try again.","bot");}status.textContent="READY · AWAITING COMMAND";}
$("#send").addEventListener("click",()=>send());
input.addEventListener("keydown",e=>{if(e.key==="Enter")send();});
document.querySelectorAll("[data-cmd]").forEach(b=>b.addEventListener("click",()=>send(b.dataset.cmd)));
const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
$("#mic").addEventListener("click",()=>{if(!SpeechRecognition){add("Voice recognition is not supported in this browser. Use iPhone Dictation from the keyboard or type your command.","bot");return;}const r=new SpeechRecognition();r.lang="en-IN";r.interimResults=false;r.maxAlternatives=1;status.textContent="LISTENING…";r.onresult=e=>send(e.results[0][0].transcript);r.onerror=()=>{status.textContent="READY · AWAITING COMMAND";add("Microphone input failed. Check browser microphone permission, or type your request.","bot");};r.onend=()=>{if(status.textContent==="LISTENING…")status.textContent="READY · AWAITING COMMAND";};r.start();});

// Show the browser's install prompt where supported (for example, Chrome/Android).
let installPrompt;
const installButton=$("#install");
window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();installPrompt=event;installButton.hidden=false;});
installButton.addEventListener("click",async()=>{
 if(!installPrompt)return;
 installPrompt.prompt();
 await installPrompt.userChoice;
 installPrompt=null;
 installButton.hidden=true;
});
window.addEventListener("appinstalled",()=>{installPrompt=null;installButton.hidden=true;});

// Service workers require HTTPS (GitHub Pages is HTTPS) or localhost.
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));}
console.log("JARVIS app.js loaded");
