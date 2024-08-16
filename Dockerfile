FROM node:22.6.0-bookworm as BUILD

ENV NODE_ENV development

WORKDIR usr/src/app

COPY ./src ./src
COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json
COPY swagger.json ./swagger.json
COPY ./.env ./.env

RUN npm install

RUN npm run build
RUN npx babel src --out-dir dist

FROM node:slim as PROD

WORKDIR usr/src/app

COPY --from=BUILD usr/src/app/dist dist
COPY --from=BUILD usr/src/app/node_modules node_modules
COPY --from=BUILD usr/src/app/swagger.json ./swagger.json
COPY --from=BUILD usr/src/app/.env ./.env

CMD [ "node", "dist/main.js" ]

EXPOSE 3000