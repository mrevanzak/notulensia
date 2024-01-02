"use client"
import { useDownloadSummary } from '@/lib/api/event/download-summary-event';
import { useGetEventDetailSummary } from '@/lib/api/event/get-event-public-summary';
import { useSendNotification } from '@/lib/api/event/send-notification';
import { useParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Skeleton } from 'primereact/skeleton';
import React from 'react'
import type { ReactElement } from 'react'

export default function Summary(): ReactElement {
    const params = useParams<{ id: string }>();
    const id = params?.id ?? "";
    const getDetail = useGetEventDetailSummary(id);

    const loading = getDetail.isLoading;
    const { mutate, isPending } = useDownloadSummary(id);

    if(loading || getDetail.error){
        return(
            <div className='tw-w-[21cm] tw-h-[100vh] tw-mx-auto tw-border'>
                <Skeleton className='tw-mb-3' height='25vh' width='100%'> </Skeleton>
                <Skeleton className='tw-mb-3' height='25vh' width='100%'> </Skeleton>
                <Skeleton className='tw-mb-3' height='25vh' width='100%'> </Skeleton>
                <Skeleton className='tw-mb-3' height='25vh' width='100%'> </Skeleton>
            </div>
        );
    }

  return (
    <div className='mx-auto tw-w-[21cm] tw-border'>
        <Button className='tw-fixed tw-top-2 tw-right-2' icon='pi pi-download' loading={isPending} onClick={() => {mutate()}} type='button'/>
        <h3 className='tw-border tw-border-black tw-border-b-transparent tw-bg-black tw-text-white tw-text-center tw-p-3' >Meeting Wise Agenda</h3>
        <div className='tw-border tw-border-black tw-text-center'>
            <h3>{getDetail.data?.name}</h3>
            <span>{`${getDetail.data?.startAt.toLocaleString()} - ${getDetail.data?.endAt.toLocaleString()}`}</span>
            <p className='tw-mt-3'>{getDetail.data?.isOnline ? "Online Event" : "Offline Event"}</p>
            <p>{getDetail.data?.isOnline ? getDetail.data.linkUrl : getDetail.data?.address}</p>
        </div>
        <div className='tw-border-b tw-border-r tw-border-l tw-border-black tw-flex tw-px-2'>
            <div className='tw-w-[10%]'>Topic : </div>
            <div className='tw-w-full'>{getDetail.data?.topic}</div>
            <div className='tw-border-l tw-border-black tw-w-[45%] tw-pl-2 '>
                <p>{`Attendes : ${getDetail.data?.audienceUsers?.length} People`}</p>
                <p>{`Schedule : ${getDetail.data?.schedules?.length} Schedule`}</p>
            </div>
        </div>
        <div className='tw-border-b tw-border-r tw-border-l tw-border-black tw-px-2'>
            <b>Meeting Objective :</b>
            <p>{getDetail.data?.purpose}</p>
        </div>
        <div className='tw-border tw-border-t-transparent tw-border-black tw-px-2'>
            <b>To Prepare For This Meeting, Please :</b>
            <p>{getDetail.data?.preparationNotes}</p>
        </div>
        <div className='tw-border tw-border-t-transparent tw-border-black tw-px-2'>
            <span><b>Schedule :</b> {getDetail.data?.startAt.toLocaleString()} - {getDetail.data?.endAt.toLocaleString()}</span>
        </div>

        <table className='tw-table tw-border-black tw-border tw-w-full tw-mt-3'>
            <thead>
                <tr className='tw-w-full tw-border tw-border-black'>
                    <th className='tw-px-2'  colSpan={3}>Schedule</th>
                </tr>
                <tr className='tw-border tw-border-black'>
                    <th className='tw-w-1/4 tw-border tw-border-black'>Time</th>
                    <th className='tw-w-1/5 tw-border tw-border-black'>Duration</th>
                    <th className='tw-w-full tw-border tw-border-black'>Activity</th>
                </tr>
            </thead>
            <tbody>
                {getDetail.data?.schedules?.sort((a, b) => {
                    if (a.position !== undefined && b.position !== undefined) {
                        return a.position - b.position;
                    }
                    return 0; 
                }).map((schedule) => (
                    <tr className='tw-text-center'  key={schedule.position}>
                        <td className='tw-border tw-border-black'>{schedule.startTime}</td>
                        <td className='tw-border tw-border-black'>{schedule.duration} minutes</td>
                        <td className='tw-border tw-border-black'>{schedule.activity}</td>
                    </tr>    
                ))}
            </tbody>
        </table>

        
        <table className='tw-table tw-border-black tw-border tw-w-full tw-mt-3'>
            <thead>
                <tr className='tw-w-full tw-border tw-border-black'>
                    <th className='tw-px-2' colSpan={3} >Attachment files</th>
                </tr>
                <tr className='tw-border tw-border-black'>
                    <th className='tw-w-1/4 tw-border tw-border-black'>Name</th>
                    <th className='tw-w-1/5 tw-border tw-border-black'>Format</th>
                    <th className='tw-w-full tw-border tw-border-black'>Link</th>
                </tr>
            </thead>
            <tbody>
                {getDetail.data?.files?.map((file) => (
                    <tr  className='tw-text-center' key={file.storageId}>
                        <td className='tw-border tw-border-black'>{file.name}</td>
                        <td className='tw-border tw-border-black'>{file.format}</td>
                        <td className='tw-border tw-border-black tw-text-xs'><a className='tw-text-blue-500' href={`https://agenda.saranaintegrasi.co.id/api/v1/storage/agenda/${file.storageId}`}>{`https://agenda.saranaintegrasi.co.id/api/v1/storage/agenda/${file.storageId}`}</a></td>
                    </tr>    
                ))}
                
            </tbody>
        </table>

        <table className='tw-table tw-border-black tw-border tw-w-full tw-mt-3'>
            <thead>
                <tr className='tw-w-full tw-border tw-border-black'>
                    <th className='tw-px-2' colSpan={5}>Audience List</th>
                </tr>
                <tr className='tw-border tw-border-black'>
                    <th className='tw-w-1/4 tw-border tw-border-black'>Name</th>
                    <th className='tw-w-1/5 tw-border tw-border-black'>Description</th>
                    <th className='tw-w-full tw-border tw-border-black'>Email</th>
                    <th className='tw-w-full tw-border tw-border-black'>Job</th>
                    <th className='tw-w-full tw-border tw-border-black'>Phone Number</th>
                </tr>
            </thead>
            <tbody>
                {getDetail.data?.audienceUsers?.map((user) => (
                    <tr className='tw-text-center' key={user.email}>
                        <td className='tw-border tw-border-black'>{user.name}</td>
                        <td className='tw-border tw-border-black'>{user.description ?? "-"}</td>
                        <td className='tw-border tw-border-black'>{user.email}</td>
                        <td className='tw-border tw-border-black'>{user.job}</td>
                        <td className='tw-border tw-border-black'>{user.phoneNumber}</td>
                    </tr>    
                ))}
            </tbody>
        </table>
    </div>
  )
}
