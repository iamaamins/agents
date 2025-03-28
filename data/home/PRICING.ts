import { formatNumber } from '@/lib/utils';

const OFFERINGS = {
  FREE: 250,
  SUPER_SAVER: 5000,
  ULTIMATE_SAVER: 25000,
} as const;

export const PRODUCTS = [
  {
    tier: 'CUSTOM',
    id: Number(process.env.LSQZ_FEATWIZ_CUSTOM_PRODUCT_ID),
    url: process.env.LSQZ_FEATWIZ_CUSTOM_BUY_URL as string,
  },
  {
    tier: 'SUPER_SAVER',
    offering: OFFERINGS.SUPER_SAVER,
    id: Number(process.env.LSQZ_FEATWIZ_SUPER_SAVER_PRODUCT_ID),
    url: process.env.LSQZ_FEATWIZ_SUPER_SAVER_BUY_URL as string,
  },
  {
    tier: 'ULTIMATE_SAVER',
    offering: OFFERINGS.ULTIMATE_SAVER,
    id: Number(process.env.LSQZ_FEATWIZ_ULTIMATE_SAVER_PRODUCT_ID),
    url: process.env.LSQZ_FEATWIZ_ULTIMATE_SAVER_BUY_URL as string,
  },
] as const;

const FEATURES = [
  'Unlimited active chat bot',
  'Get feature report',
  'Chatbot UI customization',
  'Train FeatWiz with your data',
] as const;

export const PACKAGES = [
  {
    tier: 'FREE',
    price: 0,
    features: [
      `${formatNumber(OFFERINGS.FREE)} chats (valid forever)`,
      ...FEATURES,
    ],
  },
  {
    tier: 'SUPER_SAVER',
    price: 19.99,
    features: [
      `${formatNumber(OFFERINGS.SUPER_SAVER)} chats (valid forever)`,
      ...FEATURES,
    ],
  },
  {
    tier: 'ULTIMATE_SAVER',
    price: 89.99,
    features: [
      `${formatNumber(OFFERINGS.ULTIMATE_SAVER)} chats (valid forever)`,
      ...FEATURES,
    ],
  },
] as const;

export const CHAT_UNIT_PRICE = 0.00499;
export const CHAT_ROUNDING_FACTOR = 1000;
export const CHAT_LIMIT = { min: 1000, max: 25000 } as const;
