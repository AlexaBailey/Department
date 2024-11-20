import { useState, useEffect } from "react";
import {
  useBorrowBookMutation,
  useLazyFetchLazyBooksQuery,
} from "../../store/slices/api/booksApi";
import { Dialog } from "@headlessui/react";
import { useLazyFetchLazyVisitorsQuery } from "../../store/slices/api/visitorsApi";
import { useSelector } from "react-redux";

const AddRecordDialog = ({ refetch }) => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const [triggerFetchBooks, { data: bookOptions = [] }] =
    useLazyFetchLazyBooksQuery();
  const [triggerFetchVisitors, { data: visitorOptions = [] }] =
    useLazyFetchLazyVisitorsQuery();

  const [newRecord, setNewRecord] = useState({
    visitorId: "",
    bookId: "",
    librarianId: user,
    borrowDate: "",
  });

  const [borrowBook] = useBorrowBookMutation();
  const [visitorQuery, setVisitorQuery] = useState("");
  const [bookQuery, setBookQuery] = useState("");
  console.log(visitorOptions);
  useEffect(() => {
    if (visitorQuery.trim()) {
      const debounceTimeout = setTimeout(() => {
        triggerFetchVisitors(visitorQuery.trim());
      }, 300);

      return () => clearTimeout(debounceTimeout);
    }
  }, [visitorQuery, triggerFetchVisitors]);

  useEffect(() => {
    if (bookQuery.trim()) {
      const debounceTimeout = setTimeout(() => {
        triggerFetchBooks(bookQuery.trim());
      }, 300);

      return () => clearTimeout(debounceTimeout);
    }
  }, [bookQuery, triggerFetchBooks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(newRecord);

      await borrowBook(newRecord).unwrap();
      setNewRecord({
        visitorId: "",
        bookId: "",
        librarianId: user,
        borrowDate: "",
      });
      setIsFormDialogOpen(false);
      refetch();
    } catch (error) {
      alert("Failed to add record.");
    }
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setIsFormDialogOpen(true)}
      >
        Add New Record
      </button>
      <Dialog
        open={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-4">
              Add Borrow Record
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">Visitor</label>
                <input
                  type="text"
                  value={visitorQuery}
                  onChange={(e) => {
                    setVisitorQuery(e.target.value);
                    setNewRecord({
                      ...newRecord,
                      visitorId: Number(e.target.value),
                    });
                  }}
                  list="visitor"
                  className="w-full p-2 border rounded"
                  placeholder="Search Visitor..."
                />

                <datalist id="visitor">
                  {visitorOptions.map((visitor) => {
                    console.log(visitor);
                    return (
                      <option key={visitor.id} value={visitor.id}>
                        {visitor.name}
                      </option>
                    );
                  })}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium">Book</label>
                <input
                  type="text"
                  value={bookQuery}
                  onChange={(e) => {
                    setBookQuery(e.target.value);
                    setNewRecord({
                      ...newRecord,
                      bookId: Number(e.target.value),
                    });
                  }}
                  list="book-options"
                  className="w-full p-2 border rounded"
                  placeholder="Search Book..."
                />
                <datalist id="book-options">
                  {bookOptions.books?.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium">Borrow Date</label>
                <input
                  type="date"
                  value={newRecord.borrowDate}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, borrowDate: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default AddRecordDialog;
