import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Layout, Switch } from 'antd';
import { useThemeContext } from '../context/ThemeContext';
import './Header.css';

const { Header: AntHeader } = Layout;

export default function Header() {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <AntHeader className={`header${darkMode ? ' dark' : ''}`}>
      <div className="brand">
        <span className="logo">🔗</span>
        <span className={`title${darkMode ? ' dark' : ''}`}>URL Shortener</span>
      </div>
      <div className="actions">
        <SunOutlined className={darkMode ? 'darkIcon' : undefined} />
        <Switch checked={darkMode} onChange={toggleDarkMode} size="small" />
        <MoonOutlined className={darkMode ? 'darkIcon' : undefined} />
      </div>
    </AntHeader>
  );
}
