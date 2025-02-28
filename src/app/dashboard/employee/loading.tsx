import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <Card>
        <CardHeader className='pb-3'>
            <CardTitle className='text-base'>직원</CardTitle>                
        </CardHeader>
        <CardContent className='grid grid-cols-[60px_1fr_1fr_1fr_1fr] gap-4 items-center'>
            {[...Array(2)].map((_, index) => (
              <React.Fragment key={index}>
                <Skeleton className='size-10 rounded-full ' />
                <Skeleton className='h-8 w-full ' />
                <Skeleton className='h-8 w-full ' />
                <Skeleton className='h-8 w-full ' />
                <Skeleton className='h-8 w-full' />
              </React.Fragment>
            ))}
        </CardContent>
    </Card>
  );
};

export default Loading;