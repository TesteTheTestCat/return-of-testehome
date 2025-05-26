import { format, intformat, timeformat } from "./format.js";
const framespersecond = 60
const tickspersecond = 30
let maxticks = 10000
const gel = (name) => document.getElementById(name)
let player = {
    sillytime: 0,
    clickssincelastreset: 0,
    fastsilly: 0,
    increasesilly: 0,
    silliest: 0,
    femboys: 0,
    cutepower: 10000,
    // [top (F11~F14), middle (F21~F24), bottom(F31~F32)]
    femboyupgrades: [0,0,0,0, 0,0,0,0, 0,0],
    lasttick: Date.now()
}
let currenttab = 0
function showtext(){
  //always here
  gel("sillytime").textContent = timeformat(player.sillytime)
  gel("sillygain").textContent = timeformat((1+player.silliest)*((0.001)*(player.fastsilly+1))*cutepowerboost(player.cutepower)*(1+0.5*player.femboyupgrades[0])*(1+(0.05*player.increasesilly)*player.femboyupgrades[4])*(clickpowerboost(player.clickssincelastreset)))
  if(player.femboyupgrades[8] == 1){
    gel("tb_2").style.display = "inline"
  }
  else {
    gel("tb_2").style.display = "none"
  }

  // tab zero
  gel("b_fastsilly").textContent = timeformat(0.020*(1.55**(player.fastsilly-player.femboyupgrades[3]-player.femboyupgrades[6])))
  gel("b_increasesilly").textContent = timeformat(0.15*(1.35**player.increasesilly))
  if (player.silliest != 1){gel("b_thesilliest").textContent = timeformat(5400)}
  else {gel("b_thesilliest").textContent = "MAX"}
  gel("sillyclick").textContent = timeformat((1+player.silliest)*((player.increasesilly+4)*0.00025*(1+1*player.femboyupgrades[1])))

  //tab one
    gel("femboys").textContent = intformat(player.femboys)
    gel("femboycost").textContent = timeformat(nextfemboy(player.femboys+1))
    gel("cutepower").textContent = format(player.cutepower)
    gel("cuteboost").textContent = format(cutepowerboost(player.cutepower))
    let upgnumbers = ["f11","f12","f13","f14","f21","f22","f23","f24","f31","f32"]
    for (let i in upgnumbers){
      if (player.femboyupgrades[i] == 1){gel("bfu_"+upgnumbers[i]).classList = ["femboyupgradebought"]}
      else {gel("bfu_"+upgnumbers[i]).classList = ["femboyupgradeunbought"]}
    }
}
function assignonclick(){
    let tabnumbers = ["0","1","-1"]
    for (let i in tabnumbers){
      gel("tb_"+tabnumbers[i]).onclick = () => {tabstuff(parseInt(tabnumbers[i]))}
    }
    const besilly = gel("b_besilly")
    besilly.onclick = () => {player.sillytime += (1+player.silliest)*((player.increasesilly+4)*0.00025*(1+1*player.femboyupgrades[1])); player.clickssincelastreset+=1}

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
    if (player.sillytime >= 0.020*(1.55**(player.fastsilly-player.femboyupgrades[3]-player.femboyupgrades[6]))){
      player.sillytime -= 0.020*(1.55**(player.fastsilly-player.femboyupgrades[3]-player.femboyupgrades[6]))
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
  let costs = [100,100,250,375, 1000,1250,1500,2500, 5000,10000]
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
function clickpowerboost(x){
  return 1+(((Math.log2(x+1))/3.7)*player.femboyupgrades[7])
}
function timespend(time){
  if (time > maxticks/tickspersecond){
    return time/maxticks
  }
  else {
    return 1/tickspersecond
  }
}
tabstuff(0)
assignonclick()
let ticktime = 0
setInterval(() => {
  ticktime += (Date.now() - player.lasttick)/1000
  player.lasttick = Date.now()
  while(ticktime > 1/tickspersecond){
    player.sillytime += (1+player.silliest)*((0.001*timespend(ticktime))*(player.fastsilly+1))*cutepowerboost(player.cutepower)*(1+0.5*player.femboyupgrades[0])*(1+(0.05*player.increasesilly)*player.femboyupgrades[4])*(clickpowerboost(player.clickssincelastreset))
    player.cutepower += (player.femboys/tickspersecond)*(1+0.2*player.femboyupgrades[2])*(1+0.5*player.femboyupgrades[5])

    ticktime -= timespend(ticktime)
  }
  showtext()
},1000/framespersecond)