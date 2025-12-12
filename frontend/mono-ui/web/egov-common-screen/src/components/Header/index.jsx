import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../myindex.css';
import rightImage from "../../assets/img/pmidc - final logo.png";
import leftImage from "../../assets/img/Govt. of Punjab.png";
import slideone from '../../assets/img/pmidcgurughar.jpg';
import homeicon from '../../assets/img/homepage-icon.png';


export default function Header() {
    return (
        <>
            <div>
                <div>
                    <div className="hearderchange">
                        <div className="container">
                            <div className="row">

                                <div className="col-sm-12 col-md-6">
                                    <a href="#"><img src={homeicon} width="25px" /></a>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="langu"><a href="#">English</a>  / <a href="#"> ਪੰਜਾਬੀ</a></div>
                                    <div className="boldText">


                                        <a href="#">-A</a>
                                        <a href="#">A</a>
                                        <a href="#">+A</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="msewa-logo-postion">
                                <img className="msewalogo" src={leftImage} alt="PMIDC" />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="rightharder">
                                <a href="https://mseva.lgpunjab.gov.in/employee/language-selection" target="_blank">Employee Login </a><img id="rightimg" src={rightImage} />
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
              <div className="col-sm-12 col-md-12">
                <marquee id="note">Dear Citizen , One Time settlement for Property Tax has been implemented in mSeva. You requested check and Re-Assess your property before paying tax .</marquee>
              </div>
            </div> */}
                    {/* <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <img className="d-block w-100" src={slideone} alt="PMIDC" />
                        </div>
                    </div> */}

                </div>
            </div>
        </>

    )

}