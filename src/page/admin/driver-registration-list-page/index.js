import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import {
  DriverRegistrationStatus,
  FieldName,
  Http,
  Int,
  Message,
  ResourcePath,
} from "~/constants";
import DriverItem from "./partials/driver-item";
import DriverRegistrationSkeleton from "./partials/DriverRegistrationSkeleton";

import car from "~/assets/images/ic_car.svg";
import moto from "~/assets/images/ic_moto.svg";
import truck from "~/assets/images/ic_truck.svg";

import { RefreshTwoToneIcon, SearchIcon } from "~/assets/icon";
import { UseLocalStorage } from "~/hooks";
import Button from "@mui/material/Button";
import { enqueueSnackbar } from "notistack";

export default function DriverRegisterPage() {
  const [is_loading, setIsLoading] = useState(true);

  const vehicle_types = {
    Motorcycle: moto,
    Car: car,
    Truck: truck,
  };
  const [registrations, setRegistrations] = useState([]);
  const [registrations_display, setRegistrationsDisplay] = useState([]);
  useEffect(() => {
    GetRegistrationList(DriverRegistrationStatus.ALL);
  }, []);

  const GetRegistrationList = (status) => {
    setIsLoading(true);
    const [getLocal] = UseLocalStorage();
    const token = getLocal(FieldName.USER_TOKEN);
    axios
      .get(`${Http.HOST}/api/admin/driver-registration/${status}`, {
        headers: { authorization: token },
      })
      .then((response) => {
        setTimeout(() => {
          setRegistrations(response.data.driver_registration_list);
          setRegistrationsDisplay(response.data.driver_registration_list);
          setIsLoading(false);
        }, Int.DELAY_TIMEOUT_API);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        enqueueSnackbar(Message.SOMETHING_WENT_WRONG, { variant: "error" });
      });
  };

  const [status_selection, setStatusSelection] = useState(
    DriverRegistrationStatus.ALL
  );
  const onChangeRegistrationFilter = (e) => {
    const status = e.target.value;
    setStatusSelection(status);
    GetRegistrationList(status);
  };

  const onRefreshClicked = () => {
    setRegistrationsDisplay(registrations);
  };
  const [search, setSearch] = useState("");

  const onSearchRegistration = () => {
    const find_name_list = registrations.filter(
      (regist) =>
        regist.driver.full_name.toLowerCase().includes(search) ||
        regist.driver.phone_number.includes(search) ||
        regist.driver.id_number.includes(search) ||
        regist.license_plates.includes(search)
    );
    setRegistrationsDisplay(find_name_list);
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12 col-xl-12 header-body">
          <div
            className="container-fluid pb-4 pt-4 px-4 bg-glass rounded"
            style={{ position: "sticky", zIndex: "1000", top: "82px" }}
          >
            <Stack
              direction={{ xs: "column", sm: "column", md: "row" }}
              justifyContent="space-between"
              spacing={3}
            >
              <h5>Vehicle Registration</h5>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                <Button
                  startIcon={<RefreshTwoToneIcon />}
                  fullWidth
                  variant="outlined"
                  onClick={onRefreshClicked}
                  color={"info"}
                >
                  Refresh
                </Button>
                <FormControl
                  fullWidth
                  style={{ minWidth: "15rem" }}
                  size="small"
                  variant="outlined"
                >
                  <InputLabel htmlFor="input_search">Search</InputLabel>
                  <OutlinedInput
                    id="input_search"
                    type={"text"}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={onSearchRegistration}
                          onMouseDown={() => {}}
                          edge="end"
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Search"
                  />
                </FormControl>
                <FormControl
                  size="small"
                  fullWidth
                  style={{ minWidth: "15rem" }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Registration Status
                  </InputLabel>
                  <Select
                    sx={{ width: "100%", border: "green" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status_selection}
                    onChange={(e) => onChangeRegistrationFilter(e)}
                    label="Registration Status"
                  >
                    {Object.keys(DriverRegistrationStatus).map((key, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={DriverRegistrationStatus[key]}
                        >
                          {DriverRegistrationStatus[key]}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </div>
          <div
            className={`container-fluid bg-glass rounded p-4 mt-3`}
            style={{ minHeight: "75vh" }}
          >
            {is_loading ? (
              <DriverRegistrationSkeleton />
            ) : (
              <ul className="team">
                {registrations_display.map((registration, index) => (
                  <DriverItem
                    avatar={`${
                      Http.RESOURCE_HOST + registration.driver.avatar
                    }`}
                    vehicle_type={vehicle_types[registration.vehicle_type]}
                    vehicle_id={registration._id}
                    status={registration.status}
                    full_name={registration.driver.full_name}
                    id_number={registration.driver.id_number}
                    phone={registration.driver.phone_number}
                    license_plates={registration.license_plates}
                    key={index}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
