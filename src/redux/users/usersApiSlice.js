import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice"; // Шлях оновлений, бо users лежить в redux

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map((user) => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "User", id }))
                    ];
                } else return [{ type: "User", id: "LIST" }];
            }
        }),
    }),
});

export const { useGetUsersQuery } = usersApiSlice;

// Отримати результат запиту
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Створити мемоізований селектор
const selectUsersData = createSelector(
    selectUsersResult,
    (usersResult) => usersResult.data // нормалізовані `ids` та `entities`
);

// Отримати селектори для роботи зі списком користувачів
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
