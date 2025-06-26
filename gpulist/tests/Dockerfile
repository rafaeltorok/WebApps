FROM cypress/included:13.7.3

WORKDIR /tests
COPY ./package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "cypress:cline"]
