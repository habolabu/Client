FROM node:lts-alpine
WORKDIR /habolabu-client
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
