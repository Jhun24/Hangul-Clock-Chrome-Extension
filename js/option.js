let fileInput = document.getElementById('background');
let fileBtn = document.getElementById('background-btn');
let background_image_name = document.getElementById('background-image-name');
let userNameInput = document.getElementById('name');
let name_box = document.getElementById('name-box');
let fileName;
let userName;
function save_options() {
    userName = userNameInput.value;
    console.log(userName);
    console.log(fileName);
    chrome.storage.local.set({
        'hangul_clock':{
            userName : userName,
            fileName : fileName
        }
    }, function() {
        alert('저장에 성공했습니다');
    });
  }
function restore_options() {
    chrome.storage.local.get('hangul_clock', function(items) {
        console.log(items.hangul_clock.userName);
        userName = items.hangul_clock.userName;
        fileName = items.hangul_clock.fileName;
        console.log(typeof(userName))
        if(typeof(userName) == 'string'){
            name_box.classList.add('is-focused');
            userNameInput.value = items.hangul_clock.userName;
        }
        
        if(typeof(fileName) == 'string'){
            background_image_name.innerHTML = items.hangul_clock.fileName;
        }        
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);

fileInput.addEventListener('change',(e)=>{
    if(fileInput.files[0].name != undefined){
        fileName = fileInput.files[0].name;
        background_image_name.innerHTML = fileName;

    }
});