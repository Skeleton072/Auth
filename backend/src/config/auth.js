module.exports = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpires: '15m',
  refreshTokenExpires: '7d',
  text: process.env.TEXT,
}