import { useState, useContext, useEffect, useCallback } from "react";
import { GlobalContext } from "../context/Global";
import { useGetAllDetectionsQuery, useGetRecentDectectionsQuery } from "../redux/services/detectService";

const useDetections = () => {
    const { user_id } = useContext(GlobalContext);
    const { data: recentDetections, refetch: recentLogsRefetch } = useGetRecentDectectionsQuery({ user_id: user_id});
    const { data: allDetections, refetch: allLogsRefetch } = useGetAllDetectionsQuery({ user_id: user_id});
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


    return { recentLogs, allLogs, recentLogsIDs, allLogsIDs, recentLogsRefetch, allLogsRefetch };
}

export default useDetections;