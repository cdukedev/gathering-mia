import "./Splash.scss";
import splash from "../../assets/images/splash.svg";
import { MapPageContext } from "../../context/MapPageContext";
import { useContext } from "react";

function Splash() {
  const { geolocationToggle, setGeolocationToggle, handleGeolocationRequest } =
    useContext(MapPageContext);
  const handleClick = () => {
    setGeolocationToggle(true);
    handleGeolocationRequest();
  };
  return (
    <section className="container">
      <img className="splash" src={splash} alt="splash screen" />
      <div className="container">
        {!geolocationToggle ? (
          <button className="splash-button" onClick={handleClick}>
            Get my location
          </button>
        ) : (
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
        )}
      </div>
    </section>
  );
}

export default Splash;
