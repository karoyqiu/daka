'use client';
import AddJobDialog from './AddJobDialog';
import JobTable from './JobTable';

export default function Home() {
  return (
    <>
      <AddJobDialog />
      <JobTable />
    </>
  );
}
