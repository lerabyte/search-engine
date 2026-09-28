const KEY = 'lerabyte.search-engine.v1';
const empty = () => ({ version:1, completed:[], labs:[], answers:{}, notes:{}, lastDay:1, indexed:[] });
export function sanitize(raw) {
  const data = empty();
  if (!raw || raw.version !== 1) return data;
  const days = arr => Array.isArray(arr) ? [...new Set(arr.filter(x=>Number.isInteger(x)&&x>=1&&x<=7))] : [];
  data.completed=days(raw.completed); data.labs=days(raw.labs);
  data.lastDay = Number.isInteger(raw.lastDay)&&raw.lastDay>=1&&raw.lastDay<=7 ? raw.lastDay : 1;
  for (let day=1;day<=7;day++) {
    if (typeof raw.notes?.[day]==='string') data.notes[day]=raw.notes[day].slice(0,8000);
    const arr = raw.answers?.[day];
    if (Array.isArray(arr)) data.answers[day]=arr.slice(0,3).map(a=>Number.isInteger(a)&&a>=0&&a<=2?a:null);
  }
  data.indexed = Array.isArray(raw.indexed) ? raw.indexed.filter(x=>typeof x==='string'&&/^[a-z-]{1,40}$/.test(x)).slice(0,40) : [];
  return data;
}
export let storageAvailable = true;
function load() { try { return sanitize(JSON.parse(localStorage.getItem(KEY)||'null')); } catch { storageAvailable = false; return empty(); } }
export let state = load();
export function save() { try { localStorage.setItem(KEY,JSON.stringify(state)); } catch { storageAvailable = false; } }
export function setDay(day) { state.lastDay=day;save(); }
export function markLab(day) { if(!state.labs.includes(day)) state.labs.push(day);save(); }
export function answer(day,question,choice) { state.answers[day]??=[null,null,null];state.answers[day][question]=choice;save(); }
export function complete(day) { if(!state.completed.includes(day)) state.completed.push(day);save(); }
export function note(day,value) { state.notes[day]=value.slice(0,8000);save(); }
export function reset() { state=empty();save(); }
export function restore(raw) { if(raw?.version!==1) throw new Error('This is not a supported course progress file.');state=sanitize(raw);save(); }
