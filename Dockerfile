FROM ghcr.io/puppeteer/puppeteer:22.3.0
ENV PUPPETEER_SKIP_CHROMIUM DOWNLOAD=true \
    PUPPETEER EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "index.js"]