import React, { useEffect } from "react";
import useModal from "../../../app/modals/useModal";
import { MediaId } from "../../../media/tmdb/types";
import WithAuthentication from "../../../user/auth/WithAuthentication";
import { AutoListKeys } from "../../query";
import { AutoListToggleButton, ToggleFormModalButton } from "./buttons";
import {
  useToggleFormState,
  toInitialMarkedListIds,
} from "./toggle-list-item-form";
import {
  ToggleListItemFormProps,
  ToggleListItemFormModal,
} from "./ToggleListItemForm";
import { WithToggleListItemFormProps } from "./WithToggleListItemFormProps";

export const AUTO_LIST_KEY_ORDER = [AutoListKeys.Liked, AutoListKeys.WatchNext];

export const ToggleListItemActionBar = (props: ToggleListItemFormProps) => {
  const { mediaId, lists, autoLists } = props;
  const toggleListItemFormModal = useModal("ToggleListItemForm");
  const { markedListIds, setMarkedListIds, toggle } = useToggleFormState();

  useEffect(() => {
    setMarkedListIds(
      toInitialMarkedListIds({
        mediaId,
        lists,
        autoLists,
      })
    );
  }, [lists.length]);

  return (
    <React.Fragment>
      {AUTO_LIST_KEY_ORDER.map((autoListKey) => {
        const autoList = autoLists.find(
          (autoList) => autoList.list.key === autoListKey
        );

        if (!autoList) {
          return null;
        }

        return (
          <AutoListToggleButton
            key={autoList.list.key}
            autoListKey={autoList.list.key}
            checked={autoList.list.id in markedListIds}
            onClick={() => {
              toggle({
                mediaId,
                listId: autoList.list.id,
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

export const ToggleListItemActionBarDummy = () => {
  return (
    <React.Fragment>
      {AUTO_LIST_KEY_ORDER.map((autoListKey) => (
        <AutoListToggleButton key={autoListKey} autoListKey={autoListKey} />
      ))}
      <ToggleFormModalButton />
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
          renderLoading={() => <ToggleListItemActionBarDummy />}
          renderSuccess={(props) => <ToggleListItemActionBar {...props} />}
        />
      )}
      renderUnathenticated={() => <ToggleListItemActionBarUnauthenicated />}
      renderDefault={() => <ToggleListItemActionBarDummy />}
    />
  );
};
