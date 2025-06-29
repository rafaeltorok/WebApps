FROM cypress/included:13.7.3

WORKDIR /tests
COPY ./package*.json ./
RUN npm install
COPY . .

ENV CYPRESS_baseUrl=http://gpulist-webapp-client:80
ENV BACKEND_baseUrl=http://gpulist-webapp-server:3001

CMD ["npm", "run", "cypress:cline"]
