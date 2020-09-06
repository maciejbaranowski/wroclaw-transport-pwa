FROM node:12
COPY package*.json /usr/src/app/
WORKDIR /usr/src/app/
RUN npm install
COPY server.js /usr/src/app/
COPY public /usr/src/app/public
COPY src /usr/src/app/src
RUN npm run-script build
CMD node server.js
EXPOSE 5000