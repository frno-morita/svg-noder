FROM debian:stretch-slim

MAINTAINER Fredrik Nordlund <fiddenordl@gmail.com>

RUN apt-get update && apt-get install -y apt-utils && \
    apt-get -y upgrade && \
    apt-get install -y \
    apt-transport-https \
    gnupg \
    sudo \
    curl

# Install node 8 and yarn
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo 'deb https://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y \
    nodejs \
    yarn

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
#ENTRYPOINT ["tail", "-f", "dev/null"]
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 8080
