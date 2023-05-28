FROM node:14-slim
WORKDIR /usr/src
COPY client/ ./client/
COPY server/ ./server/
RUN cd client && npm run install_packages && npm run build
RUN cd ../server && npm install
RUN ls

EXPOSE 80

CMD ["cd", "server && npm run prod"]