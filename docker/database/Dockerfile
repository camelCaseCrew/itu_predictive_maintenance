FROM postgres

COPY ./sql/ /docker-entrypoint-initdb.d
COPY ./scripts/database/create-role.sh /docker-entrypoint-initdb.d

RUN apt-get update && apt-get install -y dos2unix

RUN dos2unix /docker-entrypoint-initdb.d/create-role.sh

USER postgres
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB postgres

# ADD create-role.sh /docker-entrypoint-initdb.d
# ADD sql/videos.sql /docker-entrypoint-initdb.d
