import { format, intformat } from "./format.js";
let ticktime = 0
let player = {
    lasttick: Date.now(),
    levels: [0,0],
    xp: [0,0],
}
function levelRequire(lv,t){
  let lvp = lv
  let p = 100-(10*t)
  if (p < 80){p = 80}
  if (lv > 1000){lvp *= 1+(0.01*(lv-1000))}
  return (p*(1+(0.05*lvp)))
}
function makeTierName(t){
  let names = ["level","rank","magic","fluff","job","power","warmth","module","file","folder","system"]
  let mreow = Math.floor(t/(names.length))
  if (mreow == 0){return `${names[t%(names.length)]}`}
  else {return `${names[t%(names.length)]}<sup>${mreow+1}</sup>`}
}
function capitalize(st){
  return st.charAt(0).toUpperCase() + st.slice(1);
}
function highRanks(lv,t){
  let k = 1
  for (let i = t; i < lv.length; i++){
    k += 0.1*(i-t)*lv[i]
  }
  return k
}
function levelMult(lv){
  let k = Math.floor(Math.log10(lv))
  if (k < 0){k = 0}
  return 2**k
}
function makeInnerHTMLForLevelTime(lv,xp){
  let j = ""
  for (let i = 0; i < lv.length; i++){
  j += `${capitalize(makeTierName(i))} ${intformat(lv[i])}, [*${levelMult(lv[i])}] ${format(xp[i])}/${format(levelRequire(lv[i],i))}
  <br>*${format(highRanks(lv,i))} boost from higher tiers<br><progress max="${levelRequire(lv[i],i)}" value="${xp[i]}"></progress><br>`
  }
  return j
}
const gel = (name) => document.getElementById(name)
setInterval(() => {
  ticktime += (Date.now() - player.lasttick)/1000
  player.lasttick = Date.now()
  player.xp[0] += ticktime*10*highRanks(player.levels,0)*levelMult(player.levels[0])
  for (let i = 0; i < player.levels.length; i++){
    if (player.xp[i] >= levelRequire(player.levels[i],i)){
      player.xp[i] -= levelRequire(player.levels[i],i)
      player.levels[i] += 1
      if (player.xp[i+1] == null){
        player.xp[i+1] = 0
        player.levels[i+1] = 0
      }
      player.xp[i+1] += 10*highRanks(player.levels,i+1)*levelMult(player.levels[i+1])
    }
  }
  gel("leveltime").innerHTML = makeInnerHTMLForLevelTime(player.levels,player.xp)
  ticktime = 0
},1000/60)