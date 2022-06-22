FROM node:16-alpine

# install node dependencies
WORKDIR /app
COPY package.json package-lock.json* ./
RUN rm -rf node_modules && npm cache clean --force && npm install --production

# copy app source to image _after_ npm install so that
# application code changes don't bust the docker cache of npm install step
COPY . /app

# expose 3000 server port
EXPOSE 3000

CMD [ "npm", "run", "start" ]
