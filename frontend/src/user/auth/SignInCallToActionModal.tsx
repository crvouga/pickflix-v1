import React from "react";
import { Dialog } from "@material-ui/core";
import useModal from "../../app/modals/useModal";
import SignInCallToAction from "./SignInCallToAction";
import { ZoomIn } from "../../common/components/TransitionComponents";

export default () => {
  const { isOpen, close } = useModal("SignInCallToAction");
  return (
    <Dialog TransitionComponent={ZoomIn} open={isOpen} onClose={close}>
      <SignInCallToAction />
    </Dialog>
  );
};
