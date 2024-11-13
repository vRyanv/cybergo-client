import { useParams } from "react-router-dom";
import { KeyboardReturnIcon } from "~/assets/icon";
import { useEffect, useState } from "react";
import { UseHistoryBack, UseLocalStorage } from "~/hooks";
import { IconButton } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

import {
  DriverInformation,
  DriverInformationSkeleton,
  DrivingLicense,
  DrivingLicenseSkeleton,
  RefuseDialog,
  RegistrationCertificate,
  RegistrationCertificateSkeleton,
  Vehicle,
  VehicleSkeleton,
} from "./partials";

import { FieldName, Http, Int, Message, ResourcePath } from "~/constants";

export default function DriverRegisterPage() {
  const [is_loading, setIsLoading] = useState(true);
  //refuse dialog
  const [is_open_refuse_dialog, setIsOpenRefuseDialog] = useState(false);
  const openRefuseDialogClicked = () => {
    setIsOpenRefuseDialog(true);
  };
  const closeRefuseDialog = () => {
    setIsOpenRefuseDialog(false);
  };

  const { vehicle_id } = useParams();
  const [registration_detail, setRegistrationDetail] = useState();
  useEffect(() => {
    setIsLoading(true);
    const [getLocal] = UseLocalStorage();
    const token = getLocal(FieldName.USER_TOKEN);
    axios
      .get(`${Http.HOST}/api/admin/driver-registration/detail/${vehicle_id}`, {
        headers: { authorization: token },
      })
      .then((response) => {
        setTimeout(() => {
          setRegistrationDetail(response.data.driver_registration_detail);
          console.log(response.data);
          setIsLoading(false);
        }, Int.DELAY_TIMEOUT_API);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        enqueueSnackbar(Message.SOMETHING_WENT_WRONG, { variant: "error" });
      });
  }, [vehicle_id]);

  return (
    <div className="container-fluid pt-4 px-4 mb-3">
      <div className="row g-4">
        <div className="col-sm-12 col-xl-12 header-body">
          <div className="d-flex flex-row flex-wrap p-1 shadow rounded justify-content-between align-items-center bg-glass">
            <IconButton
              onClick={UseHistoryBack}
              color={"secondary"}
              size="large"
            >
              <KeyboardReturnIcon />
            </IconButton>
            <h5>Vehicle Registration Detail</h5>
            <div>
              <RefuseDialog
                is_open={is_open_refuse_dialog}
                CloseDialog={closeRefuseDialog}
                vehicle_id={vehicle_id}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xl-12">
          <div className="container-fluid px-4 container-fluid-body">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-6 ">
                <div className="container-fluid px-4 container-fluid-body">
                  <div className="row g-4">
                    <div className="col-sm-12 col-xl-12">
                      {is_loading ? (
                        <DriverInformationSkeleton />
                      ) : (
                        <DriverInformation
                          vehicle_id={vehicle_id}
                          onBtnOpenRefuseDialogClicked={openRefuseDialogClicked}
                          full_name={registration_detail.driver.full_name}
                          gender={registration_detail.driver.gender}
                          id_number={registration_detail.driver.id_number}
                          phone={`${
                            registration_detail.driver.country.prefix +
                            registration_detail.driver.phone_number
                          }`}
                          address={registration_detail.driver.address}
                          avatar={`${
                            Http.RESOURCE_HOST +
                            registration_detail.driver.avatar
                          }`}
                          front_id_card={`${
                            Http.RESOURCE_HOST +
                            registration_detail.driver.front_id_card
                          }`}
                          back_id_card={`${
                            Http.RESOURCE_HOST +
                            registration_detail.driver.back_id_card
                          }`}
                          vehicle_status={registration_detail.status}
                        />
                      )}
                    </div>
                    <div className="col-sm-12 col-xl-12">
                      {is_loading ? (
                        <RegistrationCertificateSkeleton />
                      ) : (
                        <RegistrationCertificate
                          front_certificate={`${
                            Http.RESOURCE_HOST +
                            registration_detail.front_vehicle_registration_certificate
                          }`}
                          back_certificate={`${
                            Http.RESOURCE_HOST +
                            registration_detail.back_vehicle_registration_certificate
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-xl-6">
                <div className="container-fluid px-4 container-fluid-body">
                  <div className="row g-4">
                    <div className="col-sm-12 col-xl-12">
                      {is_loading ? (
                        <DrivingLicenseSkeleton />
                      ) : (
                        <DrivingLicense
                          front_driving_license={`${
                            Http.RESOURCE_HOST +
                            registration_detail.front_driving_license
                          }`}
                          back_driving_license={`${
                            Http.RESOURCE_HOST +
                            registration_detail.back_driving_license
                          }`}
                        />
                      )}
                    </div>
                    <div className="col-sm-12 col-xl-12">
                      {is_loading ? (
                        <VehicleSkeleton />
                      ) : (
                        <Vehicle
                          license_plates={registration_detail.license_plates}
                          car_front={`${
                            Http.RESOURCE_HOST +
                            registration_detail.front_vehicle
                          }`}
                          car_back={`${
                            Http.RESOURCE_HOST +
                            registration_detail.back_vehicle
                          }`}
                          car_left={`${
                            Http.RESOURCE_HOST +
                            registration_detail.left_vehicle
                          }`}
                          car_right={`${
                            Http.RESOURCE_HOST +
                            registration_detail.right_vehicle
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
