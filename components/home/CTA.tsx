import CheckoutButton from './CTAButton';

export default async function CTA() {
  return (
    <section className='m-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-6 text-center'>
      <h2 className='text-3xl font-bold tracking-tight md:text-5xl'>
        Turn user insights into action
      </h2>
      <p className='text-lg opacity-90'>
        Get started with FeatWiz and transform how you understand and serve your
        customers—your next big feature starts here.
      </p>
      <CheckoutButton />
    </section>
  );
}
