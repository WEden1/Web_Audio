$(function(){

var isPlay = false;
var tempo = 300;

var current16thnote = 1;
var futureTickTime = 0.0;
var timerID = 0;

var kick = audioFileLoader("kick.mp3");
var snare = audioFileLoader("snare.mp3");
var hats = audioFileLoader("hihat.mp3");
var shake = audioFileLoader("shaker.mp3")

track1 = [];
track2 = [];
track3 = [];
track4 = [];




function futureTick(){
    
    var secondsPerBeat = tempo/60;

    futureTickTime += secondsPerBeat; //____can be any time value. 0.5 happens 
        //____to be a quarter note at 120 bpm
        
    current16thnote++
    if(current16thnote>16)
    {
        current16thnote=1;
    }

}

function checkIfRecordedAndPlay(trackArray, sndToPlay, gridBeat, timeVal)
{
    for(i = 0;i<trackArray.length;i++)
    {
        if(gridBeat === trackArray[i])
        {
            sndToPlay.play(timeVal)
        }
    }
};

function scheduleNote(beatDivisionNumber,time){

    $("#metro-" + (beatDivisionNumber)).effect("pulsate",{
        times:1
    },10);

    checkIfRecordedAndPlay(track1, kick, beatDivisionNumber, time)
    checkIfRecordedAndPlay(track2, snare, beatDivisionNumber, time)
    checkIfRecordedAndPlay(track3, hats, beatDivisionNumber, time)
    checkIfRecordedAndPlay(track4, shake, beatDivisionNumber, time)

    removeDuplicates(track1);
    removeDuplicates(track2);
    removeDuplicates(track3);
    removeDuplicates(track4);


}

function scheduler() {
    while (futureTickTime < audioContext.currentTime + 0.1) {
        scheduleNote(current16thnote,futureTickTime);
        futureTick();
    }

    timerID = window.setTimeout(scheduler, 50.0)
}

play = function()
{
    isPlay = !isPlay;

    if(isPlay){

        current16thNote = 1;
        futureTickTime = audioContext.currentTime;
        scheduler();
        return "stop";
    }
        else
        {
            window.clearTimeout(timerID);
            return("play");
        }
};

$("#play-button").on("click", function(){
    play();
})

function removeDuplicates(arr){

    for(i =0;i<arr.length;i=+1)
    {
        for(j=i+1;j<arr.length;j=+1)
        {
            if(arr[i]===arr[j])
            {
                arr.splice(i,1);
            }
        }
    };
}


function drumPadAction(domElement, domElementGrid, arrayTrack, sound)
{
    $(domElement).on("mousedown", function(){

    $(domElementGrid + (current16thnote)).css("background-color", "red");

    if(!isPlay)
    {
        sound.play(audioContext.currentTime)
    }  
    arrayTrack.push(current16thnote);
});
}

drumPadAction("#drumPad-track1", "#kick-", track1, kick);
drumPadAction("#drumPad-track2", "#snare-", track2, snare);
drumPadAction("#drumPad-track3", "#Hat-", track3, hats);
drumPadAction("#drumPad-track4", "#shake-", track4, shake);


})