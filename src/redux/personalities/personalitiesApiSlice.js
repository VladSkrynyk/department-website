import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const personalitiesAdapter = createEntityAdapter({});

const initialState = personalitiesAdapter.getInitialState();

export const personalitiesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPersonalities: builder.query({
            query: () => "/personalities",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: (responseData) => {
                console.log("Response Data:", responseData); // Перевірка формату даних
                if (Array.isArray(responseData.personalities)) {
                    const loadedPersonalities = responseData.personalities.map((person) => {
                        return { ...person, id: person._id }; // Прив'язуємо id
                    });
                    return personalitiesAdapter.setAll(initialState, loadedPersonalities);
                } else {
                    console.error("Expected an array but got:", responseData);
                    return personalitiesAdapter.setAll(initialState, []);
                }
            },
            
            
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Personality", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Personality", id })),
                    ];
                } else return [{ type: "Personality", id: "LIST" }];
            },
        }),
    }),
});

export const { useGetPersonalitiesQuery } = personalitiesApiSlice;

// Отримати результат запиту
export const selectPersonalitiesResult = personalitiesApiSlice.endpoints.getPersonalities.select();

// Створити мемоізований селектор
const selectPersonalitiesData = createSelector(
    selectPersonalitiesResult,
    (personalitiesResult) => personalitiesResult.data // нормалізовані `ids` та `entities`
);

// Отримати селектори для роботи зі списком персон
export const {
    selectAll: selectAllPersonalities,
    selectById: selectPersonalityById,
    selectIds: selectPersonalityIds,
} = personalitiesAdapter.getSelectors((state) => selectPersonalitiesData(state) ?? initialState);
