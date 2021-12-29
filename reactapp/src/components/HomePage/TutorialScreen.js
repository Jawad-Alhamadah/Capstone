import { React, useEffect } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useWindowDimensions from "../CustomHooks/windowDimensions";

//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//Photo by Andrej Lišakov on Unsplash

//Photo by Adrienn87 form PxHere
function TutorialScreen() {
    const { height, width } = useWindowDimensions();
    useEffect(() => {
     
        const secondPageBackGroundObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const image = entry.target.querySelectorAll("img");
            if (entry.isIntersecting) {
              image.forEach((s) => s.classList.add("custom-fade-in", "slide-down"));
              return; // if we added the class, exit the function
            }
            // We're not intersecting, so remove the class!
            image.forEach((s) =>
              s.classList.remove("custom-fade-in", "slide-down")
            );
          });
        });
        secondPageBackGroundObserver.observe(
          document.querySelector(".square-wrapper2")
        );
    
        const secondPageCardObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const text = entry.target.querySelectorAll("div");
            if (entry.isIntersecting) {
              text.forEach((s) => s.classList.add("custom-fade-in"));
              return; // if we added the class, exit the function
            }
            // We're not intersecting, so remove the class!
            text.forEach((s) => s.classList.remove("custom-fade-in"));
          });
        });
        secondPageCardObserver.observe(document.querySelector(".square-wrapper3"));
      }, []);
  return (
       
    <div id="main-content" className="bg-color-darkGray ">
    <div className="square-wrapper2">
      <img src="f28.png" height={height} width={width} id="second-page-background"></img>
    </div>
    <div className=" custom-flex-center">
      <div className="square-wrapper3">
        <div style={{ width: "27rem", height: "30rem" }} className="card-glassy text-white">
          <Card.Img variant="top" src="whatdidyousayaboutme.png " />
          <Card.Body>
            <Card.Title>Upload and Crop</Card.Title>
            <Card.Text>
              upload an image. Resize it, move it to position and Crop! We
              will give you as much product information as we can
            </Card.Text>
            <Button
              variant="outline-info"
              href="crop"
              className=" custom-font-size-2 custom-font-bold custom-font-family"
            >
              LETS GO!
            </Button>
          </Card.Body>
        </div>
      </div>
    </div>
  </div>
  );
}

export default TutorialScreen;
