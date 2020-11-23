import React from "react";
import useModal from "../../../app/modals/useModal";
import NonFullscreenResponsiveDialog from "../../../common/components/NonFullscreenResponsiveDialog";
import WithAuthentication from "../../auth/WithAuthentication";
import EditUserForm from "./EditUserForm";

export default () => {
  const { isOpen, close } = useModal("EditUserForm");

  return (
    <NonFullscreenResponsiveDialog open={isOpen} onClose={close}>
      <WithAuthentication
        // renderLoading={() => (
        //   <List>
        //     <ListItem>
        //       <ListItemIcon>
        //         <CircularProgress />
        //       </ListItemIcon>
        //       <ListItemText primary="Loading" />
        //     </ListItem>
        //   </List>
        // )}
        renderAuthenticated={(currentUser) => (
          <EditUserForm currentUser={currentUser} onCancel={close} />
        )}
        // renderError={() => {
        //   close();
        //   return null;
        // }}
        // renderUnathenticated={() => {
        //   close();
        //   return null;
        // }}
      />
    </NonFullscreenResponsiveDialog>
  );
};
