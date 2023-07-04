import React from "react";
import "./Splash.scss";
import splashLogo from "../../assets/images/splash-logo.png";

function Splash() {
  return (
    <section className="container">
      <div className="splash">
        <img className="splash-logo" src={splashLogo} alt="Gathering logo" />
      </div>

      <div className="container">
        <div className="animation-wrapper">
          <div id="img1" className="img">
            <div id="img2" className="img">
              <div id="img3" className="img">
                <div id="img4" className="img">
                  <div id="img5" className="img">
                    <div id="img6" className="img">
                      <div id="img7" className="img">
                        <div id="img8" className="img">
                          <div id="img9" className="img"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Splash;
