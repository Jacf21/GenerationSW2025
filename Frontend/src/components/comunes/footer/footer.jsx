
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <h3>Mi Sistema</h3>
          <p>© 2025 Todos los derechos reservados</p>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>

          <div className="telefono-y-iconos">
            <p>Telf: (+591) 63985595</p>

            <div className="social-icons">

              <a
                href="https://wa.me/59170000000"
                className="icon-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>

              <a
                href="https://facebook.com"
                className="icon-facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>

              <a
                href="https://instagram.com"
                className="icon-instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>

            </div>
          </div>

          <p>Email: contacto@sistema.com</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
