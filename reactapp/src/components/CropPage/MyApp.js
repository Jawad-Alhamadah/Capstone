import React from "react";
import NavBar from "./NavBar";
import MainContent from "./MainContent";
import { Switch, Route } from "react-router-dom";
import Wiki from "../wikipage/Wiki";
//import {Button, Alert,Breadcrumb,Card,Container,Row,Col,Nav,Navbar,NavDropdown} from 'react-bootstrap'
class MyApp extends React.Component {
  render(props) {
    return (
      <div>
        <Switch>
          <Route exact path={["/home", "/"]}>
            <NavBar backgroundColor="mid-purple" />
            <div id="main">
              <MainContent />
            </div>
          </Route>

          <Route exact path="/wiki" component={Wiki}></Route>
        </Switch>
      </div>
    );
  }
}

export default MyApp;
