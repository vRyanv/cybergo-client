export default function DashboardPage(){
    return (
        <>
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-6 col-xl-6">
                    <div className="bg-glass shadow rounded d-flex align-items-center justify-content-between p-4">
                        <div className="ms-3">
                            <p className="mb-2">Students</p>
                            <h6 className="mb-0 text-end">
                                                123
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-6">
                    <div className="bg-glass shadow rounded d-flex align-items-center justify-content-between p-4">
                        <div className="ms-3">
                            <p className="mb-2">Contributes</p>
                            <h6 className="mb-0 text-end">
                               123
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="col-sm-12 col-xl-6">
                <div className="bg-glass shadow text-center rounded p-4" >
                    <div className="form-floating mb-3">
                        <label htmlFor="input_magazine">Academic Year Filter</label>
                    </div>

                </div>
            </div>
            <div className="col-sm-12 col-xl-6">
                <div className="bg-glass shadow text-center rounded p-4" style={{height: '44rem'}}>
                    <div className="form-floating mb-3">
                        <label htmlFor="input_faculty">Faculty Filter</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>)
}