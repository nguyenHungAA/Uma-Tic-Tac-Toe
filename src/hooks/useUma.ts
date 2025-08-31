import { useQuery } from "@tanstack/react-query";
import { getUma } from "@/api/axios";


export function useUma() {
    return useQuery({
        queryKey: ['getUma'],
        queryFn: getUma,
    });
}