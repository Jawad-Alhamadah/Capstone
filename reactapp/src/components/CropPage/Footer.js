import { React } from "react";
import { Nav, Navbar, Dropdown, Container } from "react-bootstrap";
function Footer() {
  return (
    <footer class="text-center text-lg-start bg-light text-muted">
      <section class="">
        <div class="  mt-2 ">
          <div>
            <div class="row mt-1 ms-5 ">
              <div href="\home" class="col-4">
                <img
                  src="doglogo.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top custom-shadow-1  black-and-white"
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        class="text-center p-4"
        style={{ "background-color": "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:
        <a class="text-reset fw-bold" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
        <div>
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
