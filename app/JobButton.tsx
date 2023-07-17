import dayjs from 'dayjs';
import db, { JobWithRecord } from '../lib/db';

const isCheckedToday = (job: JobWithRecord) => {
  if (job.recordTime) {
    const d = dayjs(job.recordTime);

    if (d.isToday()) {
      return true;
    }
  }

  return false;
};

const getJobIcon = (job: JobWithRecord) => (
  <span className="material-icons-outlined">
    {isCheckedToday(job) ? 'sentiment_satisfied' : 'sentiment_neutral'}
  </span>
);

const getJobColor = (job: JobWithRecord) => (
  isCheckedToday(job) ? 'btn-success' : 'btn-accent'
);

const getJobTime = (job: JobWithRecord) => (
  isCheckedToday(job) ? dayjs(job.recordTime).format('HH:mm') : `~${job.time}`
);


type JobButtonProps = {
  job: JobWithRecord,
}

export default function JobButton(props: JobButtonProps) {
  const { job } = props;

  const checkIn = async () => {
    await db.records.add({
      jobId: job.id!,
      time: new Date(),
    });
  };

  const remove = async () => {
    await Promise.all([
      db.jobs.delete(job.id!),
      db.records.where('jobId').equals(job.id!).delete(),
    ]);
  };

  return (
    <div className="join">
      <button className={`btn ${getJobColor(job)} join-item flex-1`} onClick={checkIn}>
        {getJobIcon(job)}
        {job.name}@{getJobTime(job)}
      </button>
      <button className="btn btn-warning join-item" onClick={remove}>
        <span className="material-icons-outlined">delete</span>
      </button>
    </div>
  );
}
