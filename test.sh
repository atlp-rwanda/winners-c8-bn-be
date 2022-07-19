# You can use this to run the test for one file, Tested on linux
#!/bin/bash; C:/Program\ Files/Git/user/bin/sh.exe
echo $1
npx cross-env NODE_ENV=test npm run unmigrate && npx cross-env NODE_ENV=test npm run migrate && npx cross-env NODE_ENV=test npm run seed-roles && npx  cross-env NODE_ENV=test nyc --reporter=text --reporter=html  mocha --recursive --require @babel/polyfill --require @babel/register $1 --timeout 100000 --exit && cross-env NODE_ENV=test npm run unmigrate
