function audioFileLoader(soundFile)
{
var soundObj = {};

soundObj.fileDirectory = soundFile;

var getSound = new XMLHttpRequest();

getSound.open("get", soundObj.fileDirectory ,true);
getSound.responseType = "arraybuffer";

getSound.onload = function(){
    audioContext.decodeAudioData(getSound.response, function(buffer){
        soundObj.soundToPlay = buffer;
    });

};

getSound.send();

soundObj.play = function(){

//gain and get buffer
    var playSound = audioContext.createBufferSource();

    playSound.buffer = soundObj.soundToPlay;
    playSound.connect(audioContext.destination);
    playSound.start(audioContext.currentTime);
}
return soundObj;
}


