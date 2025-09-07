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
function makeInnerHTMLForLevelTime(){
  j = ""
  for (let i = 0; i < player.levels.length; i++){
    let k = `Level ${intformat(player.levels[i])}, ${format(player.xp[i])}/${format(levelRequire(player.levels[i],i))}
  <br>0% boost from higher tiers<br><progress max="${levelRequire(player.levels[i],i)}" value="${player.xp[i]}"><br>`
  j += k
  }
  return j
}
const gel = (name) => document.getElementById(name)
setInterval(() => {
  ticktime += (Date.now() - player.lasttick)/1000
  player.lasttick = Date.now()
  player.xp[0] += ticktime*10
  for (let i = 0; i < player.levels.length; i++){
    if (player.xp[i] > levelRequire(player.levels[i],i)){
      player.xp[i] -= levelRequire(player.levels[i],i)
      player.levels[i] += 1
      player.xp[i+1] += 10
    }
  }
  gel("leveltime").innerHTML = makeInnerHTMLForLevelTime()
  ticktime = 0
},1000/60)