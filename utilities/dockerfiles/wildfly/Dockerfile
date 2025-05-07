FROM jboss/base-jdk:8

# Set the WILDFLY_VERSION env variable
ENV WILDFLY_VERSION wildfly-latest
#ENV WILDFLY_SHA1 eaef7a87062837c215e54511c4ada8951f0bd8d5
ENV JBOSS_HOME /opt/jboss/wildfly

USER root
RUN rm /etc/localtime \
   && ln -s /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN cd $HOME
# Fix CentOS 7 repo issue
RUN sed -i 's|^mirrorlist=|#mirrorlist=|g' /etc/yum.repos.d/CentOS-Base.repo \
 && sed -i 's|^#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-Base.repo
RUN yum install -y epel-release
RUN yum install -y net-tools
RUN yum install -y curl cabextract xorg-x11-font-utils fontconfig
RUN curl -L -O http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
RUN rpm -Uvh nux-dextop-release-0-5.el7.nux.noarch.rpm
RUN rpm -Uvh  https://downloads.sourceforge.net/project/mscorefonts2/rpms/msttcore-fonts-installer-2.6-1.noarch.rpm
RUN rm nux-dextop-release-0-5.el7.nux.noarch.rpm

# Add the WildFly distribution to /opt, and make wildfly the owner of the extracted tar content
# Make sure the distribution is available from a well-known place
RUN cd /tmp \
    && curl -O https://unified-demo-central-instance.s3.ap-south-1.amazonaws.com/$WILDFLY_VERSION.zip \
    && unzip $WILDFLY_VERSION.zip \
    && rm $WILDFLY_VERSION.zip \
    && mv /tmp/wildfly-* $JBOSS_HOME \
    && rm $JBOSS_HOME/standalone/configuration/standalone.xml \
    && rm $JBOSS_HOME/bin/standalone.conf
COPY org /opt/jboss/wildfly/modules/system/layers/base/org
COPY standalone.xml /opt/jboss/wildfly/standalone/configuration/
COPY standalone.conf /opt/jboss/wildfly/bin/
RUN chown -R jboss:jboss ${JBOSS_HOME} \
    && chmod -R 775 ${JBOSS_HOME}
# Ensure signals are forwarded to the JVM process correctly for graceful shutdown
ENV LAUNCH_JBOSS_IN_BACKGROUND true

USER jboss

# Expose the ports we're interested in
EXPOSE 8080 9990

RUN /opt/jboss/wildfly/bin/add-user.sh admin Admin#70365 --silent

# Set the default command to run on boot
# This will boot WildFly in the standalone mode and bind to all interface
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0", "-Ddb.migration.enabled=false"]
