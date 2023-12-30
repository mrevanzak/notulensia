"use client"
import { useGetEventDetail } from '@/lib/api/event/get-event-detail'
import { useParams } from 'next/navigation';
import React, { ReactElement } from 'react'

export default function Summary(): ReactElement {
    const params = useParams<{ id: string }>();
    const id = params?.id ?? "";
    const getDetail = useGetEventDetail(id);

  return (
    <div className='mx-auto tw-w-[21cm] tw-border'>
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
            <span><b>Schedule :</b> 20 Minutes</span>
        </div>

        <table className='tw-table tw-border-black tw-border tw-w-full tw-mt-3'>
            <thead>
                <tr className='tw-w-full tw-border tw-border-black'>
                    <th colSpan={3} className='tw-px-2'>Schedule</th>
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
                    <tr className='tw-text-center'>
                    <td className='tw-border tw-border-black'>{schedule.startTime.toLocaleString()}</td>
                    <td className='tw-border tw-border-black'>{schedule.date.toLocaleString()}</td>
                    <td className='tw-border tw-border-black'>{schedule.activity}</td>
                </tr>    
                ))}
                
            </tbody>
        </table>

        
        <table className='tw-table tw-border-black tw-border tw-w-full tw-mt-3'>
            <thead>
                <tr className='tw-w-full tw-border tw-border-black'>
                    <th colSpan={3} className='tw-px-2'>Attachment files</th>
                </tr>
                <tr className='tw-border tw-border-black'>
                    <th className='tw-w-1/4 tw-border tw-border-black'>Name</th>
                    <th className='tw-w-1/5 tw-border tw-border-black'>Format</th>
                    <th className='tw-w-full tw-border tw-border-black'>Link</th>
                </tr>
            </thead>
            <tbody>
                {getDetail.data?.files?.map((file) => (
                    <tr className='tw-text-center'>
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
                    <th colSpan={5} className='tw-px-2'>Audience List</th>
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
                    <tr className='tw-text-center'>
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
