import { ProblemInfo } from './../types/problem';
import { useEffect, useState } from 'react';
import instance from '../api/axios';


// interface ProblemInfo {
//   title: string;
//   content: string;
//   limitFactors: { factor: string }[];
//   limitTime: number;
//   baseCode: { language: string; code: string }[];
//   testcase: {
//     inputCase: string[][];
//     outputCase: string[][];
//     description: string;
//   };
//   difficulty: number;
// }

const useProblemFetching = (problemId: string) => {
  const [problemInfo, setProblemInfo] = useState<ProblemInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProblemInfo = async () => {
      try {
        const response = await instance.get(`/problems/${problemId}`);
        setProblemInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching problem info: ', error);
        setTimeout(() => {
          fetchProblemInfo();
        }, 5000);
      }
    };

    fetchProblemInfo();

    // Cleanup function to reset state when unmounting or when problemId changes
    return () => {
      setProblemInfo(null);
      setIsLoading(true);
    };
  }, [problemId]);

  return { problemInfo, isLoading };
};

export default useProblemFetching;
