import { promises as fs } from 'fs';
import settings from './settings.ts';

const getInput = async (year: number, day: number, example: boolean = false) => fs.readFile(`./input/${year}-${day}${example ? '-example' : ''}.input`, 'utf8');

const getExampleFromHTML = (html) => {
  const match = /<pre><code>(.*?)<\/code><\/pre>/s.exec(html);
  if (match?.length > 0) {
    return match[1].trim();
  }
  return null;
};

const fetchInput = async (year: number, day: number, example: boolean) => {
  const input = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      cookie: `session=${settings.getSession()}`,
    },
  }).then((res) => res.text()).then((text) => text.trim());

  await fs.writeFile(`./input/${year}-${day}.input`, input);

  // Extract input from challenge instructions
  const challenge = await fetch(`https://adventofcode.com/${year}/day/${day}`, {
    headers: {
      cookie: `session=${settings.getSession()}`,
    },
  }).then((res) => res.text()).then((text) => text.trim());

  const exampleText = getExampleFromHTML(challenge);

  if (exampleText) await fs.writeFile(`./input/${year}-${day}-example.input`, exampleText);

  return example ? exampleText : input;
};

export { getInput, fetchInput };
