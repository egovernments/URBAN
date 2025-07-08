package org.bel.birthdeath.birth.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.bel.birthdeath.common.contract.ParentInfo;
import org.bel.birthdeath.common.contract.UserOwnerSearchCriteria;
import org.bel.birthdeath.common.model.user.User;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EgBirthDtl implements UserOwnerSearchCriteria {

	private String id;

	private String createdby;

	private Long createdtime;

	private Timestamp dateofbirth;

	private Timestamp dateofreport;
	
	private String dateofbirthepoch;

	private String dateofreportepoch;
	
	private int excelrowindex;
	//@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
	private Long dateofissue;

	private String firstname;

	private Integer gender;
	
	private String genderStr;

	private String hospitalname;

	private String informantsaddress;

	private String informantsname;

	private String lastname;

	private String middlename;

	private String placeofbirth;

	private String registrationno;

	private String remarks;

	private String lastmodifiedby;

	private Long lastmodifiedtime;

	private Integer counter;
	
	private String tenantid;
	
	private String embeddedUrl;
	
	private String hospitalid;
	
	private EgBirthFatherInfo birthFatherInfo;

	private User user;

	private EgBirthMotherInfo birthMotherInfo;
	
	private EgBirthPermaddr birthPermaddr;
	
	private EgBirthPresentaddr birthPresentaddr;
	
	private String birthcertificateno;
	
	private String rejectReason;
	
	private String fullName;

	private Boolean isLegacyRecord = false;

	@Override
	public String getTenantid() {
		return this.tenantid;
	}

	@Override
	public ParentInfo getFatherInfo() {
		return this.birthFatherInfo;
	}
}