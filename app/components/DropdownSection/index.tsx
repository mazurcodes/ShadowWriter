'use client';
import { ReactNode, useState } from 'react';
import Image from 'next/image';
import ArrowIcon from '@/assets/ArrowIcon.svg';

type DropdownSectionProps = {
  children: ReactNode;
  label: string;
  open: boolean;
};

const DropdownSection = ({ children, label, open }: DropdownSectionProps) => {
  const [isDropped, setDropped] = useState(open);

  return (
    <label htmlFor="description" className="w-80">
      <div
        className="flex items-center justify-between pb-3"
        onClick={() => setDropped(!isDropped)}
      >
        <p className="text-zinc-300">{label}</p>
        <Image
          src={ArrowIcon}
          className={isDropped ? 'rotate-90' : ''}
          width={7}
          height={7}
          alt="arrow right icon"
        />
      </div>
      {isDropped && children}
    </label>
  );
};

export default DropdownSection;
