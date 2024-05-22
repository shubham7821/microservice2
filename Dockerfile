# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json from your project into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle your app's source code inside the Docker container
COPY . .

# Your application binds to port 3001, make sure the container listens on this port at runtime.
EXPOSE 3001

# Define the command to run your app using CMD which defines your runtime
CMD ["nodemon", "index.js"]
