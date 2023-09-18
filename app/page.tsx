'use client';
import { useEffect, useState } from 'react';
import DropdownSection from './components/DropdownSection';
import { useForm } from 'react-hook-form';
import { createPrompt } from './utils/aiUtils';

type ProjectFormData = {
  nameOfProject: string;
  websiteContent: string;
  namesOfParticipants: string;
  lengthOfTheReview: string;
  customPrompt?: string;
};

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [paragraphList, setParagraphList] = useState<string[]>([]);
  const [completion, setCompletion] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>();

  const formFields = watch();

  useEffect(() => {
    const prompt = createPrompt(formFields);
    setPrompt(prompt);
  }, [formFields]);

  useEffect(() => {
    const paragraphs = completion.split('\n');
    setParagraphList(paragraphs);
  }, [completion]);

  async function onSubmit(data: ProjectFormData) {
    if (!data) return;
    const completionData = await fetch('/api/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    setCompletion(await completionData.json());
  }

  return (
    <main className="flex flex-col items-center min-h-screen w-full bg-zinc-900 pt-8">
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="nameOfProject">
          <p className="text-zinc-400 pb-3 mt-10 text-sm">Project name</p>
          <input
            {...register('nameOfProject', { required: true })}
            className="w-80 bg-zinc-800 p-3 text-zinc-300 resize-none "
          />
        </label>
        <label htmlFor="namesOfParticipants">
          <p className="text-zinc-400 pb-3 mt-10 text-sm">
            Names of participants separeted by " , "
          </p>
          <input
            {...register('namesOfParticipants', { required: true })}
            placeholder="Viki, James"
            className="w-80 bg-zinc-800 p-3 text-zinc-300 resize-none "
          />
        </label>
        <label htmlFor="lengthOfTheReview">
          <p className="text-zinc-400 pb-3 mt-10 text-sm">
            Length of the review in characters.
          </p>
          <input
            {...register('lengthOfTheReview', { required: true })}
            placeholder="10"
            className="w-80 bg-zinc-800 p-3 text-zinc-300 resize-none "
          />
        </label>

        <label htmlFor="websiteContent">
          <p className="text-zinc-400 pb-3 mt-10 text-sm">Page content</p>
          <textarea
            {...register('websiteContent', { required: true })}
            className="w-80 bg-zinc-800 p-3 text-zinc-300 resize-none "
            rows={10}
          />
        </label>

        <DropdownSection label="Prompt" open={false}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-80 bg-zinc-800 p-3 text-zinc-300 resize-none "
            rows={10}
          />
        </DropdownSection>

        <button
          type="submit"
          className="bg-zinc-800 border border-zinc-500 hover:bg-zinc-700 text-zinc-300 font-bold h-12 w-80 my-10"
        >
          Generate
        </button>
      </form>
      <article className="bg-zinc-800 mt-10 w-[70%]">
        <h2 className="text-zinc-400">Script:</h2>
        {paragraphList.map((paragraph) => (
          <p className="text-zinc-300 p-3">{paragraph}</p>
        ))}
      </article>
    </main>
  );
}
