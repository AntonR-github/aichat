"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Circle, PhoneCall, PhoneOff } from 'lucide-react'
import Image from 'next/image'
import Vapi from '@vapi-ai/web';


type messages={
    role:string,
    text:string
}


function MedicalVoiceAgent() {

    const [callStarted, setCallStarted] = useState(false)
    const [vapiInstance, setVapiInstance] = useState<any>();
    const [currentRole, setCurrentRole] = useState<string|null>();
    const [liveTranscript, setLiveTranscript] = useState<string>();
    const [messages, setMessages] = useState<messages[]>([]);

    const startCall = () => {
        const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
        setVapiInstance(vapi)
        vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
        vapi.on('call-start', () => {
            console.log('Call started')
            setCallStarted(true);

        });
        vapi.on('call-end', () => {
            setCallStarted(false);
            console.log('Call ended')
        });
        vapi.on('message', (message) => {
            if (message.type === 'transcript') {
                const{role, transcriptType, transcript} = message
                console.log(`${message.role}: ${message.transcript}`);
                if(transcriptType =='partial'){
                setLiveTranscript(transcript);
                setCurrentRole(role);
                }
                else if (transcriptType == 'final'){
                    setMessages((prev:any) => [...prev, {role: role, text: transcript }])
                    setLiveTranscript("");
                    setCurrentRole(null);

                }
            }
        });
        vapiInstance.on('speech-start', () => {
            console.log('Assistant started speaking');
            setCurrentRole('assistant')
        });
        vapiInstance.on('speech-end', () => {
            console.log('Assistant stopped speaking');
            setCurrentRole('user')
        });
    }

    const endCall = () => {
        if (!vapiInstance) return;

        vapiInstance.stop();

        vapiInstance.off('call-start');
        vapiInstance.off('call-end');
        vapiInstance.of('message');

        setCallStarted(false)
        setVapiInstance(null)
    };

    return (
        <div className='p-5 border rounded-3xl bg-secondary'>
            <div className='flex justify-between items-center'>
                <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'><Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} />{callStarted ? 'Connected...' : 'Not Connected'} </h2>
                <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
            </div>
            <div className='flex items-center flex-col mt-10'>
                <Image src={'/doctor3.png'} alt='doctor' width={120} height={120} className='h-[200px] w-[200px] object-cover rounded-full' />
                <h2 className='mt-2 text-lg'>General Doctor</h2>
                <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>

                <div className='mt-32 max'>
                    {messages?.map((msg:messages,index) => (
                        
                            <h2 className='text-gray-400' key={index}>{msg.role}: {msg.text}</h2>
                        
                    ))}
                    {liveTranscript && liveTranscript?.length>0&& <h2 className='text-lg'>{currentRole} : {liveTranscript}</h2>}
                </div>

                {!callStarted ?
                    <Button className='mt-20' onClick={startCall}> <PhoneCall /> Start Call</Button>
                    :
                    <Button variant={'destructive'} onClick={endCall}> <PhoneOff /> End Call</Button>
                }
            </div>
        </div>
    )
}

export default MedicalVoiceAgent