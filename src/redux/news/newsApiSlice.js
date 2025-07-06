import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const newsAdapter = createEntityAdapter();

const initialState = newsAdapter.getInitialState();

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => "/news",
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        console.log("News response:", responseData);

        if (Array.isArray(responseData.news)) {
          const loadedNews = responseData.news.map((item) => ({
            ...item,
            id: item._id, // для RTK Entity
          }));
          return newsAdapter.setAll(initialState, loadedNews);
        } else {
          console.error("Expected array of news but got:", responseData);
          return newsAdapter.setAll(initialState, []);
        }
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "News", id: "LIST" },
            ...result.ids.map((id) => ({ type: "News", id })),
          ];
        } else return [{ type: "News", id: "LIST" }];
      },
    }),
    // Інші запити типу add/update/delete — пізніше
  }),
});

export const {
  useGetNewsQuery,
} = newsApiSlice;

// Вибірка з state
export const selectNewsResult = newsApiSlice.endpoints.getNews.select();

const selectNewsData = createSelector(
  selectNewsResult,
  (newsResult) => newsResult.data ?? initialState
);

export const {
  selectAll: selectAllNews,
  selectById: selectNewsById,
  selectIds: selectNewsIds,
} = newsAdapter.getSelectors((state) => selectNewsData(state));
