FROM node as client
WORKDIR /usr/src
COPY client/ ./client/
RUN npm install && npm run build

FROM node
WORKDIR /app
COPY --from=client /usr/src/client/dist ./client/dist
COPY server/ ./server
RUN npm install

EXPOSE 4000

CMD ["npm", "run prod"]