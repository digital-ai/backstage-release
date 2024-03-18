import { ConfigReader } from '@backstage/config';

export const config = new ConfigReader({
  daiRelease: {
    host: 'http://localhost',
    username: 'admin',
    password: 'admin',
  },
});

export const configWithEmptyHost = new ConfigReader({
  daiRelease: {
    host: '',
    username: 'admin',
    password: 'admin',
  },
});

export const configWithEmptyUsername = new ConfigReader({
  daiRelease: {
    host: 'http://localhost',
    username: '',
    password: 'admin',
  },
});

export const configWithEmptyPassword = new ConfigReader({
  daiRelease: {
    host: 'http://localhost',
    username: 'admin',
    password: '',
  },
});
