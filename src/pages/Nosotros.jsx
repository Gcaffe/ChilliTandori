import { useTranslation } from 'react-i18next';

const Nosotros = () => {
  const { t } = useTranslation();

  return (
    <div style={styles.container}>
      <div className="container">
        <h1 style={styles.title}>{t('nav.nosotros')}</h1>
        
        <div style={styles.content}>
          <div style={styles.icon}>🚧</div>
          <h2 style={styles.subtitle}>{t('underConstruction.title')}</h2>
          <p style={styles.message}>{t('underConstruction.message')}</p>
          <p style={styles.soon}>{t('underConstruction.soon')}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '60px 0',
    minHeight: '60vh'
  },
  title: {
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#c41e3a'
  },
  content: {
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    padding: '60px 40px',
    borderRadius: '10px'
  },
  icon: {
    fontSize: '60px',
    marginBottom: '20px'
  },
  subtitle: {
    fontSize: '28px',
    marginBottom: '15px',
    color: '#333'
  },
  message: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '10px'
  },
  soon: {
    fontSize: '16px',
    color: '#f4a460',
    fontWeight: '600'
  }
};

export default Nosotros;
