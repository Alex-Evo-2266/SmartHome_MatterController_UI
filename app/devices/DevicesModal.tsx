"use client"

import { BaseActionCard, Button, ContentBox, Panel, TextField, Typography } from "alex-evo-sh-ui-kit"
import { useCallback, useState } from "react"

// export const dynamic = "force-dynamic"

interface PairModalProps{
    publish: (data: string)=>void
}

export default function PairModal({publish}:PairModalProps) {
    const [pairCode, setPairCode] = useState("")

    const pair = useCallback(() => {
        publish(JSON.stringify({
            type: "command",
            topic: "pair",
            message: { pairingCode: pairCode }
        }))
    }, [publish, pairCode])

    const change = (value: any, name?: string, e?: React.ChangeEvent<HTMLInputElement>)=>{
        console.log(value, name, e)
        setPairCode(value)
    }

    return (
        <ContentBox collapsible defaultVisible={false} label="Pair device" border>
            <TextField
                placeholder="paircode"
                value={pairCode}
                border
                onChange={change}
            />
            <BaseActionCard>
                <Button onClick={pair}>Pair</Button>
            </BaseActionCard>
        </ContentBox>
    )
}