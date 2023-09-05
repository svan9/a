/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {number} recordTime - seconds
 */
function startRecording({canvas, recordTime, onend}) {
	const chunks = [];
	const stream = canvas.captureStream();
	const rec = new MediaRecorder(stream); 

	rec.ondataavailable = (e) => chunks.push(e.data);
	rec.onstop = (e) => onend(new Blob(chunks, {type: "video/webm"}));

	rec.start();
	setTimeout(() => rec.stop(), recordTime*1000);
}

function roundedImage({ctx}, x,y,width,height,radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function exportVid(filename = "output", blob) {
	const a = document.createElement("a");
	a.download = filename+".webm";
	a.href = URL.createObjectURL(blob);
	a.textContent = "download the video";
	document.body.appendChild(a);
  // a.click();
  // a.remove();
}

var 
  canvas = document.body.querySelector("canvas"),
  ctx    = canvas.getContext("2d"),
  input  = document.body.querySelector(".file input[type=file]");  


input.addEventListener("change", function(ev) {
  var lbl = this.parentNode.querySelector("label");
  lbl.classList.add("hidden");
  this.style.display = "none";
  drawVideo({file:this.files[0], canvas, 
    onend: function(blob) {
      const a = document.createElement("a");
      a.download = "output.webm";
      a.href = URL.createObjectURL(blob);
      a.textContent = "download";
      lbl.innerHTML = "";
      
      canvas.style.opacity = "10%";

      lbl.appendChild(a);
      lbl.classList.remove("hidden");
  }});
});

/**
 * 
 * @param {{file: File, canvas: HTMLCanvasElement}} 
 */
function drawVideo({file, canvas, onend}) {
  if (file.type != "video/mp4") return; // throw Error("bad type");

  canvas.width = 512;
  canvas.height = 512;

  let ctx = canvas.getContext("2d");
  let video = document.createElement("video");
  video.src = URL.createObjectURL(file);
  
  video.play();
  draw();
  startRecording({canvas, recordTime: 3, onend})

  function draw() {
    ctx.save();
    roundedImage({ctx}, 0, 0, 512, 512, 40);
    ctx.clip();
    ctx.drawImage(video,0,0,512,512);
    ctx.restore();
    requestAnimationFrame(draw);
  }
}
