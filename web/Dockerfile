# Stage 1: Build the React app using Vite
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the app using Vite
RUN npm run build

# Stage 2: Serve the build with a minimal server
FROM node:18-alpine AS runner

# Install a lightweight HTTP server for serving static files
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the build files from the previous stage
COPY --from=builder /app/dist ./dist

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application with the HTTP server
CMD ["serve", "-s", "dist", "-l", "3000"]