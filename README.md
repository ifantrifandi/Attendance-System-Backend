# Attendace-System-Backend

Backend for attendance system

Employee Service

1. check config in employee_services/config/config.json
2. update config db as you want to config
3. set .env using .envTemplate example:
   SECRET_KEY="secretkey"
   USERNAME_BASIC="user"
   PASSWORD_BASIC="password"
4. npm install
5. if db is not created, do create, migrate, and seed db using:
   npx sequelize db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
6. set PORT @ employee_services/index.js

Attendance Service

1. check config in attendance_services/config/config.json
2. update config db as you want to config
3. set .env using .envTemplate example:
   SECRET_KEY="secretkey"
   USERNAME_BASIC="user"
   PASSWORD_BASIC="password"
4. npm install
5. if db is not created, do create, migrate, and seed db using:
   npx sequelize db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
6. set PORT @ attendance_services/index.js

notes:
make sure env same in Employee Services & Attendance Services
in employee services seeding, will seed position & employee SYSTEM
first time add employee using
email: system@email.com
password: SYSTEM
when create employee -> password generated = Employee First Name + 123456
