export function format(x,l=true){
  let eee = ["*10^","10^"]
  if (l){
    let eee = ["e","e"]
  }
  // very low value
  if (x < 1e-6){
    return "0"
  }
  // 1e-6 to 1
  else if (x < 1){
    return "1/"+(x**-1).toFixed(2)
  }
  // 0.1 to 1000
  else if(x < 1000){
    return x.toFixed(2)
  }
  // 1e3 to 1e9
  else if (x < 1e9){
    return x.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
  }
  // post 1e9
  else{
    let log10x = Math.floor(Math.log10(x))
    let xoverl10x = x/(10**log10x)
    if (xoverl10x >= 10){
      return ((xoverl10x/10).toFixed(2)+eee[0]+((log10x+1)))
    }
    else {
      return ((xoverl10x).toFixed(2)+eee[0]+((log10x)))
    }
  }
}
export function intformat(x){
  return Math.floor(x).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}