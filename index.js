const DailyTimer = document.getElementById('DailyTimer')
const WeeklyTimer = document.getElementById('WeeklyTimer')


function updateTime() {

    let today = new Date();
    hour = 23 - today.getHours();
    minutes = 60 - today.getMinutes();
    seconds = 60 - today.getSeconds();
    DailyTimer.innerHTML = `${hour}<span>:</span>${formatTime(minutes)}<span>:</span>${formatTime(seconds)}`;
    if(localStorage.getItem('Day') != today.getDate()){
        resetDaily();
        localStorage.setItem('Day', today.getDate());
    }
    setTimeout(updateTime, 1000);
}

function formatTime(num){
    return (parseInt(num, 10) < 10 ? '0' : '') + num
}

function updateWeeklyTime(){
    let today = new Date();
    let difference = (today.getTime() + 259200000)%604800000
    hour = 167 - Math.floor(difference/1000/60/60);
    minutes = 60 - Math.floor((difference/1000/60)%60);
    seconds = 60 - Math.floor((difference/1000)%60);
    WeeklyTimer.innerHTML = `${hour}<span>:</span>${formatTime(minutes)}<span>:</span>${formatTime(seconds)}`;

    currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(),0,1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
    if(localStorage.getItem('Week') != result){
        resetWeekly();
        localStorage.setItem('Week', result);
    }

    
    setTimeout(updateWeeklyTime, 1000);
}

function toggleStar(id, value){
    let on = "./images/Star_03.png";
    let off = "./images/Star_02.png"

    if(localStorage.getItem(id) === null){
        localStorage.setItem(id, on);
        document.getElementById(id).getElementsByTagName('img')[0].src = on;
        updateValue(value);
    } else if(localStorage.getItem(id) == on){
        localStorage.setItem(id, off);
        document.getElementById(id).getElementsByTagName('img')[0].src = off;
        updateValue(value * -1);
    } else {
        localStorage.setItem(id, on);
        document.getElementById(id).getElementsByTagName('img')[0].src = on;
        updateValue(value);
    }
    checkParentStar();
}

function toggleSub(id){
    if(document.getElementById(id).style.display != 'none'){
        console.log(document.getElementById(id).style.display);
        document.getElementById(id).style.display = 'none';
    } else{
        console.log(document.getElementById(id).style.display);
        document.getElementById(id).style.display = 'flex';
    }
}

function loadStars(){
   var starList = document.getElementsByClassName('popout');
   Array.prototype.forEach.call(starList, function(star){
       star.getElementsByTagName('img')[0].src = localStorage.getItem(star.id);
   })
        
}

function changeColor(){
console.log(document.getElementById('myselect').value);
}

function checkParentStar(){
    let on = "./images/Star_03.png";
    let off = "./images/Star_02.png";
    if(localStorage.getItem('Daily1') == on && localStorage.getItem('Daily2') == on && localStorage.getItem('Daily3') == on){
        console.log('ding');
        document.getElementById('Daily').getElementsByClassName('starTitle')[0].src = on;
    } else {
        document.getElementById('Daily').getElementsByClassName('starTitle')[0].src = off;
    }
    if(localStorage.getItem('Weekly1') == on && localStorage.getItem('Weekly2') == on && localStorage.getItem('Weekly3') == on){
        document.getElementById('Weekly').getElementsByClassName('starTitle')[0].src = on;
    } else {
        document.getElementById('Weekly').getElementsByClassName('starTitle')[0].src = off;
    } 
    if(localStorage.getItem('Event1') == on && localStorage.getItem('Event2') == on && localStorage.getItem('Event3') == on){
        document.getElementById('Event').getElementsByClassName('starTitle')[0].src = on;
    } else{
        document.getElementById('Event').getElementsByClassName('starTitle')[0].src = off;
    }
    if(localStorage.getItem('Other1') == on && localStorage.getItem('Other2') == on){
        document.getElementById('Other').getElementsByClassName('starTitle')[0].src = on;
    } else{
        document.getElementById('Other').getElementsByClassName('starTitle')[0].src = off;
    }
}

var Daily = ['Daily1','Daily2','Daily3','Event1','Event2','Event3','Other1','Other2'];
var Weekly = ['Weekly1','Weekly2','Weekly3'];


function resetDaily(){
    let off = "./images/Star_02.png"
    Array.prototype.forEach.call(Daily, function(ele){
        localStorage.setItem(ele, off)
    })
    loadStars();
}
function resetWeekly(){
    let off = "./images/Star_02.png"
    Array.prototype.forEach.call(Weekly, function(ele){
        localStorage.setItem(ele, off)
    })
    resetValue();
    loadStars();
}
function updateValue(value){
    if(!localStorage.getItem('Value')){
        localStorage.setItem('Value', value);
    } else{
        localStorage.setItem('Value', parseInt(localStorage.getItem('Value')) + value)
    }
    document.getElementById('Value').innerHTML = `Points accumulated this week: ${localStorage.getItem('Value')} `
}
function resetValue(){
    localStorage.setItem('Value', 0);
}
loadStars();
updateTime();
updateWeeklyTime();
loadStars();
checkParentStar();
updateValue(0);
