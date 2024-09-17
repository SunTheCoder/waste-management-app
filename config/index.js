
module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbFile: process.env.DB_FILE,
  jwtConfig: {
    secret: process.env.JWT_SECRET || 'hardcodedSecret',  // Use a hardcoded fallback for debugging
    expiresIn: process.env.JWT_EXPIRES_IN || '3600',  // Use a hardcoded fallback for debugging
  },
};
