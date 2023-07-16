import { useLiveQuery } from 'dexie-react-hooks';

export default function JobTable() {
  return (
    <table className="table">
      <thead>
        <tr>
          <td>#</td>
          <td>任务</td>
          <td>提醒时间</td>
        </tr>
      </thead>
    </table>
  );
}
