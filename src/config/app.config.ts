export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  databaseUri: <string>process.env.DATABASE_URI,
});
