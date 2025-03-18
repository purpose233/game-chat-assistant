import { Form, Button, Card, Space, Toast, Typography, Tag, Divider } from '@douyinfe/semi-ui';
import { IconSave, IconFilpVertical } from '@douyinfe/semi-icons';
import { IAppConfig } from '../../../../interface/config';

export function Config() {
  const { Text, Title } = Typography;

  // 表单提交处理
  const handleSubmit = (values: IAppConfig) => {
    if (!values.gpt.apiKey) {
      Toast.error('请输入API密钥');
      return;
    }
    if (!values.gpt.proxy) {
      Toast.error('请输入API地址');
      return;
    }
    Toast.success('配置已保存');
    window.electronAPI.updateConfig(values);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Title heading={3} style={{ marginBottom: '24px' }}>
          翻译设置
        </Title>

        {/* 快捷键说明区域 */}
        <div
          style={{
            marginBottom: '24px',
            backgroundColor: 'var(--semi-color-fill-0)',
            padding: '16px',
            borderRadius: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <IconFilpVertical
              size="large"
              style={{ marginRight: '8px', color: 'var(--semi-color-primary)' }}
            />
            <Text strong>快捷键</Text>
          </div>
          <Space>
            <Tag color="blue" type="light">
              <span style={{ fontFamily: 'monospace' }}>⌘ Command</span> +{' '}
              <span style={{ fontFamily: 'monospace' }}>T</span>
            </Tag>
            <Text>开始翻译</Text>
          </Space>
        </div>

        <Divider margin="12px" />

        <Form
          // @ts-ignore-next-line
          onSubmit={handleSubmit}
          labelPosition="left"
          labelWidth="120px"
        >
          <Form.Section text="GPT设置">
            <Form.Input
              field="gpt.apiKey"
              label="API Key"
              placeholder="请输入API密钥"
              rules={[{ required: true, message: '请输入API密钥' }]}
            />

            <Form.Input
              field="gpt.proxy"
              label="API地址"
              placeholder="请输入API地址"
              rules={[{ required: true, message: '请输入API地址' }]}
              initValue="https://api.openai.com/v1"
            />
          </Form.Section>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <Button type="primary" htmlType="submit" icon={<IconSave />} theme="solid">
              保存配置
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
