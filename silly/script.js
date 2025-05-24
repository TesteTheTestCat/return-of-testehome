const framespersecond = 60
const tickspersecond = 30
const gel = (name) => document.getElementById(name)
let player = {
    sillytime: 0,
    lasttick: Date.time()
}
function showtext(){
  gel("sillytime").textContent = player.sillytime.toFixed(2)+"s"
}
setInterval(() => {
  ticktime = Date.time() - lasttick
  player.lasttick = Date.time()
  while(ticktime > 1/tickspersecond){
    player.sillytime += 1/tickspersecond

    ticktime -= 1/tickspersecond
  }
  showtext()
},1000/framespersecond)