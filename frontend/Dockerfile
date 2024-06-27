# Use an official Node.js runtime as a parent image
FROM node:20-alpine3.20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json .

# Install any dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

# Build the Angular application
RUN npm run build --prod

# Use an official Nginx image to serve the built application
FROM nginx:alpine

# Copy the built Angular application into the Nginx directory
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]