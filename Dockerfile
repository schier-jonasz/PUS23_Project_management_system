# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose port 8000
EXPOSE 8000

# Start the server using the production build
# CMD [ "node", "dist/main.js" ]
# CMD [ "npm", "run", "start" ]


# We then install the dependencies using npm install, copy the rest of the application code to the container, and build the application using npm run build.
# Finally, we expose port 3000 and start the application using npm run start:prod.