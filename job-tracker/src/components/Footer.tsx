type FooterProps = {
  darkMode: boolean;
};

function Footer({ darkMode }: FooterProps) {
  return (
    <footer className={darkMode ? "footer dark-mode" : "footer"}>
      <p>JobTrackly — Created by Carl Amiel Balita</p>
    </footer>
  );
}

export default Footer;