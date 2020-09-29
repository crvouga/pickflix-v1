import { createAction } from "@reduxjs/toolkit";
import { Entity } from "./types";
export const viewed = createAction<Entity>("[recently-viewed] VIEWED");
export const clear = createAction("[recently-viewed] CLEAR");
