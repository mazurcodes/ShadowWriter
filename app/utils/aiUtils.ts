import openai from '@/openai/client';

export type CreateCompletionProps = {
  nameOfProject: string;
  websiteContent: string;
  namesOfParticipants: string;
  charactersCount: string;
  partSelect: 'start' | 'section' | 'end';
};

export async function createCompletion(data: CreateCompletionProps) {
  const prompt = createPrompt(data);
  return await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a professional script writer' },
      { role: 'user', content: prompt },
    ],
    temperature: 0,
  });
}

export function createPrompt({
  nameOfProject,
  websiteContent,
  namesOfParticipants,
  charactersCount,
  partSelect,
}: CreateCompletionProps) {
  const names = mergePersonsNames(namesOfParticipants);
  const personsInConversation = countPersonsInConversation(namesOfParticipants);

  if (partSelect === 'start')
    return `
  1. Create a ${charactersCount} character script for an engaging YouTube video introduction to the Crypto Ranger channel and its dynamic reviewers, ${names}. The video will set the stage for their exploration of the ${nameOfProject} cryptocurrency project's website provided below.
  2. ${names} will start with a compelling hook, capturing viewers' attention with a surprising statistic or a thought-provoking question related to the project.
  3. The script will establish a conversational tone, allowing ${names}'s personalities to shine through and making it easy for viewers to connect with the presenters and the upcoming content.
  4. There will not be visible people on the screen, with only the web page being recorded.
  
  Website content:
  ${websiteContent}`;
  if (partSelect === 'section')
    return `
  1. Create a ${charactersCount} character script for the conversation between ${personsInConversation} crypto enthusiast(s). In this script, those crypto enthusiasts named ${names} will delve into the contents of the section of the ${nameOfProject} cryptocurrency project's website provided below. 
  2. ${names} will balance sharing essential information about the project with keeping the script engaging and accessible, avoiding overwhelming technical jargon.
  3. Focus on exploring some of the key elements of the provided content showcasing the project's uniqueness and benefits.
  4. ${names} will incorporate exciting examples and use cases to illustrate the project's real-world impact, making it relatable and tangible for viewers.
  5. The script will establish a conversational tone, allowing ${names}'s personalities to shine through and making it easy for viewers to connect with the presenters and the upcoming content.
  
  Website content:
  ${websiteContent}
`;
  return `
  1. Write a ${charactersCount} character script for the conclusion of the YouTube video, where ${names} will wrap up the discussion about the ${nameOfProject} cryptocurrency project and provide a clear call-to-action.
  2. ${names} will encourage viewers to explore the project further, visit the website for more information, and consider joining the community or subscribing for future updates on the Crypto Ranger channel.
  3. It's crucial to include a disclaimer at the end, emphasizing that ${names} are not financial advisors, and the video is for informational purposes only.

  Website content:
  ${websiteContent}
  `;
}

/**
 * Helper function that will merge the array names of the persons in the conversation in a single sting.
 * @param {string[]} names - The input array of names.
 */
function mergePersonsNames(names: string) {
  if (!names) return;
  const namesArr = names.split(',');
  const namesArrTrimmed = namesArr.map((name) => name.trim());

  // If there is only one name, return it.
  if (namesArrTrimmed.length === 1) {
    return names[0];
  }

  // If there is only two names, return them in a single string.
  if (namesArrTrimmed.length === 2) {
    return namesArrTrimmed.join(' and ');
  }

  // If there are more than two names, return the last name and the names in the middle.
  const lastPersonName = namesArrTrimmed[namesArrTrimmed.length - 1];
  const namesWithoutLastPerson = namesArrTrimmed.slice(0, names.length - 1);
  return namesWithoutLastPerson.join(', ') + ' and ' + lastPersonName;
}

function countPersonsInConversation(names: string) {
  if (!names) return;
  const namesArr = names.split(',');
  return namesArr.length;
}
