import { useQuery } from "@tanstack/react-query";
import { getUma } from "@/api/axios";
import type { Uma } from "@/types/Uma";


export function useUma() {
    return useQuery<Uma[], Error>({
        queryKey: ['getUma'],
        queryFn: getUma,
    });
}