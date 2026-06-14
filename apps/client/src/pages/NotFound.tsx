import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 24,
      }}
    >
      <h1 style={{ fontSize: 72, margin: 0 }}>404</h1>
      <p style={{ fontSize: 18, color: '#888' }}>URL Record Not Found</p>
      <Button type="primary" size="large" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </div>
  );
}
