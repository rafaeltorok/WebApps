FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./package*.json .
COPY ./src ./src
COPY ./dist ./dist

RUN npm ci

EXPOSE 3001

ENV MONGODB_URI=mongodb+srv://admin:gpulistwebapp@gpulist0.ciotw.mongodb.net/?retryWrites=true&w=majority&appName=GpuList0
ENV TEST_MONGODB_URI=mongodb+srv://admin:testgpulistwebapp@cluster0.qpcer.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ENV PORT=3001

CMD ["npm", "start"]