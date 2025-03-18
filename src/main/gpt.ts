import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { SYSTEM_PROMPT___TRANSLATE_AND_REPLY, USER_PROMPT___TRANSLATE_AND_REPLY } from '../const/prompt';
import { ITranslateAndReplyResult } from '../interface/config';
import { getConfig } from './config';

function parseResult(result: string) {
  try {
    result = result.trim();
    if (result.startsWith('```json')) {
      result = result.slice(7);
    }
    if (result.startsWith('```')) {
      result = result.slice(3);
    }
    if (result.endsWith('```')) {
      result = result.slice(0, -3);
    }
    const json = JSON.parse(result);
    return json;
  } catch (error) {
    console.error('parseResult error', error);
    return null;
  }
}

export async function translateAndReply(buffer: Buffer): Promise<ITranslateAndReplyResult | null> {
  const config = getConfig();
  const model = new ChatOpenAI({
    model: 'gpt-4o',
    openAIApiKey: config.gpt.apiKey,
    configuration: {
      baseURL: config.gpt.proxy
    }
  });

  const base64String = Buffer.from(buffer).toString('base64');
  const dataUrl = `data:image/png;base64,${base64String}`;

  const messages = [
    new SystemMessage(SYSTEM_PROMPT___TRANSLATE_AND_REPLY),
    new HumanMessage({
      content: [
        {
          type: 'text',
          text: USER_PROMPT___TRANSLATE_AND_REPLY
        },
        {
          type: 'image_url',
          image_url: { url: dataUrl }
        }
      ]
    })
  ];

  const result = await model.invoke(messages);
  const textResult = Array.isArray(result.content)
    ? (result.content[0] as { text: string }).text ?? ''
    : result.content;

  return parseResult(textResult);
}
