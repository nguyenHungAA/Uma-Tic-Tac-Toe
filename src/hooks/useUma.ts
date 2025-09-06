import { useQuery } from "@tanstack/react-query";
import { getUma, getUmaById } from "@/api/axios";
import type { Uma } from "@/types/Uma";

import type { ApiResponseType } from "@/types/apiResponseType";


export function useUma() {
    return useQuery<ApiResponseType<Uma[]>>({
        queryKey: ['getUma'],
        queryFn: getUma,
    });
}

export function useUmaById(id: string) {
    return useQuery({
        queryKey: ['getUmaById', id],
        queryFn: () => getUmaById(id),
        enabled: !!id,
    });
}