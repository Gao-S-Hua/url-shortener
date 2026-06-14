import {
  CopyOutlined,
  DownloadOutlined,
  LinkOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { isValidUrl } from '@url-shortener/shared';
import { Alert, Button, Input, message, Space, Tabs, theme } from 'antd';
import { QRCodeCanvas } from 'qrcode.react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createUrl } from '../api/urls';
import { useUrlContext } from '../context/UrlContext';
import { copyToClipboard, SHORT_URL_BASE } from '../utils';
import './UrlController.css';

function ShortUrlResult() {
  const { state } = useUrlContext();
  const { token } = theme.useToken();

  if (!state.shortUrl) {
    return (
      <Alert
        message="No short URL yet"
        description="Enter a URL above and click Generate to create a short URL."
        type="info"
        showIcon
      />
    );
  }

  const handleCopy = async () => {
    try {
      await copyToClipboard(state.shortUrl);
      message.success('Copied to clipboard!');
    } catch {
      message.error('Failed to copy to clipboard');
    }
  };

  const successBg =
    token.colorSuccessBg ||
    (token.colorSuccess ? `${token.colorSuccess}15` : '#f6ffed');
  const successBorder =
    token.colorSuccessBorder ||
    (token.colorSuccess ? `${token.colorSuccess}40` : '#b7eb8f');

  return (
    <div className="resultWrapper">
      <div
        className="resultBox"
        style={{
          background: successBg,
          border: `1px solid ${successBorder}`,
        }}
      >
        <div className="resultLabel" style={{ color: token.colorText }}>
          Your Short URL:
        </div>
        <Space.Compact style={{ width: '100%' }}>
          <Input value={state.shortUrl} readOnly />
          <Button icon={<CopyOutlined />} onClick={handleCopy}>
            Copy
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
}

function QrCodeResult() {
  const { state } = useUrlContext();
  const { token } = theme.useToken();

  if (!state.shortUrl) {
    return (
      <Alert
        message="No short URL yet"
        description="Enter a URL above and click Generate to create a short URL first, then your QR code will appear here."
        type="info"
        showIcon
      />
    );
  }

  const handleDownload = () => {
    const canvas = document.querySelector(
      '#qr-code-canvas canvas',
    ) as HTMLCanvasElement | null;
    if (!canvas) {
      message.error('QR code not found');
      return;
    }
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-${state.shortUrl.split('/').pop() || 'code'}.png`;
    a.click();
    message.success('QR code downloaded!');
  };

  return (
    <div className="qrWrapper">
      <div className="qrLabel" style={{ color: token.colorText }}>
        QR Code for: {state.shortUrl}
      </div>
      <div
        id="qr-code-canvas"
        className="qrCanvas"
        style={{
          background: token.colorBgLayout || '#fff',
          border: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <QRCodeCanvas
          value={state.shortUrl}
          size={200}
          level="M"
          bgColor={token.colorBgLayout || '#fff'}
          fgColor={token.colorText}
        />
      </div>
      <div className="qrDownloadBtn">
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
        >
          Download PNG
        </Button>
      </div>
    </div>
  );
}

export default function UrlController() {
  const { state, setOriginalUrl, setShortUrl, refreshList } = useUrlContext();
  const [loading, setLoading] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { token } = theme.useToken();

  const validateUrl = useCallback((value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setUrlError(null);
      return;
    }
    if (!isValidUrl(trimmed)) {
      setUrlError(
        'Please enter a valid URL (must start with http:// or https://)',
      );
    } else {
      setUrlError(null);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setValidating(true);
    debounceRef.current = setTimeout(() => {
      validateUrl(state.originalUrl);
      setValidating(false);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [state.originalUrl, validateUrl]);

  const isInvalid = !state.originalUrl.trim() || !!urlError || validating;

  const handleGenerate = async () => {
    const trimmed = state.originalUrl.trim();
    if (!trimmed) {
      message.error('Please enter a URL');
      return;
    }
    if (!isValidUrl(trimmed)) {
      message.error(
        'Please enter a valid URL (must start with http:// or https://)',
      );
      return;
    }

    setLoading(true);
    try {
      const result = await createUrl(trimmed);
      const shortUrl = `${SHORT_URL_BASE}/${result.shortCode}`;
      setOriginalUrl(trimmed);
      setShortUrl(shortUrl);
      refreshList();
      message.success('Short URL created successfully!');
    } catch {
      message.error('Failed to create short URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabItems = [
    {
      key: 'result',
      label: (
        <span>
          <LinkOutlined /> Short URL
        </span>
      ),
      children: <ShortUrlResult />,
    },
    {
      key: 'qrcode',
      label: (
        <span>
          <QrcodeOutlined /> QR Code
        </span>
      ),
      children: <QrCodeResult />,
    },
  ];

  return (
    <div
      className="container"
      style={{
        background: token.colorBgContainer,
        border: `1px solid ${token.colorBorderSecondary}`,
        boxShadow: token.boxShadowTertiary,
      }}
    >
      <div className="inputSection">
        <div className="label" style={{ color: token.colorText }}>
          Original URL
        </div>
        <Input
          placeholder="https://example.com/your-long-url"
          value={state.originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          onPressEnter={handleGenerate}
          prefix={<LinkOutlined />}
          size="large"
          status={urlError ? 'error' : validating ? 'warning' : undefined}
        />
        {urlError && (
          <div className="errorText" style={{ color: token.colorError }}>
            {urlError}
          </div>
        )}
        <Button
          type="primary"
          onClick={handleGenerate}
          loading={loading}
          disabled={isInvalid && !loading}
          size="large"
          block
          className={urlError ? 'genButtonWithError' : 'genButton'}
        >
          Generate Short URL
        </Button>
      </div>

      <Tabs items={tabItems} destroyInactiveTabPane={false} />
    </div>
  );
}
