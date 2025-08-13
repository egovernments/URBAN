package org.bel.birthdeath.birth.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.bel.birthdeath.birth.certmodel.BirthCertAppln;
import org.egov.tracer.model.CustomException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class BirthCertApplnRowMapper implements ResultSetExtractor<List<BirthCertAppln>> {

	@Override
	public List<BirthCertAppln> extractData(ResultSet rs) throws SQLException, DataAccessException {
		Map<String, BirthCertAppln> birthDtlMap = new LinkedHashMap<>();
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		try {
			while (rs.next()) {
				String applNo = rs.getString("birthCertificateNo");
				BirthCertAppln certReq = birthDtlMap.get(applNo);

				if (certReq == null) {
					// Format application date
					String applicationDate = rs.getString("createdtime");
				
					// Get date of birth in epoch format
					String dateOfBirth = "NA";
					Timestamp dobTimestamp = rs.getTimestamp("dateofbirth");
					if (dobTimestamp != null) {
						dateOfBirth = String.valueOf(dobTimestamp.getTime());
					}
					
					// Get parent names
					String motherName = rs.getString("mothername");
					if (motherName == null || motherName.trim().isEmpty()) {
						motherName = "NA";
					}
					
					String fatherName = rs.getString("fathername");
					if (fatherName == null || fatherName.trim().isEmpty()) {
						fatherName = "NA";
					}
					
					certReq = BirthCertAppln.builder()
							.applicationCategory("Birth")
							.applicationType("CERT_DOWNLOAD")
							.applicationNumber(applNo)
							.applicationDate(applicationDate)
							.regNo(rs.getString("registrationno"))
							.name(rs.getString("name"))
							.status(rs.getString("status"))
							.tenantId(rs.getString("tenantid"))
							.fileStoreId(rs.getString("filestoreid"))
							.motherName(motherName)
							.fatherName(fatherName)
							.dateOfBirth(dateOfBirth)
							.build();
					birthDtlMap.put(applNo, certReq);
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new CustomException("INVALID INPUT", "Error in fetching data");
		}
		return new ArrayList<> (birthDtlMap.values());
	}

}