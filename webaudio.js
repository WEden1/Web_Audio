"use strict"
function audioContextCheck()
{
if (typeof AudioContext !== "undefined")
{
    return new AudioContext();
} 
else if (typeof webkitAudioContext !== "undefined")
{
    return new webkitAudioContext();
}
else if (typeof mozAudioContext !== "undefined")
{
    return new mozAudioContext();
}
else 
{
    throw new Error("AudioContext not supported");
}
}


var audioContext = audioContextCheck();

var osc = audioContext.createOscillator();
var gainosc = audioContext.createGain();
var filter = audioContext.createBiquadFilter();

osc.type = "square";
filter.frequency.value = 500;
gainosc.gain.value = 0.1;

osc.connect(gainosc);
gainosc.connect(filter);
filter.connect(audioContext.destination)
osc.start(audioContext.currentTime);