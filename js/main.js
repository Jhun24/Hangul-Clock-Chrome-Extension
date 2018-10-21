let hour = document.getElementById('hour');
let hour_one = document.getElementById('hour-one');
let hour_two = document.getElementById('hour-two');
let hour_three = document.getElementById('hour-three');
let hour_four = document.getElementById('hour-four');
let hour_five = document.getElementsByClassName('hour-five');
let hour_six = document.getElementsByClassName('hour-six');
let hour_seven = document.getElementsByClassName('hour-seven');
let hour_eight = document.getElementsByClassName('hour-eight');
let hour_nine = document.getElementsByClassName('hour-nine');
let hour_ten = document.getElementById('hour-ten');
let hour_eleven = document.getElementById('hour-eleven');
let hour_twelve = document.getElementById('hour-twelve');

let minute = document.getElementById('minute');
let minute_ten = document.getElementById('minute-ten');
let minute_twenty = document.getElementById('minute-twenty');
let minute_third = document.getElementById('minute-third');
let minute_fourty = document.getElementById('minute-fourty');
let minute_fifty = document.getElementById('minute-fifty');
let minute_one = document.getElementById('minute-one');
let minute_two = document.getElementById('minute-two');
let minute_three = document.getElementById('minute-three');
let minute_four = document.getElementById('minute-four');
let minute_five = document.getElementById('minute-five');
let minute_six = document.getElementById('minute-six');
let minute_seven = document.getElementById('minute-seven');
let minute_eight = document.getElementById('minute-eight');
let minute_nine = document.getElementById('minute-nine');

let hangul_clock_box = document.getElementById('hangul-clock');
let hangul_clock_text = document.getElementById('hangul-clock-text');
let hangul_clock_user_name = document.getElementById('hangul-clock-user-name');
let lisense = document.getElementById('lisense');

let nowHour = 0;
let nowMinute = 0;

let userName;
let fileData;
let fileName;

let hourArray = [
    hour , hour_one , hour_two , hour_three , hour_four , hour_five , hour_six , hour_seven , hour_eight , hour_nine , hour_ten , hour_eleven , hour_twelve
]

let firstPlaceMinuteArray = [   
    minute_ten,
    minute_twenty,
    minute_third,
    minute_fourty,
    minute_fifty
]


let secondPlaceMinuteArray = [
    minute , minute_one , minute_two , minute_three , minute_four , minute_five , minute_six , minute_seven , minute_eight , minute_nine , minute_ten
]

let restore_options= ()=>{
    chrome.storage.local.get('hangul_clock', function(items) { 
        if(items.hangul_clock != undefined){
            if(items.hangul_clock.userName != 'undefined'){
                userName = items.hangul_clock.userName;
                hangul_clock_user_name.innerHTML = userName + "님!"
            }
    
            if(items.hangul_clock.fileName != 'undefined' && items.hangul_clock.fileData != 'undefined'){
                fileName = items.hangul_clock.fileName;
                fileData = items.hangul_clock.fileData;
                document.getElementsByTagName('body')[0].style.backgroundImage = 'url('+fileData+')';
            }
            else{
                document.getElementsByTagName('body')[0].style.backgroundImage = "url('../image/bg.jpeg')";
            }    
        } 
        else{
            document.getElementsByTagName('body')[0].style.backgroundImage = "url('../image/bg.jpeg')";
        }    
    });
}

let initAnimate = ()=>{
    hangul_clock_box.classList.add('animated','fadeIn');
    lisense.classList.add('animated','slideInUp');
    hangul_clock_text.classList.add('animated','slideInUp');
    hangul_clock_user_name.classList.add('animated','slideInDown');
}

let hangul_clock = (callback)=>{
    let hour = (new Date().getHours()) % 12;

    if(hour == 0){
        hour = 12;
    }
    let minute = new Date().getMinutes();

    nowHour = hour;
    nowMinute = minute;

    let firstPlaceMinute = Math.floor(minute/10);

    let secondPlaceMinute = minute%10;

    let changeHour = hourArray[hour];
    if(changeHour.length == 2){
        changeHour[0].classList.add('check');
        changeHour[1].classList.add('check');
    }
    else{
        changeHour.classList.add('check');
    }

    if(hour > 10){
        hourArray[10].classList.add('check');
    }

    if(firstPlaceMinute != 0){
        let firstPlaceChangeMinute = firstPlaceMinuteArray[(firstPlaceMinute-1)];
        let secondPlaceChangeMinute = secondPlaceMinuteArray[secondPlaceMinute];
    
        if((firstPlaceMinute-1) != 0){
            firstPlaceMinuteArray[0].classList.add('check');
        }
     
        firstPlaceChangeMinute.classList.add('check');
        secondPlaceChangeMinute.classList.add('check');
        hourArray[0].classList.add('check');
        secondPlaceMinuteArray[0].classList.add('check');
    }
    else{
        let secondPlaceChangeMinute = secondPlaceMinuteArray[secondPlaceMinute];

        secondPlaceChangeMinute.classList.add('check');
        hourArray[0].classList.add('check');
        secondPlaceMinuteArray[0].classList.add('check');
    }
    setInterval(callback,1000);
}


