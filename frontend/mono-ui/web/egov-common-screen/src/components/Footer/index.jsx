import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../myindex.css';
import facebook from "../../assets/img/facebook.png";
import twitter from "../../assets/img/twitter.png";
import chrome from "../../assets/img/chrome.png";
import edge from "../../assets/img/edge.png";
import mozilla from "../../assets/img/mozilla.png";
import wz from "../../assets/img/w3c.jpg";
import gigw from "../../assets/img/GIGW_LOGO.png";
import android from "../../assets/img/mseva-google-play.png"
import { useState } from "react";
import Privacy from '../Privacy'

import privacy from "../../assets/img/Data-Policy.pdf";
import BlockchainStrategy from "../../assets/img/BlockchainStrategymerged.pdf";
import AIStrategy from "../../assets/img/AIStrategymerged.pdf";
import Emerging from "../../assets/img/Emerging-Technologies.pdf";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,

//         backgroundColor: "#0b519e"

//     },
//     container:
//     {
//         marginLeft: "10%",
//         marginRight: "10%",
//         marginTop: "10%",
//         paddingRight: "18%",
//         paddingTop: "50px"

//     },
//     header:
//     {
//         fontFamily: "Roboto",
//         fontStyle: "normal",
//         fontWeight: "500",
//         fontSize: "16px",
//         lineHeight: "24px",
//         color: "#FFFFFF"

//     },
//     paragraph:
//     {
//         color: "#FFFFFF",
//         fontFamily: "Roboto",
//         fontStyle: "normal",
//         fontWeight: "normal",
//         fontSize: "14px",
//         lineHeight: "20px"

//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));
const Popup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center   mycsss" >
            <button type="button" class="btn-close btn-close-black" aria-label="Close" onClick={onClose}></button>
            <div className=" p-6 rounded-lg shadow-lg">
                <Privacy />
                <button
                    className="mt-4 px-4 py-2 bg-red-500  rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
