FROM postgres

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB postgres

COPY ./data_generator/data/harddrive.csv /
COPY ./sql/harddrive.sql /docker-entrypoint-initdb.d
#COPY ./sql/copy_csv.sql /docker-entrypoint-initdb.d
COPY ./scripts/database/create-role.sh /docker-entrypoint-initdb.d


# ADD create-role.sh /docker-entrypoint-initdb.d
# ADD sql/videos.sql /docker-entrypoint-initdb.d