import React from "react";
import Recipient from "../Recipient/Recipient";

function RecipientsList({ recipients, coords }) {
  return (
    <>
      {recipients.map((recipient) => (
        <Recipient key={recipient.id} recipient={recipient} coords={coords} />
      ))}
    </>
  );
}

export default RecipientsList;
