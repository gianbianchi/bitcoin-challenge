FROM postgres
ENV POSTGRES_DB application
COPY psql_dump.sql /docker-entrypoint-initdb.d/
EXPOSE 5432