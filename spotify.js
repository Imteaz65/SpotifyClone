let songs;
let currSong=new Audio();
let firstTimeLoad=true;
let defSong=true;


// function to convert second to minute and second
function secToMinSec(SongInsec){
    const min=Math.floor(SongInsec/60);
    const leftSec=Math.floor(SongInsec%60);

    if(min<10){
        finalMin='0'+min;
    }
    else{
        finalMin=min;
    }

    if(leftSec<10){
        finalSec='0'+leftSec;
    }
    else{
        finalSec=leftSec;
    }

    return `${finalMin}:${finalSec}`;
}



const playMusic=function(music){

    if(firstTimeLoad===true){

      currSong.src=music;
      
      let songName;
      songName=`${music.replaceAll("./songs/","")}`;
      document.querySelector(".song-info").innerHTML=songName.replaceAll("128 Kbps.mp3","");
    
      play.classList="fa-solid fa-play";
      
      firstTimeLoad=false;

      console.log("firstTimeLoad")
    }

    // else if(defSong===true){

    //   currSong.load();

    //   currSong.src=music;
      
    //   currSong.play();
    //   let songName;
    //   songName=`${music.replaceAll("./songs/","")}`;
    //   document.querySelector(".song-info").innerHTML=songName.replaceAll("128 Kbps.mp3","");
    
    //   play.classList="fa-solid fa-pause";
      
    // }
  
    else{

        // currSong.pause();
    console.log("song changed")
      currSong.load();

      currSong.src=music;

      currSong.onloadeddata=function(){
        currSong.play();
      }
      
    //   currSong.play();
  
      // when the songs play it will make the play bar icon to pause
      play.classList="fa-solid fa-pause";
      songName=document.querySelector(".song-info");
      songName.innerHTML=music.slice(8).split("128")[0];

    }
      
}
  


// let songsPath;
// let songsPath0,songsPath1;

async function getAllSongs(){

    AnimalSong=['./songs/Kashmir Animal 128 Kbps.mp3','./songs/Hua Main Animal 128 Kbps.mp3','./songs/Abrars Entry Jamal Kudu Animal 128 Kbps.mp3','./songs/Satranga Animal 128 Kbps.mp3','./songs/Papa Meri Jaan Animal 128 Kbps.mp3','./songs/Kashmir Animal 128 Kbps.mp3','./songs/Hua Main Animal 128 Kbps.mp3','./songs/Abrars Entry Jamal Kudu Animal 128 Kbps.mp3'];

    partySong=['./songs/Saajan Ve Darshan Raval 128 Kbps.mp3','./songs/Jaan Denge Tumhe Laqshay Kapoor 128 Kbps.mp3','./songs/Urvashi Ikka 128 Kbps.mp3'];

    arijitSingh=['./songs/Channa Mereya 128 Kbps.mp3','./songs/Papa Meri Jaan Animal 128 Kbps.mp3'];

    romanticSongs=['./songs/Tum Kho Gaye Ho Kaha Saaj Bhatt 128 Kbps.mp3','./songs/Hua Main Animal 128 Kbps.mp3']

    sadSongs=['./songs/Husn Anuv Jain 128 Kbps.mp3','./songs/Tune Mere Jaana Emptiness 128 Kbps.mp3']

    oldSongs=['./songs/sona sona 128 Kbps.mp3','./songs/Tune Mere Jaana Emptiness 128 Kbps.mp3']

    atifAslam=['./songs/Saajan Ve Darshan Raval 128 Kbps.mp3']

    sana=['./songs/Kashmir Animal 128 Kbps.mp3']

    function loadSongs(path){
        // window.path
        // console.log(window[path],"WINDOW PATH")

        songs=[...window[path]]
        
        playMusic(songs[0]);

        const ulll=document.querySelector(".songList");
        ulll.innerHTML="";
        for(let i=0;i<songs.length;i++){

            ulll.innerHTML +=`<li class='songsName' data-info=${songs[i].replaceAll(' ','-')}> 
                                <div class='music-logo'>
                                    <i class='fa-solid fa-music'></i>
                                </div>

                                <div class='songMovieName'> 
                                    <div class=songName>${songs[i].slice(8).split("128")[0]}</div>  
                                    <div class=authorName>imteaz</div>
                                </div>

                                <div class='playNowButton'>
                                    <span class=playButton>Play Now</span>
                                    <i class='fa-solid fa-play'></i>
                                </div>
                            </li>`;
            
        }

        ulll.addEventListener("click",function(event){

            if(event.target.classList.contains("songsName")){
                console.log(event.target.dataset.info.replaceAll('-',' '));
                defSong=false;

                playMusic(event.target.dataset.info.replaceAll('-',' '))
            }
            else if(event.target.classList.contains("fa-music") || event.target.classList.contains("songName") || event.target.classList.contains("authorName") || event.target.classList.contains("playButton") ||event.target.classList.contains("fa-play") ){

                console.log(event.target.parentNode.parentNode)
                console.log(event.target.parentNode.parentNode.dataset.info.replaceAll('-',' '))

                defSong=false;
                playMusic(event.target.parentNode.parentNode.dataset.info.replaceAll('-',' '));
            }
            
        })

    }

    loadSongs("AnimalSong")

    document.querySelector(".spotify-playlist").addEventListener("click",function(e){
        
        if(e.target.tagName.toLowerCase()==='p' || e.target.tagName.toLowerCase()==='h2' || e.target.tagName.toLowerCase()==="img" || e.target.classList.contains("play")){

            defSong=true;
            loadSongs(e.target.parentNode.getAttribute("id"))
        }
        else if (e.target.classList.contains("card")){
            defSong=true;
            loadSongs(e.target.getAttribute("id"))
            
        }        
    })
    
}


