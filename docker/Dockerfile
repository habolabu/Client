FROM node:lts-alpine as build

WORKDIR /habolabu-client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

FROM nginx:1.23.4

COPY --from=build /habolabu-client/docker/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /habolabu-client/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
