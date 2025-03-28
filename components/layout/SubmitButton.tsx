'use client';

import { useFormStatus } from 'react-dom';
import { BeatLoader } from 'react-spinners';

type Props = {
  text: string;
};

export default function SubmitButton({ text }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='w-full self-center rounded-md bg-peach p-2 font-semibold text-white-black-scheme'
    >
      {pending ? <BeatLoader size={10} /> : text}
    </button>
  );
}
