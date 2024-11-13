import { Stack } from "@mui/material";
import { UseViewLargeImg } from "~/hooks";
import React from "react";
import { Http, ResourcePath } from "~/constants";

export default function IdentityCard({ front_id_card, back_id_card }) {
  front_id_card = Http.RESOURCE_HOST + front_id_card;
  back_id_card = Http.RESOURCE_HOST + back_id_card;
  return (
    <div className="shadow rounded h-100 p-4 bg-glass">
      <h6 className="mb-4">Identity Card</h6>
      <hr />
      <Stack
        justifyContent="flex-start"
        direction={"row"}
        spacing={3}
        className="mt-4"
      >
        <div>
          <p className={"title-field-driver-registration rounded"}>
            Front of ID card
          </p>
          <img
            onClick={() => UseViewLargeImg(front_id_card)}
            src={front_id_card}
            alt="Not update"
            data-bs-toggle="modal"
            data-bs-target="#image_larger_modal"
            width={"100%"}
            className="rounded mt-2 can-zoom"
          />
        </div>
        <div>
          <p className={"title-field-driver-registration rounded"}>
            Back of ID card
          </p>
          <img
            onClick={() => UseViewLargeImg(back_id_card)}
            src={back_id_card}
            alt="Not update"
            data-bs-toggle="modal"
            data-bs-target="#image_larger_modal"
            width={"100%"}
            className="rounded mt-2 can-zoom"
          />
        </div>
      </Stack>
    </div>
  );
}
