 function getFetch(userSearch){
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBIMHTv7NHdM1mYSKZ1iW4-i3MYqeUA8UM&type=video&q=${userSearch}`)
                .then(response => response.json())
                .then(data =>{
                    let videoArr = new VideoObj(data)
                    return data
                })
}
let link = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
async function getRandomWord(){
    let response = await fetch(link)
    data = await response.json();
    return data[0].word
}

async function changeWord(){
    let word = getRandomWord()
    let oldWord = document.getElementById("main-container-video-Words")
    oldWord.innerText = await word
    
}
let button = document.getElementById("button")
button.addEventListener("click", function(){
    changeWord()
})

changeWord()
class VideoObj{
    constructor(data){
        this.videoArr = []  

        for(let current of data.items){
            this.videoArr.push(new Video(current))
        }

    }  
}

class Video{
    constructor(video){
        this.video = video.items
        
    }
}
 
class User{
    constructor(){
        
        
    }
    getUserInput(){
        let userInput = document.getElementById("user-input")
        return userInput.value
    } 
    getThumbnails(videoData){

         for(let i = 0; i < videoData.length; ++i){
            let thumbNailDiv = document.querySelector(".main-container-sidebar-video-section")
            let thumbNailNewDiv = document.createElement("div")
            thumbNailNewDiv.setAttribute("class", "thumbNail")

            thumbNailNewDiv.style.background = `url("${videoData[i].snippet.thumbnails.default.url}")`
            thumbNailDiv.appendChild(thumbNailNewDiv)
        } 
        /* for(let i = 0; i < videoData; ++i){
            console.log("hej")
            let thumbNailDiv = document.querySelector(".main-container-sidebar-video-section")
            let thumbNailNewDiv = document.createElement("div")
            thumbNailNewDiv.setAttribute("class", "thumbNail")

            thumbNailNewDiv.style.background = `url("https://media.npr.org/assets/artslife/arts/2010/08/fresh-air-country-music-week/john-doe/john-doe-d81af8d8ece6ad67d13d8d8c5a6de27b66406ad5.jpg")`
            thumbNailDiv.appendChild(thumbNailNewDiv)
        } */
    }
    deleteThumbnails(){
        let thumbNailDiv = document.querySelectorAll(".main-container-sidebar-video-section")
        let child = thumbNailDiv[0].lastChild

        while(child){
            thumbNailDiv.removeChild(child)
            let child = thumbNailDiv[0].lastChild
        }
    }
    changeVideo(videoData){
        let allThumbnails = document.querySelectorAll(".thumbNail")
        let iframeVideo = document.getElementById("iframeV")        
        
        for(let i = 0; i < allThumbnails.length; ++i){    
            allThumbnails[i].addEventListener("click", function(){
                iframeVideo.setAttribute("src", `https://www.youtube.com/embed/${videoData[i].id.videoId}`)
            })
        }
    }
}
let user = new User()



document.addEventListener("DOMContentLoaded", function (e) {
    let searchButton = document.querySelector(".main-header-searchbox-content button")
    let click = 0; 
    searchButton.addEventListener("click", async function(){
        ++click
        if(click>1){
            user.deleteThumbnails()
        }
        //Ta bort data
        let videoData = await getFetch(user.getUserInput())
        user.getThumbnails(videoData.items)
        user.changeVideo(videoData.items)
        
    })

    let shownVideo = document.querySelector(".main-container-video iframe")    
})