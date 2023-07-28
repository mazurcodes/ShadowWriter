'use client';
import DropdownSection from './components/DropdownSection';
import GenerateButton from './components/GenerateButton';
import TextField from './components/TextField';

export default function Home() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="flex flex-col items-center w-full h-screen bg-zinc-900 pt-8">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <TextField label="Page content" />
        <DropdownSection label="Prompt" open={false}>
          <TextField />
        </DropdownSection>
        <GenerateButton />
      </form>
    </main>
  );
}
