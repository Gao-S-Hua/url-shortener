import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Layout, Switch } from 'antd';
import { useThemeContext } from '../context/ThemeContext';
import './Header.css';

const { Header: AntHeader } = Layout;

export default function Header() {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <AntHeader
      className="header"
      style={{
        background: darkMode ? '#282828' : '#fff',
        borderBottom: `1px solid ${darkMode ? '#303030' : '#f0f0f0'}`,
      }}
    >
      <div className="brand">
        <span className="logo">🔗</span>
        <span
          className="title"
          style={{ color: darkMode ? '#fff' : undefined }}
        >
          URL Shortener
        </span>
      </div>
      <div className="actions">
        <SunOutlined style={{ color: darkMode ? '#fff' : undefined }} />
        <Switch checked={darkMode} onChange={toggleDarkMode} size="small" />
        <MoonOutlined style={{ color: darkMode ? '#fff' : undefined }} />
      </div>
    </AntHeader>
  );
}
