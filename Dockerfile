FROM node:20.11-alpine3.18 as builder

RUN mkdir /static

WORKDIR /static

COPY . /static

RUN npm install

RUN npm run build

# TODO: Need a multi stage build to further reduce image size
# FROM node:20.11-alpine3.18
# WORKDIR /server
# COPY --from=builder /static/.next /server
# COPY package.json /server/
# CMD [ "npm", "run", "start" ]