import './index.css';
import Propertyimg from '../../assets/img/icons/1.png';
import Tradeimg from '../../assets/img/icons/3.png';
import waterimg from '../../assets/img/icons/5.png';
import Sewargeimg from '../../assets/img/icons/7.png';
import Fireimg from '../../assets/img/icons/9.png';
import Petimg from '../../assets/img/icons/11.png';
import obps from '../../assets/img/icons/13.png';
import pgr from '../../assets/img/icons/1q.png';
import slideone from '../../assets/img/pmidcgurughar.jpg';
import Faq from '../Faqs'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../myindex.css';

function hidePopup(event) {
    if (event) event.preventDefault();
    document.querySelector('.popup-overlay').style.display = 'none';
    document.querySelector('.mypop').style.display = 'none';
}

export default function Card() {
    return (
        <>
            <div className="popup-overlay"></div>
            <div className="mypop">
                <button className="popup-close" onClick={hidePopup}>✕</button>
                <img src="https://lgpunjab.gov.in/mf.png" alt="Punjab Plantation" />
            </div>
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <img className="d-block w-100" src={slideone} alt="PMIDC" />
                    </div>
                </div>

                <div className="secondpart">
                    <div className="bodaypage">
                        <div className="container">
                            <div className="row features">
                                <div className="col-sm-12 col-md-4">
                                    <div className="cardservice ">
                                        <a href='https://mseva.lgpunjab.gov.in/citizen' target="_new">
                                            <img src={Propertyimg} className="propertyimgone" alt='Punjab Property Tax' />
                                            <h5 className="card-title">Property Tax</h5></a>

                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="cardservice ">
                                        <a href='https://mseva.lgpunjab.gov.in/citizen' target="_new">
                                            <img src={Tradeimg} className="propertyimgone" alt='Punjab Trade license' />
                                            <h5 className="card-title">Trade license</h5></a>

                                    </div>
                                </div>  <div className="col-sm-12 col-md-4">
                                    <div className="cardservice ">
                                        <a href='https://mseva.lgpunjab.gov.in/citizen' target="_new">
                                            <img src={waterimg} className="propertyimgone" alt='Punjab Water' />
                                            <h5 className="card-title">Water</h5></a>

                                    </div>
                                </div>
                            </div>

                            <div className="row featuresthree">
                                <div className="col-sm-12 col-md-4">
                                    <div className="cardservice ">
                                        <a href='https://mseva.lgpunjab.gov.in/citizen' target="_new">
                                            <img src={Sewargeimg} className="propertyimgone" alt='Punjab Water' />
                                            <h5 className="card-title">Sewerage</h5></a>

                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="cardservice ">
                                        <a href='https://mseva.lgpunjab.gov.in/citizen' target="_new">
                                            <img src={Fireimg} className="propertyimgone" alt='Punjab Fire Noc' />
                                            <h5 className="card-title">Fire Noc</h5></a>

                                    </div>
                                </div>
                                {/* <div className="col-sm-12 col-md-4 cardserviceNone">
                                    <div className="cardservice ">
                                        <a href='http://petlicense.punjab.gov.in:8080/pet-license/' target="_new">
                                            <img src={Petimg} className="propertyimgone" alt='Punjab Pet license' />
                                            <h5 className="card-title">Pet license</h5></a>

                                    </div>
                                </div> */}
                                {/* <div className="col-sm-12 col-md-4 cardserviceNone">
                                    <div className="cardservice ">
                                        <a href='https://enaksha.lgpunjab.gov.in/' target="_new">
                                            <img src={obps} className="propertyimgone" alt='Punjab E-Naksha' />
                                            <h5 className="card-title">E-Naksha</h5></a>

                                    </div>
                                </div> */}
                                <div className="col-sm-12 col-md-4">
                                    <div className="cardservice ">
                                        <a href='https://mseva.lgpunjab.gov.in/citizen' target="_new">
                                            <img src={pgr} className="propertyimgone" alt='Punjab Public Grievance' />
                                            <h5 className="card-title">Public Grievance</h5></a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Faq />
        </>
    )
}