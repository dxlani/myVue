FROM node:6.9.5

RUN wget http://nginx.org/keys/nginx_signing.key && apt-key add nginx_signing.key

# COPY ./sources.list /etc/apt/sources.list

RUN apt-get update && \
    apt-get install -y ca-certificates nginx && \
    rm -rf /var/lib/apt/lists/*

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY ./conf/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm i bootstrap url url-loader style-loader css-loader --save

WORKDIR /app

COPY ./package.json /app/

RUN cnpm install --allow-root

COPY . /app/

RUN cnpm run build

RUN cp -R /app/dist/*  /usr/share/nginx/html

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezoness

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]