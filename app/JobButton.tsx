import dayjs from 'dayjs';
import db, { JobWithRecord, checkIn } from '../lib/db';

const getJobIcon = (job: JobWithRecord) => {
  let icon = 'sentiment_satisfied';

  if (!job.checked) {
    icon = job.late ? 'sentiment_dissatisfied' : 'sentiment_neutral';
  }

  return (
    <span className="material-icons-outlined">
      {icon}
    </span>
  );
};

const getJobColor = (job: JobWithRecord) => {
  if (job.checked) {
    return 'btn-success';
  }

  return job.late ? 'btn-error' : 'btn-accent';
};

const getJobTime = (job: JobWithRecord) => {
  if (job.checked) {
    return dayjs(job.recordTime).format('HH:mm');
  }

  const h = `${Math.floor(job.time / 100)}`;
  const m = `${job.time % 100}`;
  return `~${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
};


type JobButtonProps = {
  job: JobWithRecord,
}

export default function JobButton(props: JobButtonProps) {
  const { job } = props;

  const remove = async () => {
    await Promise.all([
      db.jobs.delete(job.id!),
      db.records.where('jobId').equals(job.id!).delete(),
    ]);
  };

  return (
    <div className="join">
      <button className={`btn ${getJobColor(job)} join-item flex-1`} onClick={() => checkIn(job.id!)}>
        {getJobIcon(job)}
        {job.name}@{getJobTime(job)}
      </button>
      <button className="btn btn-warning join-item" onClick={remove}>
        <span className="material-icons-outlined">delete</span>
      </button>
    </div>
  );
}
