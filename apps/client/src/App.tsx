import { theme as antTheme, ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function ThemedApp() {
  const { darkMode } = useThemeContext();

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode
          ? antTheme.darkAlgorithm
          : antTheme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
