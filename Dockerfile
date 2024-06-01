# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json from your project into the working directory
# Ensuring both files are optional
COPY package*.json ./

# Install dependencies
# 'npm ci' is preferred for installations where package-lock.json is available as it's cleaner and more consistent
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Bundle your app's source code inside the Docker container
COPY . .

# Your application binds to port 3001, make sure the container listens on this port at runtime.
EXPOSE 3001

# Define the command to run your app
# Using 'npm start' to run your application
CMD ["npm", "start"]
