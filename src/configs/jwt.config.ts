export const JWT_CONFIG = {
  secret: process.env.PRIVATE_KEY || 'STRING',
  signOptions: { expiresIn: '24h' },
};
