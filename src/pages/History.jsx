import React, { useMemo } from "react";
import {
  useFetchBorrowedBooksQuery,
  useLazyFetchUserBorrowHistoryQuery,
} from "../store/slices/api/booksApi";
import _ from "lodash";
import AddRecordDialog from "../components/History/AddRecord";
import SearchBar from "../components/History/SearchBar";
import TableRow from "../components/History/TableRow";

const HistoryPage = () => {
  const { data: borrowedBooks = [], refetch } = useFetchBorrowedBooksQuery();
  const sortedBorrowedBooks = useMemo(
    () =>
      _.sortBy([...borrowedBooks], [(o) => new Date(o.borrowDate)]).reverse(),
    [borrowedBooks]
  );
  const [triggerUserBorrowHistory, { data: userBorrowHistory = [] }] =
    useLazyFetchUserBorrowHistoryQuery();

  const sortedUserBorrowHistory = useMemo(
    () =>
      _.sortBy(
        [...userBorrowHistory],
        [(o) => new Date(o.borrowDate)]
      ).reverse(),
    [userBorrowHistory]
  );

  const tableData =
    userBorrowHistory.length > 0
      ? sortedUserBorrowHistory
      : sortedBorrowedBooks;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Borrow History</h1>
      <div className="mb-4 flex items-center gap-4">
        <AddRecordDialog refetch={refetch} />
        <SearchBar triggerUserBorrowHistory={triggerUserBorrowHistory} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-4 text-left">Visitor</th>
              <th className="p-4 text-left">Book</th>
              <th className="p-4 text-left">Librarian</th>
              <th className="p-4 text-left">Borrow Date</th>
              <th className="p-4 text-left">Return Date</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((record) => (
              <TableRow refetch={refetch} record={record} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
