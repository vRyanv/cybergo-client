import {useParams} from "react-router-dom";
import DriverItem from './partials/DriverItem'
import {Scrollbars} from "react-custom-scrollbars-2";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function DriverRegisterPage() {
    const {id} = useParams()
    return (
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-12" style={{position: 'sticky', zIndex: '1000', top: '64px'}}>
                    <div className="container-fluid pb-4 pt-4 px-4 bg-glass rounded"
                         style={{position: 'sticky', zIndex: '1000', top: '64px'}}>
                        <div className="row g-4">
                            <div className="col-sm-9 col-xl-9">
                                <h5>Driver registration</h5>
                            </div>
                            <div className="col-sm-3 col-xl-3">
                                <FormControl

                                    fullWidth>
                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                    <Select
                                        sx={{width: '100%', border:'green'}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={10}
                                        label="Age"
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-glass rounded p-4 mt-3 body-page">
                        <Scrollbars style={{minWidth: '10rem', height: '100%'}} autoHide>
                            <ul className="team">
                                {
                                    Array.from([1, 2, 3, 5, 1, 1, 1, 1, 1, 1, 1, 1]).map((a, index) => <DriverItem
                                        key={index}/>)
                                }
                            </ul>
                        </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    )
}