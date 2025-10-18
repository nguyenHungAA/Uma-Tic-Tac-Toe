import { useQuery } from "@tanstack/react-query";
import { getUma, getUmaById } from "@/api/axios";
import type { Uma } from "@/types/Uma";

import type { ApiResponseType } from "@/types/apiResponseType";


export function useUma(offset: number = 0, limit: number = 27) {
    return useQuery<ApiResponseType<Uma[]>>({
        queryKey: ['getUma', offset, limit],
        queryFn: () => getUma(offset, limit),
    });
}

// hooks/useUma.ts
export function useUmaById(id: string) {
    return useQuery({
        queryKey: ['getUmaById', id],
        queryFn: () => getUmaById(id),
        enabled: !!id,
        retry: 3,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });
}