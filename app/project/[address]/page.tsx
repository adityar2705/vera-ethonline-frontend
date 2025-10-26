'use client';

import { useParams } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
// The import must match the NAMED export from the component file.
import { ProjectDetails } from '@/app/components/ProjectDetails';
import { Address } from 'viem';

export default function ProjectPage() {
  const params = useParams();
  
  const projectAddress = (
    Array.isArray(params.address) ? params.address[0] : params.address
  ) as Address;

  return (
    <>
      <Header />
      <main>
        {projectAddress ? (
          <ProjectDetails address={projectAddress} />
        ) : (
          <p>Invalid project address.</p>
        )}
      </main>
      <Footer />
    </>
  );
}