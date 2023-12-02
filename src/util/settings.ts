import { config } from 'dotenv';

config();

function getEnvVariable<T>(key: string, defaultValue?: T): T {
  const variable = process.env[key] || defaultValue;

  if (variable === undefined) throw new Error(`Environment variable ${key} was not found.`);

  return variable as T;
}

const settings = {
  getSession: () => getEnvVariable<string>('SESSION'),
};

export default settings;
