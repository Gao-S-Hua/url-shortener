import { theme } from 'antd';
import Header from '../components/Header';
import UrlController from '../components/UrlController';
import UrlList from '../components/UrlList';
import { UrlProvider } from '../context/UrlContext';

function HomeContent() {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: token.colorBgLayout,
        transition: 'background 0.2s',
      }}
    >
      <Header />
      <div
        style={{
          padding: 'clamp(12px, 3vw, 24px)',
          maxWidth: 1000,
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: 'clamp(16px, 3vw, 24px)' }}>
          <UrlController />
        </div>
        <UrlList />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <UrlProvider>
      <HomeContent />
    </UrlProvider>
  );
}
