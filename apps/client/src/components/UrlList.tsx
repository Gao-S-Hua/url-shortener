import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { isValidUrl } from '@url-shortener/shared';
import {
  Button,
  Input,
  Modal,
  message,
  Popconfirm,
  Space,
  Table,
  Tag,
  theme,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useCallback, useEffect, useState } from 'react';
import { deleteUrl, getUrls, updateUrl } from '../api/urls';
import { useUrlContext } from '../context/UrlContext';
import type { UrlRecord } from '../types';
import { copyToClipboard, SHORT_URL_BASE } from '../utils';
import './UrlList.css';

export default function UrlList() {
  const [data, setData] = useState<UrlRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 20 });
  const { token } = theme.useToken();
  const { refreshCounter } = useUrlContext();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<UrlRecord | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchData = useCallback(async (page: number, limit: number) => {
    setLoading(true);
    try {
      const result = await getUrls(page, limit);
      setData(result.data);
      setTotal(result.total);
    } catch {
      message.error('Failed to load URL list');
    } finally {
      setLoading(false);
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Need to change with refreshCounter>
  useEffect(() => {
    fetchData(pagination.page, pagination.limit);
  }, [pagination, refreshCounter, fetchData]);

  const handleTableChange = (pag: TablePaginationConfig) => {
    setPagination({
      page: pag.current ?? 1,
      limit: pag.pageSize ?? 20,
    });
  };

  const handleCopy = async (shortCode: string) => {
    const shortUrl = `${SHORT_URL_BASE}/${shortCode}`;
    try {
      await copyToClipboard(shortUrl);
      message.success('Copied to clipboard!');
    } catch {
      message.error('Failed to copy');
    }
  };

  const handleEditOpen = (record: UrlRecord) => {
    setEditingRecord(record);
    setEditValue(record.originalUrl);
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    if (!editingRecord) return;
    const trimmed = editValue.trim();
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
    setEditLoading(true);
    try {
      await updateUrl(editingRecord.id, trimmed);
      message.success('URL updated successfully!');
      setEditModalOpen(false);
      fetchData(pagination.page, pagination.limit);
    } catch {
      message.error('Failed to update URL');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteUrl(id);
      message.success('URL deleted successfully!');
      fetchData(pagination.page, pagination.limit);
    } catch {
      message.error('Failed to delete URL');
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnsType<UrlRecord> = [
    {
      title: 'Short Code',
      dataIndex: 'shortCode',
      key: 'shortCode',
      width: 100,
      render: (code: string) => (
        <a
          className="defaultFont"
          href={`${SHORT_URL_BASE}/${code}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {code}
        </a>
      ),
    },
    {
      title: 'Original URL',
      dataIndex: 'originalUrl',
      key: 'originalUrl',
      ellipsis: true,
      width: 200,
      render: (url: string) => (
        <a
          className="defaultFont"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      ),
    },
    {
      title: 'Clicks',
      dataIndex: 'clickCount',
      key: 'clickCount',
      width: 80,
      align: 'right',
      responsive: ['md'],
    },
    {
      title: 'Status',
      dataIndex: 'deletedAt',
      key: 'status',
      width: 90,
      render: (deletedAt: string | null | undefined) =>
        deletedAt ? (
          <Tag className="defaultFont" color="red">
            Deleted
          </Tag>
        ) : (
          <Tag className="defaultFont" color="green">
            Active
          </Tag>
        ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      responsive: ['lg'],
      render: (val: string) => new Date(val).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: unknown, record: UrlRecord) => (
        <Space size="small">
          <Button
            icon={<CopyOutlined />}
            size="medium"
            onClick={() => handleCopy(record.shortCode)}
          />
          <Button
            icon={<EditOutlined />}
            size="medium"
            onClick={() => handleEditOpen(record)}
          />
          <Popconfirm
            title="Delete this URL?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            placement="topLeft"
            okButtonProps={{
              danger: true,
              loading: deletingId === record.id,
            }}
          >
            <Button
              icon={<DeleteOutlined />}
              size="medium"
              danger
              loading={deletingId === record.id}
            />
          </Popconfirm>
        </Space>
      ),
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
      <div className="headerRow">
        <h2 className="title" style={{ color: token.colorTextHeading }}>
          URL List
        </h2>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => fetchData(pagination.page, pagination.limit)}
        >
          Refresh
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        scroll={{ x: 800 }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total,
          showSizeChanger: true,
          pageSizeOptions: ['20', '50'],
          showTotal: (t) => `Total ${t} URLs`,
          size: 'small',
          responsive: true,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title="Edit URL"
        open={editModalOpen}
        onOk={handleEditSave}
        onCancel={() => setEditModalOpen(false)}
        confirmLoading={editLoading}
        okText="Save"
      >
        <div className="modalLabel">Original URL</div>
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onPressEnter={handleEditSave}
          placeholder="https://example.com/your-long-url"
        />
      </Modal>
    </div>
  );
}
