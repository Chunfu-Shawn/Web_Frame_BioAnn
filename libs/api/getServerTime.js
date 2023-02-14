export function getServerTime(){
    const time = new Date().toISOString()
    return new Promise((resolve, reject) => {
        resolve({serverTime:time})
    })
}