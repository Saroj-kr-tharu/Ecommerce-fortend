### STAGE 1: Build ###
FROM node:22-alpine AS build
WORKDIR /Ecommerce/fortend

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# declare ARGs
ARG apiURL
ARG PAYMENT_BACKEND_URL
ARG esewa_url
ARG esewa_secret
ARG CLOUDFRONT_DOMAIN

# convert ARGs to ENV so Node.js can read via process.env
ENV apiURL=${apiURL}
ENV PAYMENT_BACKEND_URL=${PAYMENT_BACKEND_URL}
ENV esewa_url=${esewa_url}
ENV esewa_secret=${esewa_secret}
ENV CLOUDFRONT_DOMAIN=${CLOUDFRONT_DOMAIN}


RUN node set-env.js

RUN npm run build

### STAGE 2: Run ###
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /Ecommerce/fortend/dist/ecommerce/browser /usr/share/nginx/html