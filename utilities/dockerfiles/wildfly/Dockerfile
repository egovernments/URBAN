FROM registry.access.redhat.com/ubi8/openjdk-8

# UBI images already have jboss user
USER root

ENV WILDFLY_VERSION=wildfly-latest
ENV JBOSS_HOME=/opt/jboss/wildfly
ENV TZ=Asia/Kolkata

# -----------------------------
# Timezone
# -----------------------------
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
 && echo $TZ > /etc/timezone

# -----------------------------
# Base utilities (multi-arch safe)
# -----------------------------
RUN microdnf install -y \
    curl \
    unzip \
    net-tools \
    fontconfig \
    dejavu-sans-fonts \
 && microdnf clean all


# -----------------------------
# Install WildFly
# -----------------------------
RUN mkdir -p /opt/jboss \
 && cd /tmp \
 && curl -fLO https://unified-demo-central-instance.s3.ap-south-1.amazonaws.com/${WILDFLY_VERSION}.zip \
 && unzip ${WILDFLY_VERSION}.zip \
 && mv ${WILDFLY_VERSION} ${JBOSS_HOME} \
 && rm -f ${WILDFLY_VERSION}.zip


# -----------------------------
# Custom configuration
# -----------------------------
COPY utilities/dockerfiles/wildfly/org \
     ${JBOSS_HOME}/modules/system/layers/base/org

COPY utilities/dockerfiles/wildfly/standalone.xml \
     ${JBOSS_HOME}/standalone/configuration/

COPY utilities/dockerfiles/wildfly/standalone.conf \
     ${JBOSS_HOME}/bin/

# -----------------------------
# Permissions
# -----------------------------
RUN chown -R jboss:jboss ${JBOSS_HOME} \
 && chmod -R 775 ${JBOSS_HOME}

ENV LAUNCH_JBOSS_IN_BACKGROUND=true

# -----------------------------
# Switch to non-root
# -----------------------------
USER jboss

# -----------------------------
# Expose ports
# -----------------------------
EXPOSE 8080 9990

# -----------------------------
# Create admin user
# -----------------------------
RUN ${JBOSS_HOME}/bin/add-user.sh admin Admin#70365 --silent

# -----------------------------
# Startup
# -----------------------------
CMD ["/opt/jboss/wildfly/bin/standalone.sh", \
     "-b", "0.0.0.0", \
     "-bmanagement", "0.0.0.0", \
     "-Ddb.migration.enabled=false"]
