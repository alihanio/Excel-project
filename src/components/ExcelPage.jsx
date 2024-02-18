import FirstAddFile from "./addFile/FirstAddFile";
import SecondAddFile from "./addFile/SecondAddFile";
import { useDispatch, useSelector } from "react-redux";
import { addExcelFile } from "../store/slice/excelSlice";
import * as XLSX from "xlsx";
import ColumnEdit from "./ColumnEdit";
import { useEffect, useState } from "react";

const ExcelPage = () => {
  const dispatch = useDispatch();
  const { excelFile, firstFileKeys, secondFileKeys } = useSelector(
    (state) => state.excel
  );
  const [firstFileSelect, setFirstFileSelect] = useState("");
  const [secondFileSelect, setSecondFileSelect] = useState("");

  useEffect(() => {
    if (firstFileKeys.length > 0 && !firstFileSelect) {
      setFirstFileSelect(firstFileKeys[0]);
    }
    if (secondFileKeys.length > 0 && !secondFileSelect) {
      setSecondFileSelect(secondFileKeys[0]);
    }
  }, [firstFileKeys, firstFileSelect, secondFileKeys, secondFileSelect]);

  useEffect(() => {
    dispatch(addExcelFile({ firstFileSelect, secondFileSelect }));
  }, [dispatch, firstFileSelect, secondFileSelect]);

  const exportFile = () => {
    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelFile);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const fileName = `exported_${new Date().toISOString()}.xlsx`;
      XLSX.writeFile(wb, fileName);
    } catch (error) {
      console.error("Error exporting Excel file:", error);
    }
  };

  const ChangeFirsFileKey = (e) => setFirstFileSelect(e.target.value);
  const ChangeSecondFileKey = (e) => setSecondFileSelect(e.target.value);

  return (
    <div className="pt-4 pl-4">
      <div className="flex flex-row  gap-12 flex-wrap">
        <div className="flex flex-col items-end ">
          <FirstAddFile />
          <select
            className="w-72 h-12 mt-4 border-solid border-2 relative border-grey-800 flex items-center text-black font-medium pl-2"
            value={firstFileSelect}
            onChange={ChangeFirsFileKey}
          >
            {firstFileKeys.length > 0 ? (
              firstFileKeys?.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))
            ) : (
              <option>Column Name</option>
            )}
          </select>
        </div>
        <div className="flex flex-col items-end">
          <SecondAddFile />
          <select
            className=" flex w-72 h-12  mt-4 border-solid border-2 relative border-grey-800 items-center text-black font-medium pl-2"
            value={secondFileSelect}
            onChange={ChangeSecondFileKey}
          >
            {secondFileKeys.length > 0 ? (
              secondFileKeys?.map((item) => (
                <option className="py-2 px-4" value={item} key={item}>
                  {item}
                </option>
              ))
            ) : (
              <option>Column Name</option>
            )}
          </select>
        </div>
      </div>

      <ColumnEdit />
      <button
        className={`w-[10rem] p-3 bg-indigo-700 rounded text-white absolute right-8 mt-6 ${
          excelFile.length > 0 ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={excelFile.length > 0 ? false : true}
        onClick={exportFile}
      >
        save as excel
      </button>
    </div>
  );
};

export default ExcelPage;
