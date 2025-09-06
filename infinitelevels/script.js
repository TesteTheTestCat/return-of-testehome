player = {
    levels: [0],
    xp: [0],
}
const gel = (name) => document.getElementById(name)
setInterval(() => {
  gel("leveltime").textContent = "mrrreeeow <br> nyaaaaa"
},1000/60)