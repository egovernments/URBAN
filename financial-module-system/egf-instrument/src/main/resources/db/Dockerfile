FROM egovio/flyway:4.1.2

COPY ./migration/main /flyway/sql

COPY ./migration/seed /flyway/seed

COPY migrate.sh /usr/bin/migrate.sh

RUN chmod +x /usr/bin/migrate.sh

ENTRYPOINT ["/usr/bin/migrate.sh"]
