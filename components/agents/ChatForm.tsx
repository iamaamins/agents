'use client';

import { useAlert } from '@/contexts/Alert';
import { Response } from '@/types';
import { ChatCompletionMessageParam } from 'openai/resources.mjs';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { LuSend } from 'react-icons/lu';
import { v4 as uuid } from 'uuid';

type Props = {
  name: string;
  action: (
    question: string,
    history: ChatCompletionMessageParam[],
  ) => Promise<Response<string>>;
};

export default function ChatForm({ name, action }: Props) {
  const { setAlert } = useAlert();
  const [chat, setChat] = useState<
    {
      id: string;
      role: 'user' | 'assistant';
      content: string;
    }[]
  >([]);
  const messages = useRef<HTMLDivElement>(null);

  function getChatHistory() {
    const chatHistory = sessionStorage.getItem(`${name}-chat`);
    if (chatHistory) return JSON.parse(chatHistory);
    return [];
  }

  function saveChat(question: string, answer: string) {
    const chatHistory = getChatHistory();

    chatHistory.push({ role: 'user', content: question });
    chatHistory.push({ role: 'assistant', content: answer });

    sessionStorage.setItem(`${name}-chat`, JSON.stringify(chatHistory));
  }

  function updateChat(id: string, answer?: string) {
    return setChat((prevState) =>
      prevState.map((el) => {
        if (el.id === id && el.role === 'assistant')
          return { ...el, content: answer || 'Something went wrong 😕' };

        return el;
      }),
    );
  }

  async function sendMessage(e: FormEvent) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const question = formData.get('question')?.toString().trim();

    if (!question)
      return setAlert({ message: 'Question is required', type: 'failed' });

    const chatId = uuid();
    setChat((prevState) => [
      ...prevState,
      { id: chatId, role: 'user', content: question },
      { id: chatId, role: 'assistant', content: 'Thinking...' },
    ]);
    form.reset();

    const chatHistory = getChatHistory();
    const response = await action(question, chatHistory.slice(-10));
    if (!response.ok) return updateChat(chatId);

    updateChat(chatId, response.data);
    saveChat(question, response.data);
  }

  // Get saved chat
  useEffect(() => {
    const chatHistory = getChatHistory();
    setChat(chatHistory);
  }, []);

  // Scroll to top when chat updates
  useEffect(() => {
    if (messages.current) {
      messages.current.scrollTo({
        top: messages.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chat]);

  return (
    <div className='space-y-4'>
      <div
        ref={messages}
        className='flex max-h-[85vh] flex-col gap-4 overflow-y-auto'
      >
        {chat.map((el, index) => (
          <p
            key={index}
            className={`max-w-80 rounded-md px-2 py-1 ${el.role === 'user' ? 'self-end bg-[#e6f3ff] text-right text-[#004a7c]' : 'self-start bg-[#efefef] text-[#29303d]'}`}
          >
            {el.content}
          </p>
        ))}
      </div>

      <form
        onSubmit={sendMessage}
        className='bg-silver-charcoal-scheme flex items-center gap-2 rounded-md p-2'
      >
        <input
          id='question'
          type='text'
          name='question'
          placeholder='Type here...'
          className='border-slight-gray bg-silver-charcoal-scheme w-full rounded-md border p-2'
        />
        <button
          type='submit'
          className='bg-peach text-white-black-scheme flex h-10 w-12 items-center justify-center rounded-md'
        >
          <LuSend size={20} />
        </button>
      </form>
    </div>
  );
}
