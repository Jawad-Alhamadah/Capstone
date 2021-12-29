import { React, useEffect } from "react";
import { Row, Button } from "react-bootstrap";

//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//Photo by Andrej Lišakov on Unsplash

//Photo by Adrienn87 form PxHere
function HomeScreen(props) {
  useEffect(() => {
    const firstPageTextObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const text = entry.target.querySelectorAll("div");

        if (entry.isIntersecting) {
          text.forEach((s) => s.classList.add("custom-title-main"));

          return; // if we added the class, exit the function
        }
        // We're not intersecting, so remove the class!
        text.forEach((s) => s.classList.remove("custom-title-main"));
      });
    });
    firstPageTextObserver.observe(document.querySelector(".square-wrapper"));
  }, []);
  return (
    <Row id="main-content" className="  bg-color-white  gx-0 ">
      <div className="col-4 gx-4 custom-margin-left square-wrapper ">
        <div className="  custom-font-size-big   custom-margin-top-10 text-black  custom-font-bold custom-font-family capitalize">
          you are a {props.dog_or_human} !
        </div>
        <div className="  custom-font-size-big custom-font-bold custom-font-family capitalize">
          <p>Your predicted breed is : {props.breed}</p>
        </div>
        <div className="  custom-font-size-small  text-black  custom-font-bold custom-font-family   ">
          Want to learn more? Check the wikipedia page below!
        </div>
        <Button
          href={props.href}
          className=" custom-margin-left custom-margin-top-3 custom-font-size custom-font-bold custom-font-family  "
          variant="outline-danger"
        >
          Go to Wiki!
        </Button>
      </div>
      <img
        src="glass1.jpg"
        className="col-8  custom-fade-in-2"
        id="first-page-background"
        alt="backGround"
      ></img>
    </Row>
  );
}

export default HomeScreen;
