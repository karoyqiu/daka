import { useLiveQuery } from 'dexie-react-hooks';
import { getJobs } from '../lib/db';
import JobButton from './JobButton';


export default function JobTable() {
  const jobs = useLiveQuery(getJobs);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mx-4">
      {jobs?.map((job) => (
        <JobButton key={job.id} job={job} />
      ))}
    </div>
  );
}
