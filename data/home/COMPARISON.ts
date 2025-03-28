import { CHAT_ROUNDING_FACTOR, CHAT_UNIT_PRICE } from './PRICING';

export const COMPARISON_DATA = [
  {
    competitor: 'ChatBot',
    features: [
      {
        title: 'User-centric products building focused',
        status: 'unavailable',
      },
      {
        title: 'Specialized business offerings chatbot',
        status: 'unavailable',
      },
      {
        title: 'Starts at $52/month for 1,000 chats',
        status: 'unavailable',
      },
      {
        title: 'Free trial + monthly subscription',
        status: 'meh',
      },
    ],
  },
  {
    competitor: 'FeatWiz',
    features: [
      {
        title: 'User-centric products building focused',
        status: 'available',
      },
      {
        title: 'Specialized business offerings chatbot',
        status: 'available',
      },
      {
        title: `Starts at $${(CHAT_UNIT_PRICE * CHAT_ROUNDING_FACTOR).toFixed(2)} for 1000 chats`,
        status: 'available',
      },
      {
        title: 'Pay only for what you use',
        status: 'available',
      },
    ],
  },
  {
    competitor: 'Intercom',
    features: [
      {
        title: 'User-centric products building focused',
        status: 'unavailable',
      },
      {
        title: 'Specialized business offerings chatbot',
        status: 'unavailable',
      },
      {
        title: 'Starts at $29/month per seat',
        status: 'unavailable',
      },
      {
        title: 'Free trial + monthly subscription',
        status: 'meh',
      },
    ],
  },
] as const;
