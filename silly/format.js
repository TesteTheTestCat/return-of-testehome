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
  // post-1e128
  else if (x < 1e128){
    let log10x = Math.floor(Math.log10(x))
    let xoverl10x = x/(10**log10x)
    if (xoverl10x >= 10){
      return ((xoverl10x/10).toFixed(2)+eee[0]+((log10x+1)))
    }
    else {
      return ((xoverl10x).toFixed(2)+eee[0]+((log10x)))
    }
  }
  else if (x >= 1e128){
    let log10x = Math.floor(Math.log10(x))
    return eee[1]+(log10x.toFixed(5))
  }
}
export function intformat(x){
  return Math.floor(x).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}
export function timeformat(x){
  if (x < 1){
    return format(x*1000)+"ms"
  }
  if (x < 60){
    return format(x)+"s"
  }
  if (x < 3600){
    return intformat(x/60)+"m"+format(x%60)+"s"
  }
  if (x < 86400){
    return intformat(x/3600)+"h"+format((x/60)%60)+"m"
  }
  if (x < 604800){
    return intformat(x/86400)+"d"+format((x/3600)%24)+"h"
  }
  if (x < 2629743.12){
    return intformat(x/604800)+"w"+format((x/86400)%7)+"d"
  }
  if (x < 31556917.44){
    return intformat(x/2629743.12)+"mo"+format((x/604800)%4.3481202381)+"w"
  }
  return intformat(x/31556917.44)+"y"+format((x/2629743.12)%12)+"mo"
}