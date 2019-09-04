function audioFileLoader(soundFile)
{
    var soundObj = {};

    var compressor = audioContext.createDynamicsCompressor();
    
    function compReductionMeter()
    {
        var reduction = compressor.reduction;
        var bar = $(".compression-meter");
        bar.height((-1 * reduction) + "%");
        requestAnimationFrame(compReductionMeter);
    }

    soundObj.fileDirectory = soundFile;


    var getSound = new XMLHttpRequest();


    getSound.open("get", soundObj.fileDirectory ,true);

    getSound.responseType = "arraybuffer";


    getSound.onload = function()
    {
    audioContext.decodeAudioData(getSound.response, function(buffer){
        soundObj.soundToPlay = buffer;
    });
    };

    getSound.send();

    soundObj.play = function()
    {

        $(".compression-meter").css("display", "block");
        compressor.threshold.value = -50;
        compressor.ratio.value = 20;
        var playSound = audioContext.createBufferSource();

        playSound.buffer = soundObj.soundToPlay;
        playSound.connect(compressor);
        compressor.connect(audioContext.destination);
        playSound.start(audioContext.currentTime);
        console.log(compressor.reduction.value);
        compReductionMeter()
    }
return soundObj;
};

var snare = audioFileLoader("snare.wav");
window.addEventListener("keydown",snare.play, false);

