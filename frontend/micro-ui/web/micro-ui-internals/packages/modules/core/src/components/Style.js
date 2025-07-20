// style.js
const styles = {
    containerStyle: {
        fontFamily: "sans-serif",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        textAlign: "center",
        borderRadius: "20px",
        width: "90%",
        margin: "auto",
        height: "614px"
    },

    headerStyle: {
        fontFamily: 'Noto Sans',
        fontWeight: 600,
        fontStyle: 'normal', // 'SemiBold' is not valid, use fontWeight instead
        fontSize: '32px',
        lineHeight: '56px',
        letterSpacing: '0%',
        textAlign: 'center',
        verticalAlign: 'middle',
        color: '#4729A3'
    },

    subHeaderStyle: {
        fontFamily: 'Noto Sans',
        fontWeight: 600,            // SemiBold corresponds to font-weight 600
        fontStyle: 'normal',        // 'SemiBold' is not valid for fontStyle
        fontSize: '16px',
        lineHeight: '100%',         // Use string to preserve percentage
        letterSpacing: '0px',       // 0% letter spacing : 0px
        color: 'rgb(40, 40, 40)',
        textAlign: "left"
    },

    gridStyle: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        justifyItems: "center",
        marginBottom: "20px",
        marginTop: "20px"
    },

    cardStyle: {
        backgroundColor: "#4729A3",
        borderRadius: "10px",
        padding: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        width: "322px",
        // maxWidth: "220px",
        justifyContent: "space-between",
        cursor: "pointer",
        height: "70px"
    },

    iconStyle: {
        width: "50px",
        height: "50px",
        backgroundColor: "#fff",
        padding: "5px",
        borderRadius: "10px"
    },

    buttonStyle: {
        backgroundColor: "#F4D390",
        border: "none",
        padding: "7px 15px",
        borderRadius: "20px",
        fontFamily: 'Noto Sans',
        fontWeight: 900,            // 'Black' corresponds to 900
        fontStyle: 'normal',        // 'Black' is not a valid font-style
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0px',
        color: '#282828'
    },

    dropdownStyle: {
        backgroundColor: "#4729A3",
        borderRadius: "10px",
        padding: "10px",
        marginTop: "5px",
        color: "#000",
        position: "absolute",
        width: "322px"
    },

    dropdownItemStyle: {
        backgroundColor: "#F4D390",
        border: "none",
        padding: "8px",
        borderRadius: "10px",
        margin: "5px 0",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        fontFamily: 'Noto Sans',
        fontWeight: 600,             // 'SemiBold' → fontWeight: 600
        fontStyle: 'normal',         // 'SemiBold' is not a valid font-style
        fontSize: '14px',
        lineHeight: '100%',
        letterSpacing: '0.48px',     // 3% of 16px font size : 0.03 * 16 : 0.48px
        verticalAlign: 'middle',
        color: '#282828'
    },

    viewMoreButton: {
        height: "45px",
        width: "217px",
        backgroundColor: "#4729A3",
        color: "#FFFFFF",
        borderRadius: "20px",
        fontFamily: 'Noto Sans',
        fontWeight: 500,            // Medium : 500
        fontStyle: 'normal',        // 'Medium' is not a valid font-style
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0px',
        textAlign: 'center',
        verticalAlign: 'middle'
    },
}

export default styles;
