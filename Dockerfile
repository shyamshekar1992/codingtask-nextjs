# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Step 4: Install dependencies using yarn
RUN yarn install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Build the Next.js app (in production mode)
RUN yarn build

# Step 7: Expose port 3000 (default port for Next.js)
EXPOSE 3000

# Step 8: Run the Next.js app
CMD ["yarn", "start"]
