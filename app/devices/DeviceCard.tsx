import { MatterDevice } from "@/lib/devicesDataType/types"
import { Card, DangerButton, Typography } from "alex-evo-sh-ui-kit"
import { useCallback } from "react"

interface DeviceCardProps {
    publish:(data: string) => void
    device: MatterDevice
}

export const DeviceCard = ({device, publish}:DeviceCardProps) => {

    const deleteHandler = useCallback(()=>{
        publish(JSON.stringify({
                type: "command",
                topic: "delete",
                message: { nodeId: device.nodeId }
            }))
    },[publish, device.nodeId])

    return(
        <Card 
            header={device.deviceData.basicInformation.productLabel}
            title={`nodeId: ${device.nodeId}`} 
            action={[<DangerButton container={document.body} header="delete device" text="delete device" onClick={deleteHandler}>
                delete
            </DangerButton>]}>
            {device.deviceData.deviceMeta.wifiConnected && <Typography type="title">wifi</Typography>}
            {device.deviceData.deviceMeta.threadConnected && <Typography type="title">thread</Typography>}
        </Card>
    )
}