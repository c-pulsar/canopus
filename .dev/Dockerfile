FROM node:alpine

ENV PATH /app/node_modules/.bin:$PATH

#RUN apk update && apk add --assume-yes ssh-client
#RUN apk add --update openssh

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh