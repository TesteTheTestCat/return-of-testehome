import { format, intformat, timeformat } from "./format.js";
const framespersecond = 60
const tickspersecond = 30
const gel = (name) => document.getElementById(name)
let player = {
    sillytime: 0,
    fastsilly: 0,
    increasesilly: 0,
    silliest: 0,
    femboys: 1,
    cutepower: 0,
    // [top (F11~F14), middle (F21~F24), bottom(F31~F32)]
    femboyupgrades: [0,0,0,0, 0,0,0,0, 0,0],
    lasttick: Date.now()
}
let currenttab = 0
function showtext(){
  //always here
  gel("sillytime").textContent = timeformat(player.sillytime)
  gel("sillygain").textContent = timeformat((1+player.silliest)*((0.001)*(player.fastsilly+1))*cutepowerboost(player.cutepower))

  // tab zero
  gel("b_fastsilly").textContent = timeformat(0.020*(1.55**player.fastsilly))
  gel("b_increasesilly").textContent = timeformat(0.15*(1.35**player.increasesilly))
  if (player.silliest != 1){gel("b_thesilliest").textContent = timeformat(5400)}
  else {gel("b_thesilliest").textContent = "MAX"}
  gel("sillyclick").textContent = timeformat((1+player.silliest)*((player.increasesilly+4)*0.00025))

  //tab one
    gel("femboys").textContent = intformat(player.femboys)
    gel("femboycost").textContent = timeformat(nextfemboy(player.femboys+1))
    gel("cutepower").textContent = format(player.cutepower)
    gel("cuteboost").textContent = format(cutepowerboost(player.cutepower))
    let upgnumbers = ["f11","f12","f13","f14","f21","f22","f23","f24","f31","f32"]
    for (let i in upgnumbers){
      if (femboyupgrades[i] == 1){gel("bfu_"+upgnumbers[i]).class = "femboyupgradebought"}
      else {gel("bfu_"+upgnumbers[i]).class = "femboyupgradeunbought"}
    }
}
function assignonclick(){
    let tabnumbers = ["0","1","-1"]
    for (let i in tabnumbers){
      gel("tb_"+tabnumbers[i]).onclick = () => {tabstuff(parseInt(tabnumbers[i]))}
    }
    const besilly = gel("b_besilly")
    besilly.onclick = () => {player.sillytime += (1+player.silliest)*((player.increasesilly+4)*0.00025)}

    const speedup = gel("b_fastsilly")
    speedup.onclick = () => {buyitem(1)}
    const increaseup = gel("b_increasesilly")
    increaseup.onclick = () => {buyitem(2)}
    const sillinessupg = gel("b_thesilliest")
    sillinessupg.onclick = () => {buyitem(3)}

    const prestigeoffemboys = gel("b_femboyprestige")
    prestigeoffemboys.onclick = () => {femboyprestige()}
    let upgnumbers = ["f11","f12","f13","f14","f21","f22","f23","f24","f31","f32"]
    for (let i in upgnumbers){
      gel("bfu_"+upgnumbers[i]).onclick = () => {buyupgrade(i)}
    }
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
function buyupgrade(a){
  costs = [100,100,250,375, 1000,1250,1500,2500, 5000,10000]
  if (player.cutepower >= costs[a] && player.femboyupgrades[a] != 1){
    player.femboyupgrades[a] = 1
    player.cutepower -= costs[a]
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
function nextfemboy(count){
  return 2.5*(count**2)
}
function femboyprestige(){
  if (player.sillytime >= nextfemboy(player.femboys+1)){
    player.sillytime = 0
    player.increasesilly = 0
    player.fastsilly = 0
    player.silliest = 0
    player.cutepower = 0
    player.femboys += 1
  }
}
function cutepowerboost(x){
  if (x < 1000000){return 1+(Math.log10(x+1)/3)}
  else {return 3}
}
tabstuff(0)
assignonclick()
let ticktime = 0
setInterval(() => {
  ticktime += (Date.now() - player.lasttick)/1000
  player.lasttick = Date.now()
  while(ticktime > 1/tickspersecond){
    player.sillytime += (1+player.silliest)*((0.001/tickspersecond)*(player.fastsilly+1))*cutepowerboost(player.cutepower)
    player.cutepower += (player.femboys/tickspersecond)

    ticktime -= 1/tickspersecond
  }
  showtext()
},1000/framespersecond)