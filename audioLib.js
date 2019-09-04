function audioFileLoader(soundFile, impulseFile)
{
var soundObj = {};
soundObj.fileDirectory = soundFile;
soundObj.impulseDirectory = impulseFile;
//-----------------------------------
var getSound = new XMLHttpRequest();

getSound.open("get", soundObj.fileDirectory ,true);
getSound.responseType = "arraybuffer";

getSound.onload = function(){
    audioContext.decodeAudioData(getSound.response, function(buffer){
        soundObj.soundToPlay = buffer;
    });
}
    getSound.send();
//-------------------------------------
var getImpulse = new XMLHttpRequest();

getImpulse.open("get", soundObj.fileDirectory ,true);
getImpulse.responseType = "arraybuffer";

getImpulse.onload = function(){
    audioContext.decodeAudioData(getImpulse.response, function(Impulsebuffer){
        soundObj.ImpulseToPlay = Impulsebuffer;
});
}
    getImpulse.send();



soundObj.play = function(gainVal, rate){

    var volume = audioContext.createGain();
    var drymix = audioContext.createGain();
    var wetmix = audioContext.createGain();
    var mix = audioContext.createGain();

    drymix.gain.value = 1;
    wetmix.gain.value = 0.4;

    mix.gain.value = 0.8;

    volume.gain.value = gainVal;

    var playSound = audioContext.createBufferSource();
    var convolve = audioContext.createConvolver();
    var delay = audioContext.createDelay(1);
    delay.delayTime.value = 0.2;
    var filter = audioContext.createBiquadFilter()
    filter.frequency.value = 1000;

    convolve.buffer = soundObj.ImpulseToPlay;
    playSound.playbackRate.value = rate;
    playSound.buffer = soundObj.soundToPlay;

//node graph routing
    playSound.connect(delay);
    delay.connect(wetmix);
    wetmix.connect(filter);
    filter.connect(delay);

    playSound.connect(drymix)

    drymix.connect(mix)
    wetmix.connect(mix)
    
    mix.connect(audioContext.destination);
    playSound.start(audioContext.currentTime);
}
return soundObj;
}

var snare = audioFileLoader("snare.wav", "church.wav");

function mousePressed()
{
    snare.play(1, 1);
}

window.addEventListener("mousedown",mousePressed, false);

