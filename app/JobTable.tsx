import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useLiveQuery } from 'dexie-react-hooks';
import db, { JobWithRecord } from '../lib/db';
import JobButton from './JobButton';

dayjs.extend(isToday);

const getJobs = async () => {
  const jobs = await db.jobs.toArray();

  return Promise.all(jobs.map(async (job): Promise<JobWithRecord> => {
    const records = await db.records.where('jobId').equals(job.id!).reverse().sortBy('time');
    const record = records[0];

    return {
      ...job,
      recordTime: record?.time,
    };
  }));
};

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
