---------------------------------------------------
STRAIGHT TO THE POINT BACKEND/FRONTEND

FRONTEND
npx create-next-app@latest
*create .env
npm i dotenv
NEXT_PUBLIC_API_URL="http://localhost:8000"

BACKEND
npm init -y
npx tsc --init
npm i -D ts-node typescript @types/node

*go to tsconfig.json and change these:
- "module": "commonjs" ---> "module": "nodenext" 
- "moduleResolution": "node10" ---> "moduleResolution": "nodenext"
-  "outdir": "./" ---> "outdir": "./dist"

*go to packeage.json and add 
-"dev": "nodemon index.ts"

npm i express body-parser cors dotenv helmet morgan concurrently
npm i -D nodemon @types/cors @types/express @types/morgan

*create .env

*edit index.ts, create routes, controllers, dummydata

---------------------------------------------------
BACKEND THROUGH SEPARATE BACKEND FOLDER
(ED ROH)
BACKEND
npm init -y

npm i prisma @prisma/client
npx prisma init
cd prisma
*download the "asset" files 
*create a file called "seed.ts" and copy and paste the contents from the seed.ts of asset file to your current seed.ts
npm i --save-dev @types/express   

*go back to the root of backend
npx tsc --init
npm i -D ts-node typescript @types/node

*go to tsconfig.json and change these:
- "module": "commonjs" ---> "module": "nodenext" 
- "moduleResolution": "node10" ---> "moduleResolution": "nodenext"
-  "outdir": "./" ---> "outdir": "./dist"

*fix the schema.prisma
model User {
        userId String @id
        name String
        email String
}

*go to packeage.json and add 
- "seed": "ts-node prisma/seed.ts"

npx prisma generate
npx prisma migrate dev --name init
npm run seed 

npm i express body-parser cors dotenv helmet morgan concurrently
npm i -D nodemon @types/cors @types/express @types/morgan
