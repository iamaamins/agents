type Props = {
  message: string;
};

export default function Message({ message }: Props) {
  return <p className='opacity-90'>{message}</p>;
}
