import { format, intformat } from "./format.js";
let ticktime = 0
let player = {
    lasttick: Date.now(),
    levels: [0],
    xp: [0],
}
function levelRequire(lv,t){
  let lvp = lv
  let p = 100-(10*t)
  if (p < 80){p = 80}
  if (lv > 1000){lvp *= 1+(0.01*(lv-1000))}
  return (p*(1+(0.05*lvp)))
}
const gel = (name) => document.getElementById(name)
setInterval(() => {
  ticktime += (Date.now() - player.lasttick)/1000
  player.lasttick = Date.now()
  player.xp[0] += ticktime
  if (player.xp[0] > levelRequire(player.levels[0],0)){
    player.xp[0] -= levelRequire(player.levels[0],0)
    player.levels[0] += 1
  }
  gel("leveltime").innerHTML = `Level ${intformat(player.levels[0])}, ${format(player.xp[0])}/${format(levelRequire(player.levels[0],0))}
  <br>0% boost from higher tiers (${1} XP/s)<br><progress max="${levelRequire(player.levels[0],0)}" value="${player.xp[0]}"><br>`
  ticktime = 0
},1000/60)