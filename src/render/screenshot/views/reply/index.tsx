import { useState } from 'react';
import { Button, Typography, Space, Card, Notification, Spin } from '@douyinfe/semi-ui';
import { IconCopy, IconRefresh, IconTickCircle } from '@douyinfe/semi-icons';
import { ITranslateAndReplyResult } from '../../../../interface/config';

import './index.less';

interface ReplyViewProps {
  data?: ITranslateAndReplyResult;
  loading?: boolean;
  onRetry?: () => void;
  onConfirm?: () => void;
}

const { Text, Title, Paragraph } = Typography;

export function ReplyView({ data, loading = false, onRetry, onConfirm }: ReplyViewProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        Notification.success({
          content: '已复制到剪贴板',
          duration: 2
        });
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch((err) => {
        Notification.error({
          content: '复制失败',
          duration: 2
        });
      });
  };

  if (loading) {
    return (
      <div className="reply-view-loading reply-container">
        <Spin size="large" />
        <Text>正在生成翻译 & 回复...</Text>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="reply-view-empty reply-container">
        <Text>暂无数据</Text>
      </div>
    );
  }

  return (
    <div className="reply-view reply-container">
      {data.translate && data.translate.length > 0 && (
        <Card className="reply-card translated-card">
          <Title heading={5} style={{ marginBottom: 8 }}>
            翻译结果
          </Title>
          <Space vertical spacing="medium" align="start" style={{ width: '100%' }}>
            {data.translate.map((item, index) => (
              <div key={index} className="translate-item">
                <Text strong>{item.speaker}: </Text>
                <Text style={{ fontWeight: 'normal' }}>{item.message}</Text>
              </div>
            ))}
          </Space>
        </Card>
      )}

      {data.replies && data.replies.length > 0 && (
        <Card className="reply-card replies-card">
          <Title heading={5} style={{ marginBottom: 8 }}>
            回复建议
          </Title>
          <Space vertical spacing="medium" align="start" style={{ width: '100%' }}>
            {data.replies.map((reply, index) => (
              <div key={index} className="reply-item" onClick={() => handleCopy(reply.en, index)}>
                <div className="reply-content">
                  <Text>{reply.en}</Text>
                  <Text type="tertiary" size="small">
                    {reply.zh}
                  </Text>
                </div>
                <div className="reply-action">
                  {copiedIndex === index ? (
                    <IconTickCircle size="small" style={{ color: 'var(--semi-color-success)' }} />
                  ) : (
                    <IconCopy size="small" />
                  )}
                </div>
              </div>
            ))}
          </Space>
        </Card>
      )}

      <div className="reply-actions">
        <Space>
          <Button icon={<IconRefresh />} onClick={onRetry}>
            重试
          </Button>
          <Button type="primary" theme="solid" icon={<IconTickCircle />} onClick={onConfirm}>
            确认
          </Button>
        </Space>
      </div>
    </div>
  );
}
