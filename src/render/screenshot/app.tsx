import { ScreenshotView } from './views/screenshot';
import { ITranslateAndReplyResult } from '../../interface/config';
import { useEffect, useState } from 'react';
import { ReplyView } from './views/reply';
import { ScreenshotsData } from '../../libs/screenshot/interface';

import './app.less';

export function App(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<{ buffer: ArrayBuffer; data: ScreenshotsData } | null>(null);
  const [translateAndReply, setTranslateAndReply] = useState<ITranslateAndReplyResult | null>(null);

  useEffect(() => {
    const onTranslateAndReply = (result: ITranslateAndReplyResult) => {
      setTranslateAndReply(result);
      setLoading(false);
    };
    const onClose = () => {
      setLoading(false);
      setContext(null);
      setTranslateAndReply(null);
    };
    window.screenshots.on('TRANSLATE_AND_REPLY', onTranslateAndReply);
    window.screenshots.on('CLOSE', onClose);
    return () => {
      window.screenshots.off('TRANSLATE_AND_REPLY', onTranslateAndReply);
      window.screenshots.off('CLOSE', onClose);
    };
  }, []);

  return (
    <div className="container">
      {!context && (
        <ScreenshotView
          onOk={(buffer, data) => {
            setContext({ buffer, data });
            setLoading(true);
          }}
        />
      )}
      <ReplyView
        loading={loading}
        data={translateAndReply}
        onRetry={() => {
          if (context) {
            window.screenshots.ok(context.buffer, context.data);
            setLoading(true);
          }
        }}
        onConfirm={() => {
          setTranslateAndReply(null);
          setContext(null);
          setLoading(false);
          window.screenshots.exit();
        }}
      />
    </div>
  );
}