export default function Footer() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>

            <div className="footertop">
                <div className='footerdesign'>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-sm-6 col-xs-12 ">
                                <div className="flex flex-col items-center justify-center min-h-screen">
                                    {/* <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                        onClick={() => setIsOpen(true)}
                                    >
                                        Open Popup
                                    </button> */}
                                    {isOpen && <Popup onClose={() => setIsOpen(false)} />}
                                </div>
                                <p>
                                    <h5 className="header" style={{ fontSize: "1rem", marginTop: "-5px" }}>
                                        <b>Contact Details</b>
                                    </h5></p>
                                <p className="paragraph" >
                                    Office Address: <br />
                                    Punjab Municipal Bhawan,<br /> 3, Dakshin Marg, 35A,<br />
                                    Chandigarh, 160022 <br />
                                </p>
                                <p className="paragraph" >
                                    Call Us:<br />
                                    1800 1800 0172<br />
                                </p>
                                <p className="paragraph" >
                                    Email Us:<br />
                                    <a href="mailto:pgrs.lg@punjab.gov.in" className='email'>pgrs.lg@punjab.gov.in</a>
                                    <br /></p>
                                <p className="paragraph" >
                                    Click here to download the MSEVA App<br />

                                    <a href="#" target='_blank'>
                                        <img src={android} style={{ width: "45%", marginRight: "6%" }} alt='mSewa Punjab' /></a>

                                </p>
                                <p className="paragraph" >
                                    For any  issues regarding online payments:<br />
                                    <p>
                                        <a href="mailto:egovdolg@gmail.com" className='email'>egovdolg@gmail.com</a>
                                        <br /> </p>
                                    <a href="https://www.facebook.com/pmidc1/" target='_blank'>
                                        <img src={facebook} style={{ width: "6%", marginRight: "6%" }} alt='mSewa Punjab' /></a>
                                    <a href="https://twitter.com/pmidcpunjab" target='_blank'>
                                        <img src={twitter} style={{ width: "6%" }} alt='mSewa Punjab' /></a>
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-6 col-xs-12 ">
                                <p>
                                    <h5 className="header" style={{ fontSize: "1rem", marginTop: "-5px" }}><b>Other Departments</b></h5>
                                </p>
                                <a
                                    href="https://lgpunjab.gov.in/"
                                    id="flink"
                                    //className={classes.block}
                                    target="_blank"
                                >
                                    Local Government Punjab
                                </a><br />
                                <a
                                    href="https://pmidc.punjab.gov.in/"
                                    id="flink"
                                    //className={classes.block}
                                    target="_blank"
                                >
                                    PMIDC
                                </a><br />
                                <a
                                    href="https://lgpunjab.gov.in/cms/contact-us.php"
                                    id="flink"
                                    //className={classes.block}
                                    target="_blank"
                                >
                                    Contact Us
                                </a><br />
                                <a
                                    href="https://mseva-uat.lgpunjab.gov.in/common/privacy"
                                    id="flink"
                                    //className={classes.block}
                                    target="_blank"
                                >
                                    Privacy policy
                                </a><br />
                                <a
                                    href="https://mseva-uat.lgpunjab.gov.in/common/impersonation"
                                    id="flink"
                                    //className={classes.block}
                                    target="_blank"
                                >
                                    Impersonation Policy
                                </a><br />
                                <a
                                    href="https://nesda.centralindia.cloudapp.azure.com/#/citizen-survey"
                                    id="flink"
                                    //className={classes.block}
                                    target="_blank"
                                >
                                    Citizen Survey
                                </a><br />
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 ">
                                <p              >
                                    <h5 className="header" style={{ fontSize: "1rem", marginTop: "-5px" }}><b>User Manuals</b></h5>
                                </p>
                                <a
                                    href="https://urban.digit.org/products/modules/property-tax"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"

                                >
                                    Property Tax
                                </a><br />
                                <a
                                    href="https://urban.digit.org/products/modules/trade-license-tl"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"

                                >
                                    Trade Licence
                                </a><br />
                                <a
                                    href="https://urban.digit.org/products/modules/water-and-sewerage"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"

                                >
                                    Water & Sewerage
                                </a><br />
                                <a
                                    href="https://urban.digit.org/products/modules/public-grievances-and-redressal"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"

                                >
                                    Public Grievances & Redressal
                                </a><br />
                                <a
                                    href="https://urban.digit.org/products/modules/fire-noc"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"

                                >
                                    Fire NOC
                                </a><br />
                                <a
                                    href={AIStrategy}
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"
                                >
                                    AI Strategy
                                </a> <br />
                                <a
                                    href={BlockchainStrategy}
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"
                                >
                                    Block Chain Strategy
                                </a> <br />
                                <a
                                    href={Emerging}
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"
                                >
                                    Emerging Technologies
                                </a> <br />
                                <a
                                    href="https://www.youtube.com/@eSewaPunjabDOLGPunjab"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"

                                >
                                    mSewa YouTube Channel
                                </a><br />
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 ">
                                <p>
                                    <h5 className="header" style={{ fontSize: "1rem", marginTop: "-5px" }}><b>About Us</b></h5>
                                </p>
                                <a
                                    href="#"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"
                                >
                                    About mSewa
                                </a><br />

                                <a
                                    href=" http://egov.org.in/"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"
                                >
                                    About eGov Foundation
                                </a> <br />
                                <a
                                    href="https://mseva.lgpunjab.gov.in/citizen/language-selection"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"
                                >
                                    What's New
                                </a> <br />
                                <a
                                    href="https://lgpunjab.gov.in/cms/transparency-act.php"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"
                                >
                                    Service Delivery Charter
                                </a> <br />

                                <a
                                    href="https://punjab.gov.in/wp-content/uploads/2022/12/Holidays-List-2023-Pbi-and-Eng_0001.pdf"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"
                                >
                                    Holiday List
                                </a> <br />
                                <a
                                    href="#"
                                    //className={classes.block}
                                    target="_blank"
                                    id="flink"
                                >
                                    Data Security Policy
                                </a> <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='infofoot'>
                <center style={{ color: "#ffffff" }}>Information provided online is update and no physical visit is required</center> <br />
                {/* <center style={{color:"#ffffff"}}>Last Updated July 2021</center> <br />     */}
                <center style={{ color: "#ffffff" }}>Number of Visitor 20245</center> <br />
                <center style={{ color: "#ffffff" }}><span style={{ color: "red" }}>*</span>Supported browser versions</center> <br />
                <center >

                    <table >
                        <tr >
                            <td style={{ color: "#ffffff", width: "100px" }}><center> <img src={chrome} alt='mSewa Punjab' width='60px' /></center></td>
                            {/* <td style={{color:"#ffffff", width: "100px"}}> <center><img src={edge}   /></center></td> */}
                            <td style={{ color: "#ffffff", width: "100px" }}> <center><img src={mozilla} alt='mSewa Punjab' width='30px' /></center></td>
                        </tr>
                        <tr >
                            <td style={{ color: "#ffffff", width: "100px" }}><center> &gt;V-81</center></td>
                            {/* <td style={{color:"#ffffff", width: "100px"}}> <center>&gt;V-84</center></td> */}
                            <td style={{ color: "#ffffff", width: "100px" }}> <center>&gt;V-79</center></td>
                        </tr>

                    </table>     </center>
            </div>
            <div className="footerchangen">
                <div className="container">
                    <div className="row ">

                        <div className="col-sm-12 col-md-6">
                            <p>© 2025 PMIDC, GOVERNMENT OF PUNJAB. All Rights Reserved by PMIDC</p>
                        </div>
                        <div className="col-sm-12 col-md-6 lupwz">
                            <p>Last updated on : 31-01-2025 | <img src={wz} alt='mSewa Punjab' className="wz" /> <img src={gigw} alt='mSewa Punjab' className="wz" /></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
