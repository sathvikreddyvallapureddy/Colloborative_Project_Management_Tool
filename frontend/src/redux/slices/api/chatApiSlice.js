import { apiSlice } from "../apiSlice";

const CHATS_URL = "/chat";
export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchChats: builder.query({
      query: () => ({
        url: `${CHATS_URL}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    accessChats: builder.mutation({
      query: (data) => ({
        url: `${CHATS_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useFetchChatsQuery, useAccessChatsMutation } = chatApiSlice;
