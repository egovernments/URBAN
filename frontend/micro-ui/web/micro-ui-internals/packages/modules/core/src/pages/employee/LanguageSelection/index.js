import React from "react";

const LanguageSelection = () => {
  // 1️⃣ Detect screen size
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 998;
  const isDesktop = windowWidth > 998;

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>

      {/* Reset body margin for this page */}
      <style>
        {`
        body {
          margin: 0;
          padding: 0;
        }
      `}
      </style>

      {/* HEADER */}
      <div
        style={{
          ...styles.header,
          marginTop: isMobile ? "-45px" : "16px"
        }}
      >
        Welcome to e-Indore Municipal Corporation (e-IMC)
      </div>

      {/* BANNER */}
      <div
        style={{
          ...styles.banner,
          flexDirection: isMobile ? "column" : "row",
          textAlign: isMobile ? "center" : "left",
          padding: isMobile ? "10px 0 0 0" : "20px"
        }}
      >
        <img
          src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Rectangle%2010.svg"
          alt="Rajwada"
          style={{
            ...styles.image,
            width: isMobile ? "90%" : isTablet ? "50%" : "60%",
            marginBottom: isMobile ? "15px" : "0",
            marginLeft: isMobile ? "5%" : "0",
            marginRight: isMobile ? "5%" : "0",
            marginTop: 0
          }}
        />
        <div
          style={{
            ...styles.bannerText,
            textAlign: isMobile ? "center" : "left",
            paddingLeft: isMobile ? "0" : "20px"
          }}
        >
          <h2
            style={{
              ...styles.yourUrban,
              fontSize: isMobile ? "20px" : isTablet ? "26px" : "32px",
              lineHeight: "1.2",
              paddingLeft: !isMobile ? "20px" : "0"
            }}
          >
            Your Urban Services<br />One Login Away!
          </h2>
          <div
            style={{
              ...styles.loginButtons,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "center" : "flex-start",
              paddingLeft: isMobile ? "10px" : "20px"
            }}
          >
            <button
              style={{
                ...styles.loginButton,
                fontSize: isMobile ? "14px" : isTablet ? "16px" : "20px",
                padding: isMobile
                  ? "6px 12px"
                  : isTablet
                    ? "8px 14px"
                    : "10px 20px",
                width: isMobile ? "100%" : "auto",
                justifyContent: "center"
              }}
              onClick={() => window.location.href = "/digit-ui/citizen/login"}
            >
              <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Vector.svg" /> Citizen Login
            </button>
            <button
              style={{
                ...styles.loginButton,
                fontSize: isMobile ? "14px" : isTablet ? "16px" : "20px",
                padding: isMobile
                  ? "6px 12px"
                  : isTablet
                    ? "8px 14px"
                    : "10px 20px",
                width: isMobile ? "100%" : "auto",
                justifyContent: "center"
              }}
              onClick={() => window.location.href = "/digit-ui/employee/user/login"}
            >
              <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Vector.svg" /> IMC Login
            </button>
          </div>
        </div>
      </div>

      {/* QUICK PAYMENTS */}
      <div
        style={{
          ...styles.section,
          flexDirection: isMobile ? "column" : "row",
          padding: isMobile ? "10px" : "20px",
          justifyContent: isMobile ? "flex-start" : "space-evenly",
          alignItems: isMobile ? "stretch" : "center"
        }}
      >
        <div style={styles.sectionTitle}>
          <img
            src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/currency-coin-rupee.svg"
            style={{ margin: "auto" }} />Quick Payments
        </div>
        {!isMobile && <div style={styles.verticalDivider}></div>}

        <div style={{
          ...styles.card,
          flex: isMobile ? "1 1 auto" : "1 1 300px",
          width: isMobile ? "100%" : "auto",
          margin: isMobile ? "10px 2% 10px 0%" : "10px"
        }}>
          <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Vector%20(1).svg" />
          Property Tax
        </div>

        {!isMobile && <div style={styles.verticalDivider}></div>}

        <div style={{
          ...styles.card,
          flex: isMobile ? "1 1 auto" : "1 1 300px",
          width: isMobile ? "100%" : "auto",
          margin: isMobile ? "10px 2% 10px 0%" : "10px"
        }}>
          <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/water_voc.svg" />
          Water Tax
        </div>

        {!isMobile && <div style={styles.verticalDivider}></div>}

        <div style={{
          ...styles.card,
          flex: isMobile ? "1 1 auto" : "1 1 300px",
          width: isMobile ? "100%" : "auto",
          margin: isMobile ? "10px 2% 10px 0%" : "10px"
        }}>
          <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321313953.svg" />
          Shop Rent
        </div>
      </div>

      {/* OTHER SERVICES */}
      <div
        style={{
          ...styles.section,
          flexDirection: isMobile ? "column" : "row",
          padding: isMobile ? "10px" : "20px"
        }}
      >
        <div style={styles.sectionTitle}>
          <img
            src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/user-profile-star.svg"
            style={{ margin: "auto" }} />Other Services
        </div>
        {!isMobile && <div style={styles.verticalDivider}></div>}

        <div style={{
          ...styles.card,
          flex: isMobile ? "1 1 auto" : "1 1 300px",
          width: isMobile ? "100%" : "auto",
          margin: isMobile ? "10px 2% 10px 0%" : "10px"
        }}>
          <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201000006503.svg" />
          Marriage Registration
        </div>
        {!isMobile && <div style={styles.verticalDivider}></div>}

        <div style={{
          ...styles.card,
          flex: isMobile ? "1 1 auto" : "1 1 300px",
          width: isMobile ? "100%" : "auto",
          margin: isMobile ? "10px 2% 10px 0%" : "10px"
        }}>
          <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/delivery.svg" />
          Funeral Van
        </div>
        {!isMobile && <div style={styles.verticalDivider}></div>}

        <div style={{
          ...styles.card,
          flex: isMobile ? "1 1 auto" : "1 1 300px",
          width: isMobile ? "100%" : "auto",
          margin: isMobile ? "10px 2% 10px 0%" : "10px"
        }}>
          <img src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/08dbb3cd-e05f-4b0e-870c-60f8b7bacc29.svg" />
          Road Cutting
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          ...styles.footer,
          display: "flex",
          gap: "20px",
          flexDirection: isMobile ? "column" : "row",
          textAlign: isMobile ? "center" : "left",
          alignItems: "stretch",
          width: "100%"
        }}
      >
        {/* Social Media Column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={styles.sectionTitle}>Social Media</div>
          <div style={{ ...styles.column, flex: 1 }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <div
                  style={{
                    width: "20%",               // fixed width container for the image
                    minWidth: "40px",
                    maxWidth: "100px",
                    marginRight: "10px",
                    marginLeft: '10px',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",       // vertical center

                  }}
                >
                  <img
                    src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321313967.svg"
                    alt="News Thumbnail"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",         // ensures image fits vertically as well
                      objectFit: "contain"
                    }}
                  />
                </div>
                <p
                  style={{
                    width: "80%",
                    margin: 0,
                    textAlign: "left",     // right align text section
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <span style={styles.headDropStyle}>Indore Municipal Corporation @SwachhIndore</span><br />
                  <span style={styles.parraStyle}>
                    Another year of Swachh Legacy!<br />
                    This New chapter begins with new tasks and responsibilities..
                  </span>
                </p>
              </div>

              {/* <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#6B133F",
                  margin: "15px 0"
                }}
              ></div> */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between", // space between image and text
                  width: "100%",
                  marginTop: "10%"
                }}
              >
                <div
                  style={{
                    width: "20%",               // fixed width container for the image
                    minWidth: "40px",
                    maxWidth: "100px",
                    marginRight: "10px",
                    marginLeft: '10px',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",       // vertical center

                  }}
                >
                  <img
                    src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321313964.svg"
                    alt="News Thumbnail"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",         // ensures image fits vertically as well
                      objectFit: "contain"
                    }}
                  />
                </div>

                <p
                  style={{
                    width: "80%",
                    margin: 0,
                    textAlign: "left",     // right align text section
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <span style={styles.headDropStyle}>Indore Municipal Corporation @SwachhIndore</span><br />
                  <span style={styles.parraStyle}>
                    Another year of Swachh Legacy!<br />
                    This New chapter begins with new tasks and responsibilities..
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        {!isMobile && (
          <div
            style={{
              width: "2px",
              backgroundColor: "#6B133F",
              margin: "0 10px"
            }}
          />
        )}

        {/* Latest News Column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: isMobile ? "10px" : "0",              // padding on mobile
            alignItems: isMobile ? "center" : "flex-start" // center on mobile, left on desktop
          }}
        >
          <div
            style={{
              ...styles.sectionTitle,
              fontSize: isMobile ? "20px" : isTablet ? "22px" : "24px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Latest News
          </div>

          <div
            style={{
              ...styles.column,
              flex: 1,
              width: isMobile ? "100%" : "auto",
              padding: isMobile ? "10px" : "10px"
            }}
          >
            {/* First news item */}
            <div style={{ marginBottom: isMobile ? "20px" : "30px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                  gap: "10px"
                }}
              >
                <div
                  style={{
                    width: "20%",
                    minWidth: "40px",
                    maxWidth: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <img
                    src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321313966.svg"
                    alt="News Thumbnail"
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
                <p
                  style={{
                    width: "80%",
                    margin: 0,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <span style={styles.headDropStyle}>Indore Municipal Corporation @SwachhIndore</span>
                  <br />
                  <span style={styles.parraStyle}>
                    Another year of Swachh Legacy!<br />
                    This New chapter begins with new tasks and responsibilities..
                  </span>
                </p>
              </div>

              <div
                style={{
                  width: isMobile ? "80%" : "80%",       // Match upper text container width
                  marginLeft: isMobile ? "10%" : "0",   // Center on mobile (leaves 10% margin both sides)
                  marginTop: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",         // fill the wrapper width
                    // marginLeft: "25%"
                  }}
                >
                  <div style={styles.figtreeBoldTextStyle}>Today</div>
                  <div style={styles.figtreeBoldTextStyle}>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
            </div>

            {/* <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#6B133F",
                margin: "15px 0"
              }}
            ></div> */}

            {/* Second news item */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                  gap: "10px"
                }}
              >
                <div
                  style={{
                    width: "20%",
                    minWidth: "40px",
                    maxWidth: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <img
                    src="https://tfstate8auyj.blob.core.windows.net/egov-dev-assets/Frame%201321313965.svg"
                    alt="News Thumbnail"
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
                <p
                  style={{
                    width: "80%",
                    margin: 0,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginTop: isMobile ? "20px" : "0",
                  }}
                >
                  <span style={styles.headDropStyle}>Indore Municipal Corporation @SwachhIndore</span>
                  <br />
                  <span style={styles.parraStyle}>
                    Another year of Swachh Legacy!<br />
                    This New chapter begins with new tasks and responsibilities..
                  </span>
                </p>
              </div>
              <div
                style={{
                  width: isMobile ? "80%" : "80%",       // Match upper text container width
                  marginLeft: isMobile ? "10%" : "0",   // Center on mobile (leaves 10% margin both sides)
                  marginTop: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",         // fill the wrapper width
                    // marginLeft: "25%"
                  }}
                >
                  <div style={styles.figtreeBoldTextStyle}>18-07-2024</div>
                  <div style={styles.figtreeBoldTextStyle}>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

// Base styles object
const styles = {
  container: {
    fontFamily: "sans-serif",
    backgroundColor: "#f5f1f7",
    width: "100%"
  },
  header: {
    backgroundColor: "#6B133F",
    color: "white",
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Inter",
    fontSize: "24px"
  },
  banner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#6B133F4D",
    borderRadius: "10px",
    marginTop: "6px"
  },
  bannerText: {
    flex: 1,
    textAlign: "right",
  },
  yourUrban: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontStyle: "italic",
    fontSize: "32px",
    lineHeight: "100%",
    color: "#6B133F",
  },
  image: {
    width: "60%",
    borderRadius: "10px",
  },
  loginButtons: {
    marginTop: "10px",
  },
  loginButton: {
    backgroundColor: "#6B133F",
    padding: "10px 20px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "100%",
    color: "#FFFFFF",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
  },
  section: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: "20px",
    backgroundColor: "#6B133F4D",
    borderRadius: "10px",
    marginTop: "10px",
    alignItems: "center",
  },
  sectionTitle: {
    width: "100%",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#6B133F",
    fontFamily: "Inter",
    fontSize: "24px",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    // margin: "10px",
    flex: "1 1 200px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    cursor: "pointer",
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "100%",
    color: "#6B133F",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#6B133F4D",
    marginTop: "10px",
    borderRadius: "10px",
    gap: "20px",
  },
  column: {
    flex: "1",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    overflowY: "auto",
    maxHeight: "500px",
  },
  verticalDivider: {
    width: "3px",
    height: "115px",
    backgroundColor: "#6B133F",
  }
};

export default LanguageSelection;
