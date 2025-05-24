import { format, intformat, timeformat } from "./format.js";
const framespersecond = 60
const tickspersecond = 30
const gel = (name) => document.getElementById(name)
let player = {
    sillytime: 0,
    fastsilly: 0,
    increasesilly: 0,
    silliest: 0,
    lasttick: Date.now()
}
let currenttab = 0
function showtext(){
  gel("sillytime").textContent = timeformat(player.sillytime)
  gel("sillygain").textContent = timeformat((1+player.silliest)*(0.001*(player.fastsilly+1)))
  if (currenttab == 0){
  gel("b_fastsilly").textContent = timeformat(0.020*(1.55**player.fastsilly))
  gel("b_increasesilly").textContent = timeformat(0.15*(1.35**player.increasesilly))
  if (player.silliest != 1){gel("b_thesilliest").textContent = timeformat(5400)}
  else {gel("b_thesilliest").textContent = "MAX"}
  gel("sillyclick").textContent = timeformat((1+player.silliest)*((player.increasesilly+4)*0.00025))
  }
}
function assignonclick(){
    let tabnumbers = [0,1,-1]
    for (let i in tabnumbers){
      gel("tb_"+i).onclick = () => {tabstuff(tabnumbers[i])}
    }
    const besilly = gel("b_besilly")
    besilly.onclick = () => {player.sillytime += (1+player.silliest)*((player.increasesilly+4)*0.00025)}

    const speedup = gel("b_fastsilly")
    speedup.onclick = () => {buyitem(1)}
    const increaseup = gel("b_increasesilly")
    increaseup.onclick = () => {buyitem(2)}
    const sillinessupg = gel("b_thesilliest")
    sillinessupg.onclick = () => {buyitem(3)}
}
function buyitem(a){
  if (a == 1){
    if (player.sillytime >= 0.020*(1.55**player.fastsilly)){
      player.sillytime -= 0.020*(1.55**player.fastsilly)
      player.fastsilly += 1
    }
  }
  if (a == 2){
    if (player.sillytime >= 0.150*(1.35**player.increasesilly)){
      player.sillytime -= 0.150*(1.35**player.increasesilly)
      player.increasesilly += 1
    }
  }
  if (a == 3){
    if ((player.silliest >= 5400) && (player.silliest != 1)){
      player.sillytime -= 5400
      player.silliest = 1
    }
  }
}
function tabstuff(tab){
  let tabnumbers = [0,1,-1]
  for (let i in tabnumbers){
    let k = tabnumbers[i]
    if (k == tab){
       gel("tab_"+k).style.display = "inline"
    }
    else {
      gel("tab_"+k).style.display = "none"
    }
}}
tabstuff(0)
assignonclick()
let ticktime = 0
setInterval(() => {
  ticktime += (Date.now() - player.lasttick)/1000
  player.lasttick = Date.now()
  while(ticktime > 1/tickspersecond){
    player.sillytime += (1+player.silliest)*((0.001/tickspersecond)*(player.fastsilly+1))

    ticktime -= 1/tickspersecond
  }
  showtext()
},1000/framespersecond)