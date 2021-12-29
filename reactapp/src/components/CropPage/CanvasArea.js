import { React, forwardRef, useEffect, useState } from "react";
import useWindowDimensions from "../CustomHooks/windowDimensions";

const CanvasArea = forwardRef(function (props, ref) {
  let [image, setImage] = useState(props.image);
  let [scale, setScale] = useState(1);
  const { height, width } = useWindowDimensions();
  let [ctx, setCtx] = useState("");
  let [isMouseDown, setIsMouseDown] = useState(false);
  let [resizedImage, setResizedImage] = useState(undefined);
  let [isMount, setIsMount] = useState(false);
  let [postion, setPostion] = useState({
    x: 0,
    y: 0,
    PrevX: 0,
    PrevY: 0,
  });

  useEffect(() => {
    setCtx(ref.current.getContext("2d"));
    setScale(props.sliderScale);
  }, []);

  useEffect(() => {
    setScale(props.sliderScale);
    if (props.image !== "") rescaleImage();
  }, [props.sliderScale]);
  async function rescaleImage() {
    let ratio = (scale - 50) / 70;
    ctx.fillStyle = "#262a31";
    ctx.fillRect(0, 0, width, height);
    let resizedImg = await createImageBitmap(image, {
      resizeWidth: Math.ceil(image.width + image.width * ratio),
      resizeHeight: Math.ceil(image.height + image.height * ratio),
      resizeQuality: "high",
    });
    setResizedImage(resizedImg);
    ctx.drawImage(resizedImg, postion.x, postion.y);
    let centered_X = width / 2 - props.cropRect.width / 2;
    let centered_Y = height / 2 - props.cropRect.height / 1.4;

    let unshadedArea = ctx.getImageData(
      centered_X,
      centered_Y,
      props.cropRect.width,
      props.cropRect.height
    );

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "Red";
    ctx.putImageData(unshadedArea, centered_X, centered_Y);
    ctx.strokeRect(
      centered_X,
      centered_Y,
      props.cropRect.width,
      props.cropRect.height
    );
  }

  useEffect(() => {
    console.log("heeh");
  }, []);
  useEffect(() => {
    if (props.image !== "") setImage(props.image);
  }, [props.image]);

  useEffect(() => {
    if (image !== "") drawCanvasImage({ clientX: 0, clientY: 0 });
  }, [image]);

  useEffect(() => {
    if (image !== "") drawCanvasImage({ clientX: 0, clientY: 0 });
  }, [width, height]);

  async function handleMouseDown(event) {
    setPostion((prevState) => ({
      ...prevState,
      PrevX: event.clientX,
      PrevY: event.clientY,
    }));
    setIsMouseDown(true);
  }

  function handleMouseUp(event) {
    setIsMouseDown(false);
  }
  function handleMouseMove(event) {
    if (isMouseDown && image !== "") drawCanvasImage(event);
    if (event.clientY < 195) setIsMouseDown(false);
  }
  async function drawCanvasImage(event) {
    let ratio = (scale - 50) / 70;
    let resizedImg;
    if (!isMount) {
      setIsMount(true);

      resizedImg = await createImageBitmap(image, {
        resizeWidth: Math.ceil(image.width + image.width * ratio),
        resizeHeight: Math.ceil(image.height + image.height * ratio),
        resizeQuality: "high",
      });
      setResizedImage(resizedImg);
    } else {
      resizedImg = resizedImage;
    }
    console.log(resizedImg);

    let centered_X = width / 2 - props.cropRect.width / 2;
    let centered_Y = height / 2 - props.cropRect.height / 1.4;
    ctx.fillStyle = "#262a31";
    ctx.fillRect(0, 0, width, height);
    let imgX = postion.x + (event.clientX - postion.PrevX);
    let imgY = postion.y + (event.clientY - postion.PrevY);

    ctx.drawImage(resizedImg, imgX, imgY);
    if (isMouseDown)
      setPostion((prevState) => ({
        ...prevState,
        PrevX: event.clientX,
        PrevY: event.clientY,
        x: imgX,
        y: imgY,
      }));
    let unshadedArea = ctx.getImageData(
      centered_X,
      centered_Y,
      props.cropRect.width,
      props.cropRect.height
    );

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "Red";
    ctx.putImageData(unshadedArea, centered_X, centered_Y);
    ctx.strokeRect(
      centered_X,
      centered_Y,
      props.cropRect.width,
      props.cropRect.height
    );
  }

  return (
    <canvas
      ref={ref}
      width={width}
      height={height - 200}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    ></canvas>
  );
});

export default CanvasArea;
