import { Form, Button, Card, Space, Toast, Typography, Tag, Divider } from '@douyinfe/semi-ui';
import { IconSave, IconFilpVertical } from '@douyinfe/semi-icons';

// 定义语言选项
const languageOptions = [
  { label: '中文', value: 'zh' },
  { label: '英语', value: 'en' },
  { label: '日语', value: 'ja' },
  { label: '韩语', value: 'ko' },
  { label: '法语', value: 'fr' },
  { label: '德语', value: 'de' },
  { label: '西班牙语', value: 'es' },
  { label: '俄语', value: 'ru' }
];

// 定义OCR服务提供商选项
const ocrProviderOptions = [
  // { label: '百度OCR', value: 'baidu' }
  { label: '腾讯OCR', value: 'tencent' }
  // { label: '阿里云OCR', value: 'aliyun' },
  // { label: '自定义API', value: 'custom' }
];

export function Config() {
  const { Text, Title } = Typography;

  // 表单提交处理
  const handleSubmit = (values: any) => {
    console.log('配置已保存:', values);
    // 这里可以添加保存配置到本地存储的逻辑
    // 例如: localStorage.setItem('translationConfig', JSON.stringify(values));
    // 或者使用Electron的存储API
    Toast.success('配置已保存');
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

        <Form onSubmit={handleSubmit} labelPosition="left" labelWidth="120px">
          <Form.Section text="语言设置">
            <Form.Select
              field="sourceLanguage"
              label="源语言"
              placeholder="请选择源语言"
              optionList={languageOptions}
              rules={[{ required: true, message: '请选择源语言' }]}
              style={{ width: '100%' }}
              initValue={'ko'}
            />

            <Form.Select
              field="targetLanguage"
              label="目标语言"
              placeholder="请选择目标语言"
              optionList={languageOptions}
              rules={[{ required: true, message: '请选择目标语言' }]}
              style={{ width: '100%' }}
              initValue={'zh'}
            />
          </Form.Section>

          <Form.Section text="OCR设置">
            <Form.Select
              field="ocrProvider"
              label="OCR服务提供商"
              placeholder="请选择OCR服务提供商"
              optionList={ocrProviderOptions}
              rules={[{ required: true, message: '请选择OCR服务提供商' }]}
              style={{ width: '100%' }}
              initValue={'tencent'}
            />

            <Form.Input
              field="ocrApiKey"
              label="API密钥"
              placeholder="请输入API密钥"
              rules={[{ required: true, message: '请输入API密钥' }]}
            />

            <Form.Input
              field="ocrApiUrl"
              label="API地址"
              placeholder="请输入API地址"
              rules={[{ required: true, message: '请输入API地址' }]}
            />
          </Form.Section>

          <Form.Section text="翻译API设置">
            <Form.Input
              field="translationApiKey"
              label="翻译API密钥"
              placeholder="请输入翻译API密钥"
              rules={[{ required: true, message: '请输入翻译API密钥' }]}
            />

            <Form.Input
              field="translationApiUrl"
              label="翻译API地址"
              placeholder="请输入翻译API地址"
              rules={[{ required: true, message: '请输入翻译API地址' }]}
            />
          </Form.Section>

          {/* <Form.Section text="高级设置">
            <Form.Switch field="autoTranslate" label="自动翻译" />
            <Form.InputNumber
              field="requestTimeout"
              label="请求超时(秒)"
              defaultValue={10}
              min={1}
              max={60}
            />
          </Form.Section> */}

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
