'use client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

export default function Home() {
  return (
    <DashboardLayout>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Notice</AlertTitle>
        <AlertDescription>The frontend is still under development</AlertDescription>
      </Alert>
    </DashboardLayout>
  );
}
