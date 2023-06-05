
function geolocationSupport() {
  // if ('geoloction' in navigator){
  //   return true
  // }
  // return false
  return 'geolocation' in navigator
}

const defaultOptions ={
  enableHighAccuracy: true,
  timeout:5000,
  maximumAge:10000
}
export function getCurrentPosition(options = defaultOptions){
  if (!geolocationSupport()) throw new Error('No hay soporte de geolocalización en tu navegador')
  
  return new Promise((resolve, reject) =>{
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      resolve(position)
    }, () => {
        reject('No hemos podido obtener tu ubicación')
      }, options)
  })
}

export async function getLanLon(options = defaultOptions){
  try{
    const { coords: { latitude: lat, longitude: lon } } = await getCurrentPosition(options)
    return {lat, lon, isError: false}
  } catch{
   return {isError:true, lat:null, lon:null}
  }
}