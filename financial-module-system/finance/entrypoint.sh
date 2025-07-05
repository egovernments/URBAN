#!/bin/sh
metadata=$(wget https://nexus-repo.digit.org/nexus/content/groups/public/org/egov/egov-ear/3.0.2-COE-SNAPSHOT/maven-metadata.xml)
snapshotVersion=$(sed -n 's/.*<value>\([^<]*\)<\/value>.*/\1/p' ./maven-metadata.xml 2>&1 | head -n 1)
ear=$(wget https://nexus-repo.digit.org/nexus/content/groups/public/org/egov/egov-ear/3.0.2-COE-SNAPSHOT/egov-ear-$snapshotVersion.ear)
$(mkdir /app/egov/egov-ear/target)
$(mv egov-ear-$snapshotVersion.ear /app/egov/egov-ear/target/)
#echo "$snapshotVersion"
