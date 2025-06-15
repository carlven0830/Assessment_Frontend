import type { TableColumn } from "../../models/configs/tableColumn";
import "./table.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function Table<T extends object>({
  columns,
  data,
  onDetail,
  onEdit,
  onDelete,
}: TableColumn<T>) {
  return (
    <div className="tableContainer">
      <table className="responsiveTable">
        <thead>
          <tr>
            <th>No</th>
            {columns.map((col) => (
              <th key={String(col.label)}>{col.header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {columns.map((col) => (
                <td key={String(col.label)}>{String(row[col.label])}</td>
              ))}
              <td className="actionWrapper">
                <button onClick={() => onDetail(row)}>
                  <MdOutlineRemoveRedEye className="actionIcon view"></MdOutlineRemoveRedEye>
                </button>
                <button onClick={() => onEdit(row)}>
                  <MdModeEdit className="actionIcon edit"></MdModeEdit>
                </button>
                <button onClick={() => onDelete(row)}>
                  <MdDelete className="actionIcon delete"></MdDelete>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
