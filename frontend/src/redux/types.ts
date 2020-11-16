import { DiscoverActiveTags } from "../discover/redux/discover-active-tags";
import { DiscoverTagsState } from "../discover/redux/discover-tags";
import { AddListFormState } from "../lists/lists-form/add-list-form";
import { AddListItemFormState } from "../lists/list-items-form/add-list-item-form";
import { EditListFormState } from "../lists/lists-form/edit-list-form";
import { PageHistoryState } from "../home/page-history/page-history";
import { PersonPageUiState } from "../person/redux/person-page-ui";
import { SearchState } from "../search/redux/search";
import { SnackbarState } from "../snackbar/redux/snackbar";
import { VideoState } from "../video/redux/video";
import { ReviewFormState } from "../reviews/form/review-form";
import { moviePageUi } from "../movie/redux/movie-page-ui";
import { DeleteReviewFormState } from "../reviews/form/delete-review-form";

export type AppState = {
  deleteReviewForm: DeleteReviewFormState;
  reviewForm: ReviewFormState;
  editListForm: EditListFormState;
  addListItemForm: AddListItemFormState;
  addListForm: AddListFormState;
  video: VideoState;
  pageHistory: PageHistoryState;
  snackbar: SnackbarState;
  search: SearchState;
  personPageUi: PersonPageUiState;
  moviePageUi: moviePageUi;
  discoverActiveTags: DiscoverActiveTags;
  discoverTags: DiscoverTagsState;
};
