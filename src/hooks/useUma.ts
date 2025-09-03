import { useQuery } from "@tanstack/react-query";
import { getUma, getUmaById } from "@/api/axios";


export function useUma() {
    return useQuery({
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