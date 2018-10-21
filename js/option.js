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
    let data = {
        userName:userName,
        fileName:fileName,
        fileData:fileData
    }

    if(userNameInput.value == "" || userNameInput.value == undefined){
        delete data.userName;
    }

    if(fileInput.value == "" || fileInput.value == undefined){
        delete data.fileData;
        delete data.fileName;
    }

    chrome.storage.local.set({
        'hangul_clock': data
    }, function() {
        chrome.notifications.create({
            title: '한글시계',
            iconUrl: 'image/hangul_clock128.png',
            type: 'basic',
            message: '유저 정보 저장에 성공하였습니다'
          }, function() {
              window.close();
          });
    });
  }
function restore_options() {
    chrome.storage.local.get('hangul_clock', function(items) {
        if(items.hangul_clock != undefined){
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
        }      
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);

fileInput.addEventListener('change', (e)=>{
    if(fileInput.files[0].name != undefined){
        let reader = new FileReader();
        reader.onload = (e)=>{
            let preview_img_data = new Image();
            preview_img_data.src = e.target.result;

            preview_img_data.onload = (imgEvent)=>{
                let preview_img_width = imgEvent.path[0].width;
                let preview_img_height = imgEvent.path[0].height;

                getImageResolution(preview_img_width , preview_img_height).then((resolution)=>{
                    if(resolution == false){
                        let returnString = '노트북 해상도('+screen.width+'x'+screen.height+')에\n맞는 이미지를 올려주세요';
                        console.log(chrome.notifications.create);
                        chrome.notifications.create({
                            title: '한글시계',
                            iconUrl: 'image/hangul_clock128.png',
                            type: 'basic',
                            message: returnString
                          }, function() {});
                    
                    }
                    else{
                        fileName = fileInput.files[0].name;
                        background_image_name.innerHTML = fileName;
                        fileData =  e.target.result;
                        preview_img.src = e.target.result;       
                    }
                });
            }
        }
        reader.readAsDataURL(fileInput.files[0]);

    }
},false);

let getImageResolution = async (width , height)=>{
    for(i in resolutionData){
    
        if(width%resolutionData[i].width == 0 && height%resolutionData[i].height == 0){
            return new Promise(data=>{
                data(true);
            });
        }

        if(i == (resolutionData.length - 1)){
            return new Promise(data=>{
                data(false);
            });
        }
    }
}