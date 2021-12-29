import { React, forwardRef } from "react";
import ImageToCanvasButton from "./ImageToCanvasButton";
import axios from "axios";
import { createCanvas } from "canvas";
//import Button from "./StyleComponents/Button"
import { Row } from "react-bootstrap";
import useWindowDimensions from "../CustomHooks/windowDimensions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CropBar = forwardRef(function (props, ref) {
  const { height, width } = useWindowDimensions();
  const history = useHistory();

  function crop() {
    let ctx = ref.current.getContext("2d");

    //we subtract by two to avoid cropping the red outline while cropping the image
    //and we shift the corner of the crop by two so re-adjust the croping position
    let cropingWidth = props.cropRect.width - 3;
    let cropingHeight = props.cropRect.height - 3;
    let cropingPostion_X = width / 2 - props.cropRect.width / 2 + 2;
    let cropingPostion_Y = height / 2 - props.cropRect.height / 1.4 + 2;

    let imgData = ctx.getImageData(
      cropingPostion_X,
      cropingPostion_Y,
      cropingWidth,
      cropingHeight
    );
    let tempCanvas = createCanvas(cropingWidth, cropingHeight);
    let tempCtx = tempCanvas.getContext("2d");
    tempCtx.putImageData(imgData, 0, 0);

    var dataURL = tempCanvas.toDataURL("image/jpeg", 0.5);
    var blob = dataURItoBlob(dataURL);
    var fd = new FormData();

    fd.append("canvasImage", blob);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(
      (response) => {
        let href = "https://www.wikipedia.org" + response.data.href;
        let breed = response.data.breed;
        //let paragraphs = response.data.paragraphs;
        let dog_or_human = response.data.dog_or_human;

        history.push({
          pathname: "/wiki",
          search: "?query=abc",
          state: {
            breed: breed,
            href: href,
           // paragraphs: paragraphs,
            image: dataURL,
            dog_or_human: dog_or_human,
          },
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async function drawUploadImage(data) {
    let img = data.image;
    let ctx = ref.current.getContext("2d");
    let resizedScales = resizeImage(
      img.width,
      img.height,
      ref.current.width,
      ref.current.height
    );
    let resizedImg = await createImageBitmap(img, {
      resizeWidth: resizedScales.width,
      resizeHeight: resizedScales.height,
      resizeQuality: "high",
    });
    ctx.drawImage(resizedImg, 0, 0);
    props.setImage(resizedImg);
  }
  //this function resizes images that far exceeds the size of the canvas.
  //this is useful to reduced the need to resize images when uploaded
  function resizeImage(width, height, canvasWidth, canvasHeight) {
    let ratio = 0.9; //default ratio incase both width and height are equal
    let resizeWidth = width;
    let resizeHeight = height;
    let isImageTooWide = width > canvasWidth;
    let isImageTooLong = height > canvasHeight;
    if (resizeWidth > resizeHeight) ratio = resizeWidth / resizeHeight;
    if (resizeWidth < resizeHeight) ratio = resizeHeight / resizeWidth;
    while (isImageTooWide || isImageTooLong) {
      if (resizeWidth > resizeHeight) {
        resizeWidth = resizeWidth - ratio * 5;
        resizeHeight = resizeHeight - 5;
      }
      if (resizeWidth < resizeHeight) {
        resizeWidth = resizeWidth - 5;
        resizeHeight = resizeHeight - ratio * 5;
      }
      isImageTooWide = resizeWidth > canvasWidth;
      isImageTooLong = resizeHeight > canvasHeight;
    }
    return { width: resizeWidth, height: resizeHeight };
  }

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  return (
    <div>
      <Row className="row justify-content-center pt-3  p-0 g-0">
        <ImageToCanvasButton
          drawUploadImage={drawUploadImage}
          className="col-2 bg-secondary m-1"
        />
        <Button
          onClick={crop}
          className="col-12 "
          variant="outline-warning"
          style={{ maxWidth: "15rem" }}
        >
          Check dog breed
        </Button>
      </Row>
    </div>
  );
});

export default CropBar;
