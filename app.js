function wave() {
    console.log("Waveform START");
    var canvas = document.querySelector('.visualizer');
    var canvasCtx = canvas.getContext("2d");
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();
    var distortion = audioCtx.createWaveShaper();
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported');
        var constraints = {audio: true}
        navigator.mediaDevices.getUserMedia (constraints)
           .then(
             function(stream) {
               source = audioCtx.createMediaStreamSource(stream);
               source.connect(analyser);
               analyser.connect(distortion);
               distortion.connect(audioCtx.destination);
           })
           .catch( function(err) { console.log('getUserMedia error: ' + err);})
     } else {
        console.log('getUserMedia not supported!');
     }
     
     analyser.fftSize = 2048;
     var bufferLength = analyser.frequencyBinCount;
     var dataArray = new Uint8Array(bufferLength);
     canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
     function draw() {
      var drawVisual = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      canvasCtx.beginPath();
      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;
      for(var i = 0; i < bufferLength; i++) {
   
         var v = dataArray[i] / 128.0;
         var y = v * HEIGHT/2;
 
         if(i === 0) {
           canvasCtx.moveTo(x, y);
         } else {
           canvasCtx.lineTo(x, y);
         }
 
         x += sliceWidth;
       }
       canvasCtx.lineTo(canvas.width, canvas.height/2);
       canvasCtx.stroke();
     };
     draw();
}

function bar() {
   console.log("Bar START");
   var canvas = document.querySelector('.Barvisualizer');
   var canvasCtx = canvas.getContext("2d");
   var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
   var analyser = audioCtx.createAnalyser();
   var distortion = audioCtx.createWaveShaper();
   WIDTH = canvas.width;
   HEIGHT = canvas.height;
   if (navigator.mediaDevices.getUserMedia) {
       console.log('getUserMedia supported');
       var constraints = {audio: true}
       navigator.mediaDevices.getUserMedia (constraints)
          .then(
            function(stream) {
              source = audioCtx.createMediaStreamSource(stream);
              source.connect(analyser);
              analyser.connect(distortion);
              distortion.connect(audioCtx.destination);
          })
          .catch( function(err) { console.log('getUserMedia error: ' + err);})
    } else {
       console.log('getUserMedia not supported!');
    }
    
      analyser.fftSize = 256;
      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);
      var dataArray = new Uint8Array(bufferLength);
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      function draw() {
      drawVisual = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;
      for(var i = 0; i < bufferLength; i++) {
         barHeight = dataArray[i]/2;
 
         canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
         canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);
 
         x += barWidth + 1;
       }
     };
    draw();
}



