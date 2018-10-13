let fileInput = document.getElementById('background');
let fileBtn = document.getElementById('background-btn');
let background_image_name = document.getElementById('background-image-name');
let userNameInput = document.getElementById('name');
let name_box = document.getElementById('name-box');
let preview_img = document.getElementById('preview');

let fileName;
let userName;
let fileData;

let resolutionData = [
    {
        width:16,
        height:10
    },
    {
        width:5,
        height:3
    },
    {
        width:16,
        height:9
    },
    {
        width:4,
        height:3
    },
    {
        width:5,
        height:4
    },
    {
        width:3,
        height:2
    }
];

function save_options() {
    userName = userNameInput.value;
    chrome.storage.local.set({
        'hangul_clock':{
            userName : userName,
            fileName : fileName,
            fileData : fileData
        }
    }, function() {
        alert('저장에 성공했습니다');
    });
  }
function restore_options() {
    chrome.storage.local.get('hangul_clock', function(items) {
        userName = items.hangul_clock.userName;
        fileName = items.hangul_clock.fileName;
        fileData = items.hangul_clock.fileData;
        if(typeof(userName) == 'string'){
    
            userNameInput.value = items.hangul_clock.userName;
        }
        
        if(typeof(fileName) == 'string'){
            background_image_name.innerHTML = items.hangul_clock.fileName;
            if(typeof(fileData) == 'string'){
                preview_img.src = items.hangul_clock.fileData;
            }
        
        }        
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);

fileInput.addEventListener('change',(e)=>{
    if(fileInput.files[0].name != undefined){
        let reader = new FileReader();
        reader.onload = (e)=>{
            let preview_img_data = new Image();
            preview_img_data.src = e.target.result;

            preview_img_data.onload = (imgEvent)=>{
                let preview_img_width = imgEvent.path[0].width;
                let preview_img_height = imgEvent.path[0].height;

                let resolution = getImageResolution(preview_img_width , preview_img_height);
                if(resolution == false){
                    alert('노트북 해상도('+screen.width+'x'+screen.height+')에 맞는 이미지를 올려주세요');
                }
                else{
                    fileName = fileInput.files[0].name;
                    background_image_name.innerHTML = fileName;
                    fileData =  e.target.result;
                    preview_img.src = e.target.result;       
                }
            }
        }
        reader.readAsDataURL(fileInput.files[0]);

    }
});

let getImageResolution = (width , height)=>{
    for(i in resolutionData){
    
        if(width%resolutionData[i].width == 0 && height%resolutionData[i].height == 0){
            return true;
        }

        if(i == (resolutionData.length - 1)){
            return false;
        }
    }
}