let getTime = ()=>{
    let hour = (new Date().getHours()) % 12;

    if(hour == 0){
        hour = 12;
    }
    let minute = new Date().getMinutes();
    if(nowHour != hour || nowMinute != minute ){
        nowHour = hour;
        nowMinute = minute;
        changeHangulTimer(nowHour , nowMinute);   
    }
    
}

let changeHangulTimer = (numberHour , numberMinute)=>{
    clear();

    let firstPlaceMinute = Math.floor(numberMinute/10);

    let secondPlaceMinute = numberMinute%10;

    let changeHour = hourArray[numberHour];
    if(changeHour.length == 2){
        changeHour[0].classList.add('check');
        changeHour[1].classList.add('check');
    }
    else{
        changeHour.classList.add('check');
    }

    if(numberHour > 10){
        hourArray[10].classList.add('check');
    }

    if(firstPlaceMinute != 0){
        let firstPlaceChangeMinute = firstPlaceMinuteArray[(firstPlaceMinute-1)];
        let secondPlaceChangeMinute = secondPlaceMinuteArray[secondPlaceMinute];
    
        if((firstPlaceMinute-1) != 0){
            firstPlaceMinuteArray[0].classList.add('check');
        }
     
        firstPlaceChangeMinute.classList.add('check');
        secondPlaceChangeMinute.classList.add('check');
        hourArray[0].classList.add('check');
        secondPlaceMinuteArray[0].classList.add('check');
    }
    else{
        let secondPlaceChangeMinute = secondPlaceMinuteArray[secondPlaceMinute];

        secondPlaceChangeMinute.classList.add('check');
        hourArray[0].classList.add('check');
        secondPlaceMinuteArray[0].classList.add('check');

    }
}

let clear = ()=>{
    hour.classList.remove('check');
    hour_one.classList.remove('check');
    hour_two.classList.remove('check');
    hour_three.classList.remove('check');
    hour_four.classList.remove('check');
    hour_five[0].classList.remove('check');
    hour_five[1].classList.remove('check');
    hour_six[0].classList.remove('check');
    hour_six[1].classList.remove('check');
    hour_seven[0].classList.remove('check');
    hour_seven[1].classList.remove('check');
    hour_eight[0].classList.remove('check');
    hour_eight[1].classList.remove('check');
    hour_nine[0].classList.remove('check');
    hour_nine[1].classList.remove('check');
    hour_ten.classList.remove('check');
    hour_eleven.classList.remove('check');
    hour_twelve.classList.remove('check');

    minute.classList.remove('check');
    minute_ten.classList.remove('check');
    minute_twenty.classList.remove('check');
    minute_third.classList.remove('check');
    minute_fourty.classList.remove('check');
    minute_fifty.classList.remove('check');
    minute_one.classList.remove('check');
    minute_two.classList.remove('check');
    minute_three.classList.remove('check');
    minute_four.classList.remove('check');
    minute_five.classList.remove('check');
    minute_six.classList.remove('check');
    minute_seven.classList.remove('check');
    minute_eight.classList.remove('check');
    minute_nine.classList.remove('check');
}

// let history = ()=>{
//     chrome.topSites.get((items)=>{
//         for(i = 0; i<6; i++){
        
//             let html = '<div class="data">'
//             html += '<a href="'+items[i].url+'">'
//             html += '<div class="preIcon">'+items[i].title[0]+'</div>'
//             if(items[i].title.length > 9){
//                 html += '<div class="title">'+items[i].title.substring(0,7)+'...'+'</div>'
//             }
//             else{
//                 html += '<div class="title">'+items[i].title+'</div>'
//             }
//             html += '</a>'
//             html += '</div>'

//             document.getElementById('side-bar-data').innerHTML = document.getElementById('side-bar-data').innerHTML + html;
//         }
//     });
// }

window.onload = ()=>{
    initAnimate();
    // history();
    hangul_clock(getTime);
}
document.addEventListener('DOMContentLoaded', restore_options);