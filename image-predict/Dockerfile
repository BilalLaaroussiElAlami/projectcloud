FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get install -y libgl1-mesa-glx && npm install @tensorflow/tfjs-node @tensorflow-models/coco-ssd express formidable fs

COPY . .

EXPOSE 8002

CMD ["node", "server.js"] 
