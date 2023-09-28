"use client"


import { React, useState } from 'react';

import { log } from 'console';
import Link from 'next/link'
import InformationDialog from './InformationDialog'


export default function Filter(props) {

    let lists = props.data.lists;
    let cities = props.data.cities;
    let unpinnedTags = props.data.unpinnedTags;
    let pinnedTags = props.data.pinnedTags;

    let venues = props.data.venues;

    // const [on, setOn] = useState('on');
    const [str, setStr] = useState('');

    function changed(e) {

        if (e.target.checked) {
            if (str.search(e.target.name) == -1) {
                console.log('added ' + e.target.name);
                let temp = str + '&' + e.target.name + '=1';
                setStr(temp);
            }
        } else {
            console.log('removed ' + e.target.name);


            // let newArr = on.filter(i => i !== e.target.name);
            // setOn(newArr);
        }

        // let temp = '';
        // for (let o of on) {
        //     temp += (o + '=1&');
        // }
        // setStr(temp);
        // console.log(on);
        // console.log(temp);



    }

    return (
        <>
            <Link href={'/q?' + str} className='fixed bottom-4 right-4 bg-red-600 py-2 px-4 rounded-lg text-2xl'>View Result</Link>
            <div className="m-4 container mx-auto grid gap-8 lg:grid-cols-4">

                <div className="mb-8">
                    <div className="min-h-[10rem]">
                        <div className='text-3xl mb-2'>Lists</div>
                        <div className="mb-6 text-sm">Curated list by someone,<br></br>contact them to be on that list</div>
                    </div>
                    {lists.map(list => {
                        return (
                            <div key={list.id}>
                                <input type="checkbox" name={'list-' + list.title} value="1" onChange={changed} />
                                <label className="ml-1 mr-1" htmlFor={'list-' + list.title}>{list.title}</label>
                                {/* <pre className="text-sm">
                                    {JSON.stringify(list, null, 4)}
                                </pre> */}
                                <InformationDialog html={list.venues.map(venue => {
                                    return (
                                        <div className="text-xs ml-4" key={venue.id}>
                                            <div className="">{venue.title}</div>
                                        </div>
                                    )
                                })}></InformationDialog>
                            </div>
                        )
                    })}
                </div>

                <div className="mb-8">
                    <div className="min-h-[10rem]">
                        <div className='text-3xl mb-2'>Cities</div>
                    </div>
                    <div className="">
                        {cities.map(city => {
                            return (
                                <div className="" key={city.id}>
                                    <div className="grid grid-cols-[auto,1fr,1fr] gap-x-2">
                                        <div className="">
                                            <input type="checkbox" name={'city-' + city.title} value="1" onChange={changed} />
                                        </div>
                                        <div className="">
                                            {city.title}
                                        </div>
                                        <div className="">
                                            {city._count.events}
                                        </div>

                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="mb-8">
                    <div className="min-h-[10rem]">
                        <div className='text-2xl mb-2'>Tags</div>
                    </div>
                    <div className="mb-[1em]">
                        {pinnedTags.map(tag => {
                            return (
                                <div className="" key={tag.id}>
                                    {tag._count.events > 1 &&
                                        <div className="grid grid-cols-[auto,1fr,1fr] gap-x-2">
                                            <div className="" >
                                                <input type="checkbox" name={'tag-' + tag.title} value="1" onChange={changed} />
                                            </div>
                                            <div className="">
                                                📌 {tag.title}
                                            </div>
                                            <div className="">
                                                {tag._count.events}
                                            </div>

                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div className="">
                        {unpinnedTags.map(tag => {
                            return (
                                <div className="" key={tag.id}>
                                    {tag._count.events > 1 &&
                                        <div className="grid grid-cols-[auto,1fr,1fr] gap-x-2">
                                            <div className="" >
                                                <input type="checkbox" name={'tag-' + tag.title} value="1" onChange={changed} />
                                            </div>
                                            <div className="">
                                                {tag.title}
                                            </div>
                                            <div className="">
                                                {tag._count.events}
                                            </div>

                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="mb-8">
                    <div className="min-h-[10rem]">
                        <div className='text-2xl mb-2'>Individual Venues</div>

                    </div>
                    {venues.map(venue => {
                        return (
                            <div className="" key={venue.id}>
                                <div className="grid w-full grid-cols-[10%,70%,10%,10%] gap-x-2" key={venue.id}>
                                    <div className="">
                                        <input type="checkbox" name={'venue-' + venue.title} value="1" onChange={changed} />
                                    </div>
                                    <div className={venue._count.events == 0 ? 'opacity-40' : ''}>{venue.title}</div>
                                    <div className={venue._count.events == 0 ? 'opacity-40' : ''}>{venue._count.events}</div>
                                    <InformationDialog html=<div className="text-sm mb-4">
                                        <div className="grid gap-8 grid-cols-2">
                                            <div className="">
                                                <div className="text-xs mb-1">Website(s)</div>
                                                <div className="">
                                                    <a className="underline" href={venue.website} target="_blank">{venue.website}</a>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="">
                                                    <div className="text-xs mb-1">City</div>
                                                    {venue.cities.map(city => {
                                                        return (
                                                            <div>{city.title}</div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ></InformationDialog>
                                </div>

                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}



