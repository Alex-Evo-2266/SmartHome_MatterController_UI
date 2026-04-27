"use client"

import { useSocket } from "@/lib/hooks/webSocket.hook"
import { useCallback, useEffect, useMemo, useState } from "react"
import PairModal from "./DevicesModal"
import { FAB } from "alex-evo-sh-ui-kit"

export default function Page(){ 
    
    const [message, setMessage] = useState<Record<string, unknown>>({})

    const setMqttMessage = useCallback((data: string) => {
        const parseData = JSON.parse(data)
        console.log(parseData)
        setMessage(parseData)
    },[])

    const colbacks = useMemo(()=>[
            {messageType: "message_service", callback: setMqttMessage},
    ],[setMqttMessage])

    const {connectSocket, closeSocket, publish} = useSocket(colbacks)

    useEffect(() => {
          console.log('MessageService connected')
          connectSocket();
          return () => closeSocket(); // закрывать при размонтировании
      }, [connectSocket, closeSocket]);
  
    console.log(message)
    return (
        <div>
            <div>
                <PairModal publish={publish}/>
            </div>
            <table>

            </table>
            <FAB onClick={()=>publish(JSON.stringify({
                type: "command",
                topic: "devices/get",
                message: { data: "reload" }
            }))}>reload</FAB>
        </div>
    )
}