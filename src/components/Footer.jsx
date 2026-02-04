const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.content}>
        <p style={styles.copyright}>
          &copy; 2026 <span className="font-logo" style={styles.brandName}>CHILLI TANDORI</span>. Todos los derechos reservados.
        </p>
        <p>El Campello, Alicante</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c1810',
    color: '#fff',
    padding: '20px 0',
    marginTop: '40px',
    textAlign: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  copyright: {
    fontSize: '14px'
  },
  brandName: {
    fontSize: '16px',
    letterSpacing: '1px',
    color: '#E8D6A8' // Color beige del logo
  }
};

export default Footer;
