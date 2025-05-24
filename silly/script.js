import { format, intformat } from "./format.js";
const framespersecond = 60
const tickspersecond = 30
const gel = (name) => document.getElementById(name)
let player = {
    sillytime: 0,
    lasttick: Date.now()
}
function showtext(){
  gel("sillytime").textContent = format(player.sillytime)+"s"
}
ticktime = 0
setInterval(() => {
  ticktime += (Date.now() - player.lasttick)/1000
  player.lasttick = Date.now()
  while(ticktime > 1/tickspersecond){
    player.sillytime += 1/tickspersecond

    ticktime -= 1/tickspersecond
  }
  showtext()
},1000/framespersecond)