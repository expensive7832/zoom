
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

const GetCallDetails = async(id: string) =>{

    const client = useStreamVideoClient()

    const [call, setCall] = useState<Call>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {

        if(!client) return;

        const getcalls = async() =>{
           let { calls } =  await client?.queryCalls({
                filter_conditions: {
                    id
                }
            })

            if(calls?.length > 0){

                setCall(calls[0])
                setIsLoading(false)
            }
            
        }

        getcalls()

    }, [client, id])

    return {isLoading, call}
}

export default GetCallDetails