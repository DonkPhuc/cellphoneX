#######################################
# Build Stage: Used to build VueJS
#######################################
FROM node:16.14.2 as build-stage

# Install software in container
RUN npm install -g pnpm

# Build Vue app
WORKDIR /app
COPY ./ .
RUN cp -f .env.production .env
RUN pnpm install
RUN pnpm lint && \
    pnpm build

########################################
# Runtime Stage: Used to deploy Nginx
########################################
FROM nginx:1.23.3 as production-stage

# Copy build output from build stage to nginx container
WORKDIR /app
COPY --from=build-stage /app/dist ./

# Startup nginx
CMD ["nginx", "-g", "daemon off;"]
