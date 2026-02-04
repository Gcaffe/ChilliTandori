import { useTranslation } from 'react-i18next';

const Contactar = () => {
  const { t } = useTranslation();

  return (
    <div style={styles.container}>
      <div className="container">
        <h1 style={styles.title}>{t('nav.contactar')}</h1>
        
        <div style={styles.content}>
          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>📍 {t('contact.address')}</h2>
            <p>C/ Llomes de Reixes (Urbanización El Poblet)</p>
            <p>03560 El Campello, Alicante</p>
          </div>

          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>📞 {t('contact.reservations')}</h2>
            <p>+34 632 469 875</p>
          </div>

          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>📧 {t('contact.email')}</h2>
            <p>info@chillitandori.com</p>
          </div>

          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>🕐 {t('contact.hours')}</h2>
            <div style={styles.hours}>
              <div style={styles.hourRow}>
                <span style={styles.day}>{t('contact.monday')} - {t('contact.sunday')}:</span>
                <span>10:00 - 15:00 y 19:00 - 01:00</span>
              </div>
              <div style={styles.hourRow}>
                <span style={styles.day}>{t('contact.wednesday')}:</span>
                <span style={styles.closed}>{t('contact.closed')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 0',
    minHeight: '60vh'
  },
  title: {
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#c41e3a'
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px'
  },
  infoSection: {
    backgroundColor: '#f9f9f9',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#c41e3a'
  },
  hours: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  hourRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #ddd'
  },
  day: {
    fontWeight: '600'
  },
  closed: {
    color: '#999',
    fontStyle: 'italic'
  }
};

export default Contactar;
