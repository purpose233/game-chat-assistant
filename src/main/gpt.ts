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
  return {
    translate: [
      { speaker: 'OnlyDubs', message: 'ur doing the worst on the team stop chatting more playing' },
      { speaker: 'mars (Zarya)', message: 'Hello!' },
      {
        speaker: 'jiann',
        message:
          'onlydubs i know with 100% certainty that ur parents spiked you on the concrete floor of their garage as soon as they got home from the hospital'
      }
    ],
    replies: [
      {
        en: "Maybe if you used two brain cells, you'd figure out how to play.",
        zh: '也许如果你动用两个脑细胞，你就会知道怎么打了。'
      },
      {
        en: 'Why don’t you get your trash talk from someone who isn’t a dumpster fire?',
        zh: '为什么不让不是个自燃垃圾堆的人教你怎么说垃圾话呢？'
      },
      {
        en: "Keep it up, you're just confirming that words mean nothing without skill.",
        zh: '继续吧，你只是在证明没有技能的话语毫无意义。'
      },
      {
        en: "Did you miss the part where you're supposed to be good before talking?",
        zh: '你错过了先玩好才开口说话的部分吗？'
      },
      {
        en: "You're out here juggling insults while your gameplay is stuck on tutorial mode.",
        zh: '你把玩垃圾话倒是起劲，而你的游戏水平还停留在新手教程。'
      }
    ]
  };

  // const config = getConfig();
  // const model = new ChatOpenAI({
  //   model: 'gpt-4o',
  //   openAIApiKey: config.gpt.apiKey,
  //   configuration: {
  //     baseURL: config.gpt.proxy
  //   }
  // });

  // const base64String = Buffer.from(buffer).toString('base64');
  // const dataUrl = `data:image/png;base64,${base64String}`;

  // const messages = [
  //   new SystemMessage(SYSTEM_PROMPT___TRANSLATE_AND_REPLY),
  //   new HumanMessage({
  //     content: [
  //       {
  //         type: 'text',
  //         text: USER_PROMPT___TRANSLATE_AND_REPLY
  //       },
  //       {
  //         type: 'image_url',
  //         image_url: { url: dataUrl }
  //       }
  //     ]
  //   })
  // ];

  // const result = await model.invoke(messages);
  // const textResult = Array.isArray(result.content)
  //   ? (result.content[0] as { text: string }).text ?? ''
  //   : result.content;

  // return parseResult(textResult);
}
