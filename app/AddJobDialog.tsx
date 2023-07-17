import React from 'react';
import db from '../lib/db';

export default function AddJobDialog() {
  const [name, setName] = React.useState('');
  const [time, setTime] = React.useState('');
  const ref = React.useRef<HTMLDialogElement>(null);

  const open = React.useCallback(() => {
    setName('');
    setTime('');
    ref.current?.showModal();
  }, [ref]);

  const add = () => {
    db.jobs.add({ name, time });

    switch (Notification.permission) {
      case 'granted':
      case 'denied':
        console.log(`Notification permission: ${Notification.permission}`);
        break;

      case 'default':
      default:
        Notification.requestPermission();
        break;
    }
  };

  return (
    <>
      <button className="btn btn-primary m-4" onClick={open}>
        <span className="material-icons-outlined">add</span>
        添加任务
      </button>
      <dialog ref={ref} className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <span className="material-icons-outlined">close</span>
          </button>
          <h3 className="font-bold text-lg">添加任务</h3>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">任务名称</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">每日提醒时间</span>
            </label>
            <input
              type="time"
              className="input input-bordered w-full"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" disabled={!name || !time} onClick={add}>
              <span className="material-icons-outlined">add</span>
              添加
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
