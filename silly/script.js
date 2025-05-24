import { format, intformat, timeformat } from "./format.js";
const framespersecond = 60
const tickspersecond = 30
const gel = (name) => document.getElementById(name)
let player = {
    sillytime: 0,
    lasttick: Date.now()
}
function showtext(){
  gel("sillytime").textContent = timeformat(player.sillytime)
}
function assignonclick(){
    const besilly = gel("b_besilly")
    besilly.onclick = () => {player.sillytime += 1}
}

assignonclick()
let ticktime = 0
setInterval(() => {
  ticktime += (Date.now() - player.lasttick)/1000
  player.lasttick = Date.now()
  while(ticktime > 1/tickspersecond){
    player.sillytime += 1/tickspersecond

    ticktime -= 1/tickspersecond
  }
  showtext()
},1000/framespersecond)