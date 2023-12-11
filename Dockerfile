FROM arm64v8/node:latest
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "dev"]