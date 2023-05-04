import { useState, useEffect, useCallback } from "react";
import { useGetAllDetectionsQuery, useGetRecentDectectionsQuery } from "../redux/services/detectService";

const useDetections = ({ id }: any ) => {
    const { data: recentDetections, refetch: recentLogsRefetch, isLoading: recentLogsIsLoading } = useGetRecentDectectionsQuery({ user_id: id }, { refetchOnMountOrArgChange: true, skip: !id });
    const { data: allDetections, refetch: allLogsRefetch, isLoading: allLogsIsLoading } = useGetAllDetectionsQuery({ user_id: id }, { refetchOnMountOrArgChange: true, skip: !id });
    const [ recentLogsIDs, setRecentLogsIDs ] = useState<any>();
    const [ allLogsIDs, setAllLogsIDs ] = useState<any>();
    const [ recentLogs, setRecentLogs ] = useState<any>();
    const [ allLogs, setAllLogs ] = useState<any>();

    const handleRecentDetections = useCallback(async () => {
        if (recentDetections) {
            const keys = Object.keys(recentDetections);
            const data = Object.values(recentDetections);
            if (data[0] === "empty"){
                setRecentLogs(null);
                setRecentLogsIDs(null);
            } else {
                setRecentLogsIDs(keys.reverse());
                setRecentLogs(data.reverse());
            }
        } else {
            setRecentLogs(null);
            setRecentLogsIDs(null);
        }
    }, [ recentDetections ]);

    const handleAllDetections = useCallback(async () => {
        if (allDetections) {
            const keys = Object.keys(allDetections);
            const data = Object.values(allDetections);
            if (data[0] === "empty"){
                setAllLogs(null);
                setAllLogsIDs(null);
            } else {
                setAllLogsIDs(keys.reverse());
                setAllLogs(data.reverse());
            }
        } else {
            setAllLogs(null);
            setAllLogsIDs(null);
        }
    }, [ allDetections ]);
    
    useEffect(() => {
        handleAllDetections();
        handleRecentDetections();
    }, [ handleAllDetections, handleRecentDetections ]);


    return { 
        recentLogs, 
        allLogs, 
        recentLogsIDs, 
        allLogsIDs, 
        recentLogsRefetch, 
        allLogsRefetch,
        allLogsIsLoading, 
        recentLogsIsLoading 
    };
}

export default useDetections;