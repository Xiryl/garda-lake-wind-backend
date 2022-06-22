FROM node:12.13.0-alpine

WORKDIR /app

# Install python/pip
# ENV PYTHONUNBUFFERED=1
# RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# RUN python3 -m ensurepip
# RUN pip3 install --no-cache --upgrade pip setuptools

#  RUN apk add --update install -y build-essential

COPY package.json .
RUN npm install --production
COPY . .

# Uncomment the line below iff you are not using "host" network mode
# EXPOSE 3000

CMD ["node", "/app/bot.js"]
