import './driver-item.css'
import avatar from '~/assets/images/thumb.jpg'
import ic_transport from '~/assets/images/ic_car.svg'
export default function DriverItem(){
    return (

            <li className="member driver-registration-status refuse-driver-registration-status bg-red-light">
                <div className="thumb">
                    <img src={avatar} alt="avatar"/>
                </div>
                <div className="description">
                    <h3 className="driver-name-item">Ryan</h3>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-1 col-md-1 col-lg-4 col-xl-3" style={{height: '2.3rem'}}>

                            </div>
                            <div className="col-sm-5 col-md-6 col-lg-4 col-xl-3">
                                <div className="mb-3">
                                    <label className="form-label title-info-driver">Identity Number</label>
                                    <div>00123123124412</div>
                                </div>
                            </div>
                            <div className="col-sm-5 col-md-6 col-lg-4 col-xl-3">
                                <div className="mb-3">
                                    <label className="form-label title-info-driver">Phone Number</label>
                                    <div>0374463592</div>
                                </div>
                            </div>
                            <div className="col-sm-5 col-md-6 col-lg-4 col-xl-3">
                                <div className="mb-3">
                                    <label className="form-label title-info-driver">Transport Type</label>
                                    <div>
                                        <img
                                        style={{width: '50px', height: '50px', marginRight: '1rem'}}
                                        src={ic_transport}
                                        alt="transport-type"/>
                                        Truck
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
    )
}