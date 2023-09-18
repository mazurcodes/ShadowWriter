import openai from '@/openai/client';

export type CreateCompletionProps = {
  nameOfProject: string;
  websiteContent: string;
  namesOfParticipants: string;
  lengthOfTheReview: string;
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
  lengthOfTheReview,
}: CreateCompletionProps) {
  const names = mergePersonsNames(namesOfParticipants);
  const personsInConversation = countPersonsInConversation(namesOfParticipants);

  return `Create a ${lengthOfTheReview} characters script for an engaging YouTube video about the ${nameOfProject} cryptocurrency project. The video will feature a dynamic ${personsInConversation} person(s), ${names}, exploring the contents of the project's website provided below while providing insightful commentary. There will not be visible people on the screen, with only the web page being recorded.

  In this video, ${names} will take viewers on a captivating journey through the world of ${nameOfProject} project. Starting with a compelling hook, they will capture viewers' attention by highlighting a surprising statistic or sharing a thought-provoking question related to the project.
    
  Throughout the video, ${names} will enhance the viewer's experience and draw attention to specific elements on the web page. They will balance between sharing essential information about the project and keeping the script engaging and accessible, avoiding overwhelming technical jargon.
    
  To illustrate the project's real-world impact, ${names} will incorporate exciting examples and use cases. They will explore how ${nameOfProject} cryptocurrency can solve common problems and bring value to various industries, making it relatable and tangible for the viewers.
    
  ${names} will foster interaction and a sense of camaraderie through their lively discussion. They will ask each other questions, share their opinions, and playfully challenge one another's viewpoints, creating an engaging and dynamic atmosphere.
    
  The script will be written in a conversational tone, allowing ${names}'s personalities to shine through. It will feel like a natural discussion between two knowledgeable individuals, making it easy for viewers to connect with the presenters and the content.
    
  Toward the end of the video, ${names} will wrap up the discussion and provide a clear call-to-action. They will encourage viewers to explore the ${nameOfProject} cryptocurrency project further, visit the website for more information, and consider joining the community or subscribing for future updates on the channel.
  
  At the end of the video add information that presenters, ${names} are not financial advisors and this video is for informational purposes only
  
    Content of the project's website:
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
