###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy the main application dependency manifests to the container image.
COPY package*.json yarn.lock ./

# Install app dependencies using the `yarn install` command
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

# Copy the necessary files for the build
COPY package*.json yarn.lock ./

# Copy over the node_modules directory from the development stage
COPY --from=development /usr/src/app/node_modules ./node_modules

# Copy the rest of the necessary files
COPY . .

# Run the build command which creates the production bundle
RUN yarn nx build api --configuration=production

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Install only production dependencies
RUN yarn install --production --frozen-lockfile && yarn cache clean

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR /usr/src/app

# Copy only the production dependencies and the built code
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY cert cert

# Start the server using the production build
CMD [ "node", "dist/apps/api/main.js" ]
