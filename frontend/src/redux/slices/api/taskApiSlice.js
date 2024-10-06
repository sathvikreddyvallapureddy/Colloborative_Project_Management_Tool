import { apiSlice } from "../apiSlice";

const TASKS_URL = "/task";
export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: ({ strQuery, search }) => ({
        url: `${TASKS_URL}/?stage=${strQuery}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/update/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: "DELETE",
        // body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