async function main(){

    // songs=await getAllSongs();
    await getAllSongs();

    play.addEventListener("click",function(){

        //when .paused will check the song is paused orn not if paused then it will play the current song and change its icon
        if(currSong.paused){
            
            currSong.play();
            play.classList="fa-solid fa-pause";

        }
        else{

            currSong.pause();
            play.classList="fa-solid fa-play";
        }
        
    });
    
    // for the very first time when page loads it will display the song duration witho NaN(will wait for metadata to load when it loads then it will show actual duration of songs)
    currSong.addEventListener("loadedmetadata",function(){

        document.querySelector(".songTime").innerHTML=`${secToMinSec(currSong.currentTime)}:${secToMinSec(currSong.duration)}`;

    });


    //addEventListener to currSong for providing currentTime and duration of currentSong
    currSong.addEventListener("timeupdate",function(){

        if(defSong===true){

            currSong.addEventListener("loadedmetadata",function(){

                document.querySelector(".songTime").innerHTML=`${secToMinSec(currSong.currentTime)}:${secToMinSec(currSong.duration)}`;

            })
            defSong=false;

        }
        else{

            if(!isNaN(currSong.duration)){

                document.querySelector(".songTime").innerHTML=`${secToMinSec(currSong.currentTime)}:${secToMinSec(currSong.duration)}`;

                document.querySelector(".songTime").innerHTML=`${secToMinSec(currSong.currentTime)}:${secToMinSec(currSong.duration)}`;
    
                document.querySelector(".circle").style.width=(currSong.currentTime/currSong.duration)*100+"%";
            }
            
            
        }

        currSong.addEventListener("ended",function(){
            console.log("ended")
        })
        
    });



    
    // addEventListener to seekbar
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        
        let seekbarWidth=document.querySelector(".seekbar").offsetWidth;

        document.querySelector(".circle").style.width=(e.offsetX/seekbarWidth)*100+"%";
        
        currSong.currentTime=(e.offsetX/seekbarWidth)*currSong.duration;

    });



    //addEventListener to hamburger
    const hamburger=document.querySelector(".hamburger");
    hamburger.addEventListener("click",function(){

        document.querySelector(".left").style.left="0";
    });




    //addEventListener to hamburger
    const close=document.querySelector(".close");
    close.addEventListener("click",function(){

        document.querySelector(".left").style.left="-100%";
        
    });


    

    // addEventListener to backward button to play previous songs
    const backward=document.getElementById("backward");
    backward.addEventListener("click",function(){

        let index;
        index=songs.indexOf(currSong.getAttribute("src"));

        if((index)>=1){

            playMusic(songs[index-1]);
        }
    });




    //addEventListener to forward button to play next songs
    const forward=document.getElementById("forward");
    forward.addEventListener("click",function(){

        let index;
        index=songs.indexOf(currSong.getAttribute("src"));
        
        if((index+1)<songs.length){

            playMusic(songs[index+1]);
        }

    });




    //add evenListener to handle to increase or decrease sound
    document.querySelector(".sound").getElementsByTagName("input")[0].addEventListener("change",function(e){

         currSong.volume=parseInt(e.target.value)/100;
    });


}

main();