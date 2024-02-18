import { createSlice } from "@reduxjs/toolkit";
import stringSimilarity from "string-similarity";

const initialState = {
  firstFile: [],
  secondFile: [],
  firstFileName: "",
  secondFileName: "",
  firstFileKeys: [],
  secondFileKeys: [],
  excelFile: [],
};

const isSimilar = (value1, value2) => {
  const strValue1 = String(value1);
  const strValue2 = String(value2);

  if (
    (typeof value1 === "string" || typeof value1 === "number") &&
    (typeof value2 === "string" || typeof value2 === "number")
  ) {
    const similarity = stringSimilarity.compareTwoStrings(strValue1, strValue2);
    return similarity > 0.7;
  }

  return false;
};

export const excelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    addFirstFile: (state, { payload }) => {
      state.firstFile = payload;
      state.firstFileKeys = Object.keys(payload[0] || {});
    },
    addSecondFile: (state, { payload }) => {
      state.secondFile = payload;
      state.secondFileKeys = Object.keys(payload[0] || {});
    },
    addFirstFileName: (state, { payload }) => {
      state.firstFileName = payload;
    },
    addSecondFileName: (state, { payload }) => {
      state.secondFileName = payload;
    },

    addExcelFile: (state, { payload }) => {
      if (payload && payload.firstFileSelect && payload.secondFileSelect) {
        const { firstFileSelect, secondFileSelect } = payload;
        state.excelFile = [];

        for (
          let i = 0;
          i < state.firstFile.length && i < state.secondFile.length;
          i++
        ) {
          let firstValue = state.firstFile[i][firstFileSelect];
          let secondValue = state.secondFile[i][secondFileSelect];

          if (isSimilar(firstValue, secondValue)) {
            let obj = {
              [firstFileSelect]: firstValue,
              [secondFileSelect]: secondValue,
            };
            state.excelFile.push(obj);
          }
        }

        console.log(state.excelFile);
      }
    },

    editFirstFile: (state, { payload }) => {
      const { newColumnName, addition, columnName, sourceName, columnType } =
        payload;

      for (let j = 0; j < state.excelFile.length; j++) {
        if (sourceName === state.firstFileName) {
          for (let i = 0; i < state.firstFile.length; i++) {
            let modifiedValue;

            if (columnType === "text") {
              modifiedValue = state.firstFile[i][columnName]
                ? state.firstFile[i][columnName] + " " + addition
                : addition;
            } else if (columnType === "Formel") {
              const currentValue =
                parseFloat(state.firstFile[i][columnName]) || 0;
              const additionalValue = parseFloat(addition) || 0;
              modifiedValue = currentValue + additionalValue;
            }

            let modifiedObject = { [newColumnName]: modifiedValue };

            state.excelFile[j] = { ...state.excelFile[j], ...modifiedObject };
          }
        } else if (sourceName === state.secondFileName) {
          for (let i = 0; i < state.secondFile.length; i++) {
            let modifiedValue;

            if (columnType === "text") {
              modifiedValue = state.secondFile[i][columnName]
                ? state.secondFile[i][columnName] + " " + addition
                : addition;
            } else if (columnType === "Formel") {
              const currentValue =
                parseFloat(state.secondFile[i][columnName]) || 0;
              const additionalValue = parseFloat(addition) || 0;
              modifiedValue = currentValue + additionalValue;
            }

            let modifiedObject = { [newColumnName]: modifiedValue };
            state.excelFile[j] = { ...state.excelFile[j], ...modifiedObject };
          }
        }
      }
    },
  },
});

export const {
  addFirstFile,
  addSecondFile,
  addExcelFile,
  addFirstFileName,
  addSecondFileName,
  editFirstFile,
} = excelSlice.actions;

export default excelSlice.reducer;
