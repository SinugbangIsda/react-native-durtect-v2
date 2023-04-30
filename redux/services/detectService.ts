import { 
    createApi, 
    fetchBaseQuery 
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

export const detectApi = createApi({
    reducerPath: "detectApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL.api}/`
    }),
    endpoints: (builder) => ({
        getAllDetections: builder.query({
            query: ({ user_id }) => ({
                url: `/${user_id}/all`,
                method: "GET",                                          
                mode: "cors",
            })
        }),
        getRecentDectections: builder.query({
            query: ({ user_id }) => ({
                url: `/${user_id}/recent`,
                method: "GET",
                mode: "cors",
            })
        }),
        detectImage: builder.mutation({
            query: ({ user_id, formData }) => ({
                url: `/detect/${user_id}`,
                method: "POST",
                mode: "cors",
                body: formData
            })
        }),
        deleteDetectionById: builder.mutation({
            query: ({ user_id, entry_id }) => ({
                url: `/${user_id}/${entry_id}`,
                method: "DELETE",
                mode: "cors",
            })
        }),
        deleteAllDetections: builder.mutation({
            query: ({ user_id }) => ({
                url: `/${user_id}`,
                method: "DELETE",
                mode: "cors",
            })
        })
    })
});

export const {
    useGetAllDetectionsQuery,
    useGetRecentDectectionsQuery,
    useDetectImageMutation,
    useDeleteDetectionByIdMutation,
    useDeleteAllDetectionsMutation
} = detectApi;