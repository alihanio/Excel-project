import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editFirstFile } from "../store/slice/excelSlice";

const ColumnEdit = () => {
  const dispatch = useDispatch();
  const {
    excelFile,
    firstFileName,
    secondFileName,
    firstFileKeys,
    secondFileKeys,
  } = useSelector((state) => state.excel);
  const [inputs, setInputs] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const addList = () => {
    if (
      inputs.every(
        (input) =>
          input.columnName &&
          input.columnType &&
          input.addition &&
          input.newColumnName &&
          input.sourceName
      )
    ) {
      inputs.forEach((input) => {
        dispatch(
          editFirstFile({
            columnName: input.columnName,
            columnType: input.columnType,
            addition: input.addition,
            newColumnName: input.newColumnName,
            sourceName: input.sourceName,
          })
        );
      });
    }
  };

  const handleButtonClick = () => {
    setInputs([
      ...inputs,
      {
        sourceName: "",
        columnName: "",
        columnType: "",
        addition: "",
        newColumnName: "",
      },
    ]);
    setVisibility(true);
  };

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  return (
    <div className="w-full relative ">
      <button
        className={`flex items-center rounded absolute top-[-2.5rem] right-8 justify-center w-10 h-10 border-solid border-2 ${
          excelFile.length > 0
            ? "border-indigo-600 text-indigo"
            : "border-gray-400 text-gray-400 cursor-not-allowed"
        } size-5`}
        disabled={excelFile.length > 0 ? false : true}
        onClick={handleButtonClick}
      >
        +
      </button>

      <table className="w-full mt-[3.5rem] ">
        {visibility && (
          <thead>
            <tr className="text-left">
              <th></th>
              <th>Source</th>
              <th>Column name from source</th>
              <th>Type</th>
              <th>Additional text or formula</th>
              <th>Target column name</th>
              <th></th>
            </tr>
          </thead>
        )}

        <tbody>
          {inputs.map((input, index) => (
            <tr key={index}>
              <td className="pt-[1.3rem] pr-2">{index + 1}.</td>
              <td>
                <select
                  className="w-60 h-12 mt-4 border-solid border-2 relative border-grey-800 flex items-center text-black font-medium pl-2"
                  value={input.sourceName}
                  onChange={(e) =>
                    handleChange(index, "sourceName", e.target.value)
                  }
                >
                  <option value="">Choose File Name:</option>
                  <option value={firstFileName}>{firstFileName}</option>
                  <option value={secondFileName}>{secondFileName}</option>
                </select>
              </td>
              <td>
                <select
                  className="w-72 h-12 mt-4 border-solid border-2 relative border-grey-800 flex items-center text-black font-medium pl-2"
                  value={input.columnName}
                  onChange={(e) =>
                    handleChange(index, "columnName", e.target.value)
                  }
                >
                  <option value="">Choose Column Name:</option>
                  {input.sourceName === firstFileName
                    ? firstFileKeys.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))
                    : secondFileKeys.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                </select>
              </td>
              <td>
                <select
                  className="w-60 h-12 mt-4 border-solid border-2 relative border-grey-800 flex items-center text-black font-medium pl-2"
                  value={input.columnType}
                  onChange={(e) =>
                    handleChange(index, "columnType", e.target.value)
                  }
                >
                  <option value="">Choose Type:</option>
                  <option value="Text">Text</option>
                  <option value="Formel">Formel</option>
                </select>
              </td>
              <td>
                <input
                  className="w-50 h-12 mt-4 border-solid border-2 relative border-grey-800 flex items-center text-black font-medium pl-2"
                  type={input.columnType === "Formel" ? "number" : "text"}
                  value={input.addition}
                  placeholder="Addition"
                  onChange={(e) =>
                    handleChange(index, "addition", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  className="w-72 h-12 mt-4 border-solid border-2 relative border-grey-800 flex items-center text-black font-medium pl-2"
                  value={input.newColumnName}
                  placeholder="new Column Name"
                  onChange={(e) =>
                    handleChange(index, "newColumnName", e.target.value)
                  }
                  type="text"
                />
              </td>
              <td>
                <button
                  onClick={addList}
                  className="flex items-center rounded relative right-6 top-2 justify-center w-10 h-10 border-solid border-2 border-indigo-600 text-indigo"
                >
                  add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColumnEdit;
