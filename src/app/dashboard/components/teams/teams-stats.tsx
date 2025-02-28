import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';
import {  ListChecksIcon, StarIcon,  UsersIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import TeamDistributionChart from './team-distributuon-cahrt';
import SupportTicketsResolved from './support-tickets-resolved';

const teamLeaders = [
    {
      firstName: "Colin",
      lastName: "Murray",
      avatar: "/images/cm.jpg",
    },
    {
      firstName: "Tom",
      lastName: "Phillips",
    },
    {
      firstName: "Liam",
      lastName: "Fuentes",
    },
    {
      firstName: "Tina",
      lastName: "Fey",
      avatar: "/images/tf.jpg",
    },
    {
      firstName: "Katie",
      lastName: "Johnson",
    },
    {
      firstName: "Tina",
      lastName: "Jones",
    },
    {
      firstName: "Amy",
      lastName: "Adams",
    },
    {
      firstName: "Ryan",
      lastName: "Lopez",
      avatar:"/images/rl.jpg",
    },
    {
      firstName: "Jenny",
      lastName: "Jones",
    },
  ];

const TeamsStats:React.FC = () => {
  const totalEmployees = 100;
  const employeesPresent = 85;
  const employeesPresentPercentage = (employeesPresent / totalEmployees) * 100;

  return (

    <>
    <div className='grid lg:grid-cols-3 gap-4'>
        <Card>
            <CardHeader className='pb-2'>
                <CardTitle className='text-base'>전체 팀</CardTitle>    
            </CardHeader>   
            <CardContent className='flex justify-between items-center'>
                <div className='flex gap-2'>
                <UsersIcon />
                </div>
                <div className='text-5xl font-bold'>
                    {totalEmployees}
                </div>
                <div>
                    <Button size="xs"  asChild>
                        <Link href="/dashboard/employees">전체 보기</Link>
                    </Button>
                </div>
            </CardContent> 
        </Card>


        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex justify-between items-center">
              <span>팀 리더</span>
              <StarIcon className="text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {teamLeaders.map((teamLeader) => (
              <TooltipProvider
                key={`${teamLeader.firstName}${teamLeader.lastName}`}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar>
                      {!!teamLeader.avatar && (
                        <Image
                          src={teamLeader.avatar}
                          width={40}
                          height={40}
                          alt={`${teamLeader.firstName} ${teamLeader.lastName} avatar`}
                        />
                      )}
                      <AvatarFallback>
                        {teamLeader.firstName[0]}
                        {teamLeader.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    {teamLeader.firstName} {teamLeader.lastName}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </CardContent>
        </Card>


        <Card >
            <CardHeader className='pb-2'>
                <CardTitle className='text-base'>팀 배포</CardTitle> 
            </CardHeader>
            <CardContent className="pb-0">
            <TeamDistributionChart />
          </CardContent>         
        </Card>
    </div>


    <Card className='my-4'>
        <CardHeader>
            <CardTitle className='text-base'> 
                <ListChecksIcon />
                <span>직원 근무지 동향</span>
            </CardTitle> 
        </CardHeader>
        <CardContent className="pl-0">
          <SupportTicketsResolved />
        </CardContent>     
    </Card>

    
  </>
  )
}

export default TeamsStats;