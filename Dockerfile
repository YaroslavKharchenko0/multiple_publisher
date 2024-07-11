###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18.18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy the main application dependency manifests to the container image.
COPY --chown=node:node package*.json yarn.lock ./

# Install app dependencies using the `yarn install` command
RUN yarn install --frozen-lockfile

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18.18-alpine As build

WORKDIR /usr/src/app

# Copy the main application dependency manifests to the container image.
COPY --chown=node:node package*.json yarn.lock ./

# Copy over the source files and dependencies
COPY --chown=node:node --from=development /usr/src/app ./

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

FROM node:18.18-alpine As production

WORKDIR /usr/src/app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

COPY cert cert

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://127.0.0.1:4000 || exit 1

# Start the server using the production build
CMD [ "node", "dist/apps/api/main.js" ]
