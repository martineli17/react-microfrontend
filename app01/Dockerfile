# Building app
FROM node as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Starting NGINX
FROM nginx
EXPOSE 80
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html