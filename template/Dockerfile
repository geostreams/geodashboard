# Takes the project name as input and builds an image for the
# specific project. The build files are served with nginx.

ARG PROJECT_NAME=''

FROM node:12-alpine as build

WORKDIR /geodashboard
COPY . .
RUN apk add git
RUN apk add openssh
RUN git submodule init
RUN git submodule update
RUN npm run clean
RUN npm i --quiet
RUN npm run postinstall

ARG PROJECT_NAME
# Loads environment variables for npm if .env file present
RUN [ -f .env ] && export $(xargs < .env); npm run build -- $PROJECT_NAME


FROM nginx:stable-alpine
ARG PROJECT_NAME
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d

COPY --from=build /geodashboard/$PROJECT_NAME/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 