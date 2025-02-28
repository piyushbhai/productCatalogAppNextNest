FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Start the Next.js application
CMD ["npm", "run", "start"]
