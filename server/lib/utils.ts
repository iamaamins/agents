import 'server-only';

import { readFileSync } from 'fs';
import { join } from 'path';
import pdf from 'pdf-parse';

export async function getPersonalDetail() {
  const pdfBuffer = readFileSync(
    join(process.cwd(), 'data', 'me', 'linkedin.pdf'),
  );
  const pdfData = await pdf(pdfBuffer);
  const linkedin = pdfData.text;

  const summary = readFileSync(
    join(process.cwd(), 'data', 'me', 'summary.txt'),
    'utf-8',
  );

  return { linkedin, summary };
}
