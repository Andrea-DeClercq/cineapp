# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json file to the working directory
COPY package.json ./

# Copy the package-lock.json file to the working directory
COPY package-lock.json ./

# Install the dependencies specified in package.json
RUN npm install

# Copy the entire application source code to the working directory
COPY . .

# Build the application for production
RUN npm run build

# Expose port 3000 for the application to be accessible
EXPOSE 3000

# Define the command to start the application when the container runs
CMD ["npm", "start"]
