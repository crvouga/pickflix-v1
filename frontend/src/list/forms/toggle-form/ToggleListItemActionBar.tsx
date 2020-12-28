import React from "react";
import useModal from "../../../app/modals/useModal";
import { useSnackbar } from "../../../app/snackbar/redux/snackbar";
import { LinkButton } from "../../../app/snackbar/Snackbar";
import { useListener } from "../../../common/utility";
import { MediaId } from "../../../media/tmdb/types";
import WithAuthentication from "../../../user/auth/WithAuthentication";
import { AutoListKeys, toAutoListName } from "../../query";
import { AutoListToggleButton, ToggleFormModalButton } from "./buttons";
import { useToggleFormState } from "./toggle-list-item-form";
import { eventEmitterToggleForm } from "./toggle-list-item-form-saga";
import {
  ToggleListItemFormModal,
  ToggleListItemFormProps,
} from "./ToggleListItemForm";
import { WithToggleListItemFormProps } from "./WithToggleListItemFormProps";

export const AUTO_LIST_KEY_ORDER = [
  AutoListKeys.Liked,
  AutoListKeys.WatchNext,
  AutoListKeys.Favorite,
];

export const ToggleListItemActionBar = (props: ToggleListItemFormProps) => {
  const { mediaId, autoLists } = props;
  const toggleListItemFormModal = useModal("ToggleListItemForm");
  const { markedListIds, toggle } = useToggleFormState();

  const snackbar = useSnackbar();

  useListener(eventEmitterToggleForm, "added", ({ listId }) => {
    const autoList = autoLists.find(
      (autoList) => autoList.autoList.id === listId
    );
    if (autoList) {
      snackbar.display({
        message: `Added to ${toAutoListName(autoList.autoList.key)}`,
        action: <LinkButton path={`/auto-list/${autoList.autoList.id}`} />,
      });
    }
  });

  useListener(eventEmitterToggleForm, "removed", ({ listId }) => {
    const autoList = autoLists.find(
      (autoList) => autoList.autoList.id === listId
    );
    if (autoList) {
      snackbar.display({
        message: `Removed from ${toAutoListName(autoList.autoList.key)}`,
      });
    }
  });

  return (
    <React.Fragment>
      {AUTO_LIST_KEY_ORDER.map((autoListKey) => {
        const autoList = autoLists.find(
          (autoList) => autoList.autoList.key === autoListKey
        );

        if (!autoList) {
          return null;
        }

        return (
          <AutoListToggleButton
            key={autoList.autoList.key}
            autoListKey={autoList.autoList.key}
            checked={autoList.autoList.id in markedListIds}
            onClick={() => {
              toggle({
                mediaId,
                listId: autoList.autoList.id,
              });
            }}
          />
        );
      })}

      <ToggleFormModalButton
        checked={Object.values(markedListIds).length > 0}
        onClick={() => {
          toggleListItemFormModal.open();
        }}
      />

      <ToggleListItemFormModal
        isOpen={toggleListItemFormModal.isOpen}
        close={toggleListItemFormModal.close}
        ToggleListItemFormProps={props}
      />
    </React.Fragment>
  );
};

export const ToggleListItemActionBarDisabled = () => {
  return (
    <React.Fragment>
      {AUTO_LIST_KEY_ORDER.map((autoListKey) => (
        <AutoListToggleButton
          disabled
          key={autoListKey}
          autoListKey={autoListKey}
        />
      ))}
      <ToggleFormModalButton disabled />
    </React.Fragment>
  );
};

export const ToggleListItemActionBarUnauthenicated = () => {
  const { open } = useModal("SignInCallToAction");
  return (
    <React.Fragment>
      {AUTO_LIST_KEY_ORDER.map((autoListKey) => (
        <AutoListToggleButton
          key={autoListKey}
          autoListKey={autoListKey}
          onClick={() => open()}
        />
      ))}
      <ToggleFormModalButton onClick={() => open()} />
    </React.Fragment>
  );
};

export const ToggleListItemActionBarContainer = ({
  mediaId,
}: {
  mediaId: MediaId;
}) => {
  return (
    <WithAuthentication
      renderAuthenticated={(currentUser) => (
        <WithToggleListItemFormProps
          mediaId={mediaId}
          GetListsParams={{
            userId: currentUser.user.id,
          }}
          renderDefault={() => <ToggleListItemActionBarDisabled />}
          renderSuccess={(props) => <ToggleListItemActionBar {...props} />}
        />
      )}
      renderUnathenticated={() => <ToggleListItemActionBarUnauthenicated />}
      renderDefault={() => <ToggleListItemActionBarDisabled />}
    />
  );
};
