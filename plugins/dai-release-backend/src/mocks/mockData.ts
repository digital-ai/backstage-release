import { ConfigReader } from '@backstage/config';

export const config = new ConfigReader({
  daiDeploy: {
    host: 'http://localhost',
    username: 'admin',
    password: 'admin',
  },
});

export const configWithEmptyHost = new ConfigReader({
  daiDeploy: {
    host: '',
    username: 'admin',
    password: 'admin',
  },
});

export const configWithEmptyUsername = new ConfigReader({
  daiDeploy: {
    host: 'http://localhost',
    username: '',
    password: 'admin',
  },
});

export const configWithEmptyPassword = new ConfigReader({
  daiDeploy: {
    host: 'http://localhost',
    username: 'admin',
    password: '',
  },
});
