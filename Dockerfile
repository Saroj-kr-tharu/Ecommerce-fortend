
### STAGE 1: Build the project 
FROM node:22-alpine AS build
# from the base image node 
WORKDIR /Ecommerce/fortend
# working directory define 
COPY package*.json ./
RUN npm install --legacy-peer-deps
#npm install 
COPY . .
#copy all the file for the host to working directory 
RUN npm run build
# buld the project



### STAGE 2: Run ###
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /Ecommerce/fortend/dist/ecommerce/browser /usr/share/nginx/html