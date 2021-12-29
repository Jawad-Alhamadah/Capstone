import React from "react";
import NavBar from "../CropPage/NavBar";
import TutorialCard from "../HomePage/TutorialCard";
import HomeScreen from "../HomePage/HomeScreen";
//import {Button, Alert,Breadcrumb,Card,Container,Row,Col,Nav,Navbar,NavDropdown} from 'react-bootstrap'
//<a href={wikiInfo.href}>{wikiInfo.breed}</a>
//<div id="paragraphs-div">
//{wikiInfo.paragraphs.map((paragraph) => <p class="para-styles">{paragraph}</p>)}
//</div>
//<h1 id ="main-title">{wikiInfo.breed}</h1>
function Wiki(props) {
  const wikiInfo = props.location.state || {};
  return (
    <div>
      <NavBar backgroundColor="dark-purple" />

      <div id="text-body">
        <div id="whole-page-home">
          <HomeScreen
            breed={wikiInfo.breed}
            href={wikiInfo.href}
            dog_or_human={wikiInfo.dog_or_human}
          />
          <div id="paragraphs-div">
            <TutorialCard image={wikiInfo.image}></TutorialCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wiki;
