import type { TableTitle } from "./tableTitle";

export interface TableColumn<T> {
  columns: TableTitle<T>[];
  data: T[];
  onDetail: (row: T) => void;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}
