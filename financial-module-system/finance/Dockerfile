# Use JDK 8 for build to match pom.xml configuration (source/target 1.8)
# and avoid javax.annotation errors that occur with JDK 11+
# Using Maven 3.8 for multi-arch support (amd64 + arm64)
FROM maven:3.8-jdk-8 AS build
ARG WORK_DIR
WORKDIR /app

# copy the project files
COPY ${WORK_DIR} ./${WORK_DIR}
RUN cd ${WORK_DIR} \
    && mvn clean package -DskipTests
#COPY entrypoint.sh ./${WORK_DIR}/entrypoint.sh
#RUN chmod +x ./${WORK_DIR}/entrypoint.sh && ./${WORK_DIR}/entrypoint.sh

# Create runtime image - using official multi-arch WildFly image
# Supports both amd64 and arm64 platforms (replaces custom egovio/wildfly image)
FROM egovio/wildfly:nitish-edcr-71df1989

# Re-declare ARG as it's not available across build stages in Docker
ARG WORK_DIR
# Use WORK_DIR variable to correctly locate the EAR file built in the previous stage
COPY --from=build /app/${WORK_DIR}/egov-ear/target/*.ear /opt/jboss/wildfly/standalone/deployments/
USER jboss

CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0", "-Ddb.migration.enabled=true", "-Ddev.mode=true", "-Ddb.flyway.validateon.migrate=true"]
