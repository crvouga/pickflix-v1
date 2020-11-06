import { DiscoverActiveTags } from "../discover/redux/discover-active-tags";
import { DiscoverTagsState } from "../discover/redux/discover-tags";
import { AddListFormState } from "../lists/redux/add-list-form";
import { AddListItemFormState } from "../lists/redux/add-list-item-form";
import { EditListFormState } from "../lists/redux/edit-list-form";
import { PageHistoryState } from "../home/page-history/page-history";
import { PersonPageUiState } from "../person/redux/person-page-ui";
import { SearchState } from "../search/redux/search";
import { SnackbarState } from "../snackbar/redux/snackbar";
import { VideoState } from "../video/redux/video";
import { ReviewFormState } from "../reviews/redux/review-form";

export type AppState = {
  reviewForm: ReviewFormState;
  editListForm: EditListFormState;
  addListItemForm: AddListItemFormState;
  addListForm: AddListFormState;
  video: VideoState;
  pageHistory: PageHistoryState;
  snackbar: SnackbarState;
  search: SearchState;
  personPageUi: PersonPageUiState;
  discoverActiveTags: DiscoverActiveTags;
  discoverTags: DiscoverTagsState;
};
