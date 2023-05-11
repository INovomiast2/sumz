import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidapi_key = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleAPI = createApi({
    reducerPath: 'articleAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidapi_key);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
        
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
});

export const { useLazyGetSummaryQuery } = articleAPI;