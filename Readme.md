to start with banking app follow below steps:
npm install to install packages which contains dependencies in package.json
to start server for development use 'npm start'
also check with env-cmdrc file for environmental configurations
to deploy in any servers use pm2 to avoid server crashing
use 'pm2 start npm -- run start:prod' for deployment