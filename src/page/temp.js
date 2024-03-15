import {useParams} from "react-router-dom";
import {PrimaryButton} from '~/components/custom'
export default function DriverRegisterPage(){
    const {id} = useParams()
    return (
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-12">
                    <div className="col-sm-12 col-xl-12" style={{position: 'sticky', zIndex: '1000', top: '64px'}}>
                        <div className="d-flex p-4 shadow rounded justify-content-between align-items-end bg-glass">
                            <h5 style={{textAlign: 'center'}}>Profile</h5>
                            <PrimaryButton text={'change pass'}/>
                        </div>
                    </div>
                    <div className="container-fluid pt-4"
                         style={{paddingRight: '0', paddingLeft: '0'}}>
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-6">
                                <div className="shadow rounded h-100 p-4 bg-glass">
                                </div>
                            </div>
                            <div className="col-sm-12 col-xl-6 ">
                                <div className="shadow rounded h-100 p-4 bg-glass">
                                    <h6>Academic Information</h6>
                                    <label htmlFor="role" className="col-form-label title-field">Role</label>
                                    <p></p>

                                    <label htmlFor="faculty" className="col-form-label mt-3 title-field">Faculty</label>
                                    <p></p>

                                    <label htmlFor="start_year" className="col-form-label mt-3 title-field">Start
                                        Year</label>
                                    <p></p>
                                    <label htmlFor="end_year" className="col-form-label mt-3 title-field">End
                                        Year</label>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}