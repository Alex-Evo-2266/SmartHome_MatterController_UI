"use client"

import { useSocket } from "@/lib/hooks/webSocket.hook"
import { useCallback, useEffect, useMemo, useState } from "react"
import PairModal from "./DevicesModal"
import { FAB } from "alex-evo-sh-ui-kit"

export default function Page(){ 

    const [devices, setDevices] = useState<Record<any,any>[]>([])
    
    const setMqttMessage = useCallback((data: string) => {
        const parseData: unknown = JSON.parse(data)
        console.log(parseData)
        if(typeof parseData === "object" && parseData !== null && "message" in parseData && typeof parseData.message === "string"){
            const newData = JSON.parse(parseData.message)
            console.log(newData.data)
            setDevices(newData.data)
        }
    },[])

    const colbacks = useMemo(()=>[
            {messageType: "", callback: setMqttMessage},
    ],[setMqttMessage])

    const {connectSocket, closeSocket, publish} = useSocket(colbacks)

    useEffect(() => {
          console.log('MessageService connected')
          connectSocket();
          return () => closeSocket(); // закрывать при размонтировании
      }, [connectSocket, closeSocket]);
  
    return (
        <div>
            <div>
                <PairModal publish={publish}/>
            </div>
            <table>
            {
                devices.map((item)=>(<p>{item.deviceData.basicInformation.productLabel}</p>))
            }
            </table>
            <FAB onClick={()=>publish(JSON.stringify({
                type: "command",
                topic: "devices/get",
                message: { data: "reload" }
            }))}>reload</FAB>
        </div>
    )
}