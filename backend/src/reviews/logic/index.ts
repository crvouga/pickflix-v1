import { ReviewLogic } from "./build";
import { unitOfWork } from "../../common/unit-of-work";
import { mediaLogic } from "../../media/logic";

export const reviewLogic = new ReviewLogic({ unitOfWork, mediaLogic });
