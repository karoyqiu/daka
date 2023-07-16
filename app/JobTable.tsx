import { useLiveQuery } from 'dexie-react-hooks';
import db, { Job } from '../lib/db';

type JobWithRecord = Job & {
  recordTime?: Date,
}

const getJobs = async () => {
  const jobs = await db.jobs.toArray();

  return Promise.all(jobs.map(async (job): Promise<JobWithRecord> => {
    const records = await db.records.where('jobId').equals(job.id!);
    const record = await records.first();

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
        <button key={job.id} className="btn">
          {job.name}@{job.time}
        </button>
      ))}
      {jobs?.map((job) => (
        <button key={job.id} className="btn">
          {job.name}
        </button>
      ))}
      {jobs?.map((job) => (
        <button key={job.id} className="btn">
          {job.name}
        </button>
      ))}
      {jobs?.map((job) => (
        <button key={job.id} className="btn">
          {job.name}
        </button>
      ))}
      {jobs?.map((job) => (
        <button key={job.id} className="btn">
          {job.name}
        </button>
      ))}
      {jobs?.map((job) => (
        <button key={job.id} className="btn">
          {job.name}
        </button>
      ))}
      {jobs?.map((job) => (
        <button key={job.id} className="btn">
          {job.name}
        </button>
      ))}
    </div>
  );
}
