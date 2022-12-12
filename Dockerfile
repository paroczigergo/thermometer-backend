FROM node:14-alpine

WORKDIR /usr/src/app
ADD . /usr/src/app


ENV MONGO_URL "mongodb://mongo:27017"
ENV DB_NAME temperatues


RUN yarn install
RUN yarn run build



CMD [ "yarn", "start" ]
