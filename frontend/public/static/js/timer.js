let nowTime = new Date();
document.getElementById("subtime").innerText = nowTime.toLocaleString('en-US');
let t = setInterval(time,1000);//开始执行

function time()
{
    let dt = new Date();
    let runtime = dt - nowTime;
    let hour = Math.round(runtime / 3600000);
    let minutes = Math.floor((runtime % 3600000) / 60000);
    let second = Math.floor((runtime % 60000) / 1000);
    let showTime =  hour + " : "+ minutes + " : " + second;
    document.getElementById("timer").innerText = showTime;
}