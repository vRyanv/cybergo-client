import React from "react";
import { Stack } from "@mui/material";

import Button from "@mui/material/Button";

import { VisibilityTwoToneIcon } from "~/assets/icon";
import { Http, ResourcePath, VehicleImage } from "~/constants";
import { useNavigate } from "react-router-dom";

export default function VehicleList({ vehicles }) {
  const navigate = useNavigate();
  const onViewMoreClicked = (vehicle_id) => {
    navigate(`/vehicle-detail/${vehicle_id}`);
  };
  return (
    <div className="col-sm-12 col-xl-12">
      <div className="shadow rounded h-100 p-4 bg-glass">
        <h6>Vehicles</h6>
        <hr />
        <ul className={"px-5"}>
          {vehicles.map((vehicle, index) => {
            return (
              <li
                key={index}
                style={{ cursor: "default" }}
                className={`member driver-registration-status bg-green-light`}
              >
                <div className="thumb">
                  <img
                    src={String(Http.RESOURCE_HOST + vehicle.front_vehicle)}
                    alt="front vehicle"
                  />
                </div>
                <div className="description">
                  <Stack
                    style={{ marginTop: "1rem" }}
                    justifyContent="space-around"
                    direction={{ xs: "column", sm: "row" }}
                  >
                    <div className="mb-3">
                      <label className="form-label title-info-driver">
                        Name
                      </label>
                      <div>{vehicle.vehicle_name}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label title-info-driver">
                        License Plates
                      </label>
                      <div>{vehicle.license_plates}</div>
                    </div>
                    <div className="mb-3">
                      <div style={{ textAlign: "center" }}>
                        <img
                          style={{ width: "50px", height: "50px" }}
                          src={VehicleImage[vehicle.vehicle_type]}
                          alt="transport-type"
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <Button
                        onClick={() =>
                          onViewMoreClicked(vehicle._id.toString())
                        }
                        variant={"outlined"}
                        color={"info"}
                        startIcon={<VisibilityTwoToneIcon />}
                      >
                        View more
                      </Button>
                    </div>
                  </Stack>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
