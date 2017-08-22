FROM risingstack/alpine:3.3-v6.9.4-4.2.1

ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV NODE_ENV development

RUN npm install -g yarn

RUN yarn global add webpack webpack-dev-server rimraf karma-cli typescript

WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

EXPOSE 5000

ENTRYPOINT ["/bin/sh", "-c"]
CMD ["yarn install --no-bin-links && npm run server:dev:hmr"]
