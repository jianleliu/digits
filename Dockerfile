FROM node:14

WORKDIR /app

COPY src /app

RUN curl https://install.meteor.com/ | sh && \
	 export PATH=/root/.meteor:$PATH

ENV METEOR_ALLOW_SUPERUSER=true

WORKDIR /app/app

RUN meteor npm install

CMD ["meteor", "npm", "run", "start"]
