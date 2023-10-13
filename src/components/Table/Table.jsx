import { useState } from "react";
import TableData from "../TableData/TableData";
import styles from "./table.module.css";
const Table = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const decrementPage = () => {
    if (pageIndex > 0) setPageIndex((prev) => prev - 1);
  };
  const incrementPage = () => {
    if (pageIndex < 2) setPageIndex((prev) => prev + 1);
  };
  return (
    <>
      <div className={styles.container}>
        <table>
          <thead>
            <tr className={styles.row}>
              <th>Date</th>
              <th>Open</th>
              <th>Close</th>
            </tr>
          </thead>
          <TableData pageNo={pageIndex} />
        </table>
        <div className={styles.btnContainer}>
          <button className={styles.button} onClick={decrementPage}>Previous</button>
          <button className={styles.button} onClick={incrementPage}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Table;
