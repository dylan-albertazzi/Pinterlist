# Use a lighter version of Node as a parent image
FROM node:12-slim
# Set the working directory 
WORKDIR /usr/src/app
# copy package.json into the container at /MernShopping
COPY package*.json ./
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /MernShopping
COPY . .
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]