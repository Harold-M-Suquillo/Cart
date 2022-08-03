import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState(null);


    const sendRequest =  useCallback( async(requestConfig, transformData) => {
        setisLoading(true);
        setError(null);
        try{
            const response = await fetch( requestConfig.url, {
							method: requestConfig.method ? requestConfig.method : 'GET',
							headers: requestConfig.headers ? requestConfig.headers : {},
							body: requestConfig.body ? JSON.stringify(requestConfig.body) : null 
						});

						if (!response.ok){ throw new Error('Request Failed!'); }

						const data = await response.json();
						transformData(data);
        }
        catch (error){
					setError(error.message || 'Something went wrong!')
      }
			setisLoading(false);
    }, []);

		return { isLoading, error, sendRequest };

}
export { useHttp };