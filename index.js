(function(){
    'use strict';
    var ffmpeg = require('fluent-ffmpeg');
    var util = require('util');    

    function probeStream(myurl){
        ffmpeg.ffprobe(myurl, function(err, metadata) {
            console.dir(metadata);
        })
    }
    
    function startStream(myurl){

        ffmpeg(myurl)
        .on('start', function(commandLine) {
            console.log('Spawned Ffmpeg with command: ' + commandLine);
        })
        .on('codecData', function(data) {
            console.log('Input is ' + data.audio + ' audio ' +
              'with ' + data.video + ' video');
        })
        .on('progress', function(progress) {
            console.log('Processing: ' + JSON.stringify(progress));
        })
        // .on('stderr', function(stderrLine) {
        //     console.log('Stderr output: ' + stderrLine);
        // })
        .on('error', function(err, stdout, stderr) {
            console.log('Cannot process video: ' + err.message);
        })
        .on('end', function(stdout, stderr) {
            console.log('Transcoding succeeded !');
        })
        .save('/tmp/abc.264');;
        
    }

    var myurl="rtsp://192.168.1.99/live/av0?user=beyond&passwd=abcd1234";
    // probeStream(myurl);
    startStream(myurl);
})();
