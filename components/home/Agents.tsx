import { AGENTS } from '@/data/home/AGENTS';
import Link from 'next/link';

export default function Agents() {
  return (
    <section id='agents' className='space-y-6 px-4 py-6'>
      <div className='max-w-xl space-y-4'>
        <h2 className='text-3xl font-bold tracking-tight md:text-5xl'>
          Available agents
        </h2>
        <p className='text-lg leading-relaxed opacity-90'>
          Try out these agents designed to help you with specific tasks
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 leading-relaxed md:grid-cols-3'>
        {AGENTS.map((agent) => (
          <div
            key={agent.name}
            className='rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg'
          >
            <div className='p-4'>
              <h3 className='mb-2 text-xl font-semibold'>{agent.name}</h3>
              <p className='mb-4 opacity-90'>{agent.description}</p>
              <Link
                href={agent.link}
                className='bg-peach hover:bg-peach/90 rounded-md px-4 py-2 text-sm font-medium text-white'
              >
                Try this agent
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
