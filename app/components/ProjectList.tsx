'use client';

import { useReadContract } from 'wagmi';
import ProjectFactory from '../../contracts/ProjectFactory.json';
import { Address } from 'viem';
import { ProjectCard } from './ProjectCard';

const factoryAddress = '0x5a53fB9862021a8e6468fa47CF6a49cA858C8C87';

export function ProjectList() {
  const { data, error, isLoading } = useReadContract({
    address: factoryAddress as Address,
    abi: ProjectFactory.abi,
    functionName: 'getAllProjects',
  });

  const projects = data as Address[] | undefined;

  if (isLoading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error fetching projects. Please try again.</p>;
  }

  return (
    <div style={{
      display: 'grid',
      gap: '3rem',
      width: '100%',
      maxWidth: '800px',
    }}>
      {projects && projects.length > 0 ? (
        projects.map((projectAddress: Address) => (
          <ProjectCard key={projectAddress} address={projectAddress} />
        ))
      ) : (
        <p>No active projects found.</p>
      )}
    </div>
  );
}