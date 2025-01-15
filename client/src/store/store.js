import { configureStore } from "@reduxjs/toolkit";
import CodeEditorReducer from "./states/CodeEditor/CodeEditorSlice.js";

const store = configureStore({
	reducer: {
		codeEditor: CodeEditorReducer,
	},
});

export default store;
