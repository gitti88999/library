import axios from "axios";
import reducer, { getMyBooks, BooksState } from "../Pages/Library/LibrarySlice";


jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AllBooksSlice", () => {
  const initialState: BooksState = {
    items: [],
    status: "idle",
    error: undefined,
  };

  it("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle getBooks.pending", () => {
    const action = { type: getMyBooks.pending.type };
    const state = reducer(initialState, action);

    expect(state.status).toBe("loading");
  });

  it("should handle getBooks.fulfilled", () => {
    const mockBooks = [
      { id: 1, title: "Book 1" },
      { id: 2, title: "Book 2" },
    ];

    const action = {
      type: getMyBooks.fulfilled.type,
      payload: mockBooks,
    };

    const state = reducer(initialState, action);

    expect(state.status).toBe("succeeded");
    expect(state.items).toEqual(mockBooks);
    expect(state.error).toBeNull();
  });

  it("should handle getBooks.rejected", () => {
    const action = {
      type: getMyBooks.rejected.type,
      error: { message: "Network Error" },
    };

    const state = reducer(initialState, action);

    expect(state.status).toBe("failed");
    expect(state.error).toBe("Network Error");
  });

  it("should call API with axios (async thunk)", async () => {
    const mockData = [
      { id: 1, title: "Book 1" },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: mockData,
    } as any);

    const dispatch = jest.fn();
    const thunk = getMyBooks();

    const result = await thunk(dispatch, () => ({} as any), undefined);

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.payload).toEqual(mockData);
  });
});