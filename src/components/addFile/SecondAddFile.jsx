import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { addSecondFile, addSecondFileName } from "../../store/slice/excelSlice";

const SecondAddFile = () => {
  const dispatch = useDispatch();
  const { secondFileName } = useSelector((state) => state.excel);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((data) => {
      dispatch(addSecondFile(data));
    });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    dispatch(addSecondFileName(e.target.files[0].name));

    readExcel(file);
  };

  return (
    <div className="flex h-12 items-center">
      <label htmlFor="secondFileName" className="mr-[5rem]">
        {secondFileName ? secondFileName : "File Name"}
      </label>
      <div className="w-72 h-12 border-solid border-2 relative border-grey-800 flex items-center p-4 text-black font-medium">
        File 2
        <input
          type="file"
          id="secondFileName"
          onChange={handleChange}
          className="opacity-0 cursor-pointer absolute inset-0 w-60 h-12"
        />
      </div>
    </div>
  );
};

export default SecondAddFile;
