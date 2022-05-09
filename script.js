const WIDTH = 1958;
const HEIGHT = 745;

const addImage = (url, x, y, width, height) => {
  var imageObj = new Image();
  imageObj.src = url;
  imageObj.onload = function () {
    var yoda = new Konva.Image({
      x: x,
      y: y,
      image: imageObj,
      width: width,
      height: height,
    });

    // add the shape to the layer
    layer.add(yoda);
  };
}

const addText = (options) => {
  var simpleText = new Konva.Text(options);
  layer.add(simpleText);
}

var stage = new Konva.Stage({
  container: 'container',
  width: WIDTH,
  height: HEIGHT,
});

var layer = new Konva.Layer();

addImage('./images/bg.png', 0, 0, WIDTH, HEIGHT);

// add the layer to the stage
stage.add(layer);


// generate result
document.getElementById('btn').addEventListener('click', function () {
  const jobTitle = document.getElementById('job-title').value;
  const title = document.getElementById('title').value;
  const desc1 = document.getElementById('desc1').value;
  const desc2 = document.getElementById('desc2').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const file = document.getElementById('preview').src;
  addText({
    x: 523,
    y: 146,
    text: jobTitle,
    fontSize: 43,
    fontFamily: 'Poppins',
    width: 400,
    fontStyle: 'bold',
    align: 'center',
    lineHeight: 1.75,
    fillLinearGradientStartPoint: { x: -50, y: -50 },
    fillLinearGradientEndPoint: { x: 50, y: 50 },
    fillLinearGradientColorStops: [1, '#EACF8A', 0.5, '#714A21'],
    shadowColor: 'black',
    shadowBlur: 4,
    shadowOffset: { x: 4, y: 4 },
    shadowOpacity: 0.25,
  });

  addText({
    x: 180,
    y: 243,
    text: title,
    fontSize: 59,
    fontFamily: 'Poppins',
    width: 1115,
    fontStyle: 'bold',
    align: 'center',
    lineHeight: 1.75,
    fillLinearGradientStartPoint: { x: -50, y: -50 },
    fillLinearGradientEndPoint: { x: 50, y: 50 },
    fillLinearGradientColorStops: [1, '#EACF8A', 0.5, '#714A21'],
    shadowColor: 'black',
    shadowBlur: 4,
    shadowOffset: { x: 4, y: 4 },
    shadowOpacity: 0.25,
  });

  addText({
    x: 180,
    y: 324,
    text: desc1,
    fontSize: 64,
    fontFamily: 'Great Vibes',
    width: 1115,
    align: 'center',
    lineHeight: 1.75,
    fill: 'white',
    shadowColor: 'black',
    shadowBlur: 4,
    shadowOffset: { x: 4, y: 4 },
    shadowOpacity: 0.25,
  });
  addText({
    x: 180,
    y: 415,
    text: desc2,
    fontSize: 65,
    fontFamily: 'PoppinsRegular',
    width: 1115,
    align: 'center',
    fill: 'white',
    lineHeight: 1.75,
    shadowColor: 'black',
    shadowBlur: 4,
    shadowOffset: { x: 4, y: 4 },
    shadowOpacity: 0.25,
  });
  addText({
    x: 413,
    y: 573,
    text: phone,
    fontSize: 24,
    fontFamily: 'PoppinsRegular',
    width: 200,
    fill: 'white',
    shadowColor: 'black',
    shadowBlur: 2,
    shadowOffset: { x: 2, y: 2 },
    shadowOpacity: 0.25,
    lineHeight: 1.75,
  });
  addText({
    x: 413,
    y: 613,
    text: address,
    fontSize: 24,
    fontFamily: 'PoppinsRegular',
    width: 700,
    fill: 'white',
    shadowColor: 'black',
    shadowBlur: 2,
    shadowOffset: { x: 2, y: 2 },
    shadowOpacity: 0.25,
    lineHeight: 1.75,
  });

  var imageObj = new Image();
  imageObj.src = file;
  imageObj.onload = function () {
    var yoda = new Konva.Image({
      x: 1270,
      y: 131,
      image: imageObj,
      width: 410,
      height: 410,
      draggable: true
    });

    // add the shape to the layer
    layer.add(yoda);
  };
})

/**
 *
 * Crop avatar image
 *
 */
var cropper = null;
var avtImgElm = document.getElementById('avt_img');
document.getElementById('avt').addEventListener('change', function (e) {
  if (e.target.files[0]) {
    avtImgElm.classList.remove('visually-hidden');
    avtImgElm.src = URL.createObjectURL(e.target.files[0]);
    if (cropper) {
      cropper.destroy();
    }
    cropper = new Cropper(avtImgElm, {
      aspectRatio: 1
    });
    avtImgElm.value = null;
  } else {
    avtImgElm.classList.add('visually-hidden')
    alert('File not found')
  }
})

var preview = document.getElementById('preview');
var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  keyboard: false
})

function getRoundedCanvas(sourceCanvas) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
  context.fill();
  return canvas;
}
document.getElementById('btn-crop').addEventListener('click', function () {
  if (cropper) {
    var canvas = cropper.getCroppedCanvas({
      width: 440,
      height: 440,
    });
    preview.src = getRoundedCanvas(canvas).toDataURL();
    preview.classList.remove('visually-hidden');
    myModal.toggle();
  } else {
    preview.classList.add('visually-hidden');
  }
})

/**
 *
 * download export image
 *
 */

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

document.getElementById('download').addEventListener('click', function () {
  var dataURL = stage.toDataURL({ pixelRatio: 3 });
  downloadURI(dataURL, 'image.png');
})


