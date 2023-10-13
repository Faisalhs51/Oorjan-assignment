import { useState, useEffect, memo } from "react";
import styles from "./tabledata.module.css";
import axios from "axios";
const TableData = ({ pageNo }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios(
      "https://f68370a9-1a80-4b78-b83c-8cb61539ecd6.mock.pstmn.io/api/v1/get_market_data/"
    );
    const content = await response.data.data;
    let contentStyled = content.map((curr, index) => {
      let date = new Date(curr.date);
      date = date.toLocaleDateString();
      curr.date = date;
      let prevClose = null;
      let currOpen = curr.open;
      let currClose = curr.close;
      if (index > 0) {
        prevClose = content[index - 1].close;
      }
      let openStyle = "";
      let closeStyle = "";
      if (prevClose !== null) {
        if (currOpen > prevClose) {
          openStyle = styles.green;
        } else if (currOpen < prevClose) {
          openStyle = styles.red;
        }
      }
      if (currClose > currOpen) {
        closeStyle = styles.green;
      } else if (currClose < currOpen) {
        closeStyle = styles.red;
      }
      return { ...curr, openStyle, closeStyle };
    });

    setData(contentStyled);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <tbody className={styles.loader}></tbody>
      ) : (
        <tbody>
          {data.slice(pageNo * 7, pageNo * 7 + 7).map((curr, index) => (
            <tr className={styles.row} key={index}>
              <td>{curr.date}</td>
              <td className={curr.openStyle}>{curr.open}</td>
              <td className={curr.closeStyle}>{curr.close}</td>
            </tr>
          ))}
        </tbody>
      )}
    </>
  );
};

export default memo(TableData);
