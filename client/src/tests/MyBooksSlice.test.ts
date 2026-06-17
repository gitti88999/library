// MyBooksSlice.test.ts

import { mockedAxios } from './setupTests';
import reducer, { addBook, getMyBooks } from "../slices/LibrarySlice";
import { BooksStatus } from '../types/book';

describe("MyBooksSlice", () => {

  const initialState = {
  items: [],
  status: BooksStatus.Idle,
  error: "",
};

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle addBook fulfilled", async () => {
    const mockBook = { id: 1, title: "Test" };

    mockedAxios.post.mockResolvedValue({
      data: mockBook
    });

    const dispatch = jest.fn();
    const thunk = addBook(mockBook as any);

    const result = await thunk(dispatch, () => ({}), undefined);

    expect(result.payload).toEqual(mockBook);
    expect(mockedAxios.post).toHaveBeenCalled();
  });

  it("should handle getMyBooks fulfilled", async () => {
    const mockData = [{ id: 1, bookId: 1 }];

    mockedAxios.get.mockResolvedValue({
      data: mockData
    });

    const dispatch = jest.fn();
    const thunk = getMyBooks();

    const result = await thunk(dispatch, () => ({}), undefined);

    expect(result.payload).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  it("should handle reducer addBook.fulfilled", () => {
    const action = {
      type: addBook.fulfilled.type,
      payload: { id: 1 }
    };

    const state = reducer(initialState, action);
    expect(state.items.length).toBe(1);
    expect(state.status).toBe("succeeded");
  });

  it("should handle reducer getMyBooks.fulfilled", () => {
    const action = {
      type: getMyBooks.fulfilled.type,
      payload: [{ id: 2 }]
    };

    const state = reducer(initialState, action);
    expect(state.items.length).toBe(1);
    expect(state.status).toBe("succeeded");
  });

});