import React from 'react';

export default function DataUser(props) {
  return (
    <div className="data-user flex gap-2">
      <div className="relative w-8">
        <img src={props.icon} alt="img" className="absolute right-1/2 bottom-1/2 transform translate-y-1/2 translate-x-1/2" />
      </div>
      <article className=" space-y-1">
        {props.children}
        <dd className="text-sm text-white font-bold">{props.name}</dd>
        <dd className="text-xs text-gray-400">{props.desc}</dd>
      </article>
    </div>
  );
}
