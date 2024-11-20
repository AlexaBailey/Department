import { useState } from "react";
import { useLazyFetchLazyVisitorsQuery } from "../../store/slices/api/visitorsApi";

const SearchBar = ({ triggerUserBorrowHistory }) => {
  const [userBorrowHistoryQuery, setUserBorrowHistoryQuery] = useState("");

  const handleVisitorSearch = (query) => {
    setUserBorrowHistoryQuery(query);
    if (query) {
      triggerFetchVisitors(query);
    }
  };
  const fetchUserBorrowHistory = () => {
    if (userBorrowHistoryQuery) {
      triggerUserBorrowHistory(userBorrowHistoryQuery);
    }
  };
  const [triggerFetchVisitors, { data: visitorOptions = [] }] =
    useLazyFetchLazyVisitorsQuery();
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search User Borrow History..."
        value={userBorrowHistoryQuery}
        onChange={(e) => handleVisitorSearch(e.target.value)}
        list="visitor-options"
        className="border rounded px-4 py-2"
      />
      <datalist id="visitor-options">
        {visitorOptions.map((visitor) => (
          <option key={visitor.id} value={visitor.name} />
        ))}
      </datalist>
      <button
        onClick={fetchUserBorrowHistory}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};
export default SearchBar;
