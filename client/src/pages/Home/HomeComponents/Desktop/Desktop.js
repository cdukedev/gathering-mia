import Logo from "../../../../assets/logo/desktop-logo.png";
import QRCode from "../../../../assets/icons/desktop-qr.png";

function Desktop() {
  return (
    <div className="desktop">
      <div className="desktop-logo">
        <img src={Logo} alt="logo" />
      </div>
      <p className="desktop-content">
        We are excited to have to join us! Please scan the QR code to navigate
        to our site on your mobile device
      </p>
      <div className="desktop-qr">
        <img src={QRCode} alt="gathering website QR Code" />
      </div>
      <span>
        Or input gathering-mia.live into your favorite mobile browser.
      </span>
    </div>
  );
}

export default Desktop;
