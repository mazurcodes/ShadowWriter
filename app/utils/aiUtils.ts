/**
 * This module provides utility functions for working with OpenAI.
 * @module ArrayUtils
 */

import openai from '@/openai/client';

type CreateCompletionProps = {
  nameOfProject: string;
  websiteContent: string;
  personsInConversation: number;
  namesOfParticipants: string[];
  lengthOfTheReview: string;
};

export async function createCompletion(data: CreateCompletionProps) {
  const prompt = createPrompt(data);
  return await openai.createCompletion({
    model: 'gpt-4-32k',
    prompt,
    max_tokens: 32000,
    temperature: 1.0,
  });
}

function createPrompt({
  nameOfProject,
  websiteContent,
  personsInConversation,
  namesOfParticipants,
  lengthOfTheReview,
}: CreateCompletionProps) {
  const names = mergePersonsNames(namesOfParticipants);

  return `Create a script for an engaging ${lengthOfTheReview} minute YouTube video about the ${nameOfProject} cryptocurrency project. The video will feature a dynamic ${personsInConversation} person(s), ${names}, exploring the contents of the project's website provided below while providing insightful commentary. They will not be visible on the screen, with only the web page being recorded.

  In this video, ${names} will take viewers on a captivating journey through the world of ${nameOfProject} project. Starting with a compelling hook, they will capture viewers' attention by highlighting a surprising statistic or sharing a thought-provoking question related to the project.
  
  Throughout the video, ${names} will enhance the viewer's experience and draw attention to specific elements on the web page. They will strike a balance between sharing essential information about the project and keeping the script engaging and accessible, avoiding overwhelming technical jargon.
  
  To illustrate the project's real-world impact, ${names} will incorporate exciting examples and use cases. They will explore how ${nameOfProject} cryptocurrency can solve common problems and bring value to various industries, making it relatable and tangible for the viewers.
  
  ${names} will foster interaction and a sense of camaraderie through their lively discussion. They will ask each other questions, share their opinions, and playfully challenge one another's viewpoints, creating an engaging and dynamic atmosphere.
  
  The script will be written in a conversational tone, allowing ${names}'s personalities to shine through. It will feel like a natural discussion between two knowledgeable individuals, making it easy for viewers to connect with the presenters and the content.
  
  Towards the end of the video, ${names} will wrap up the discussion and provide a clear call-to-action. They will encourage viewers to explore the ${nameOfProject} cryptocurrency project further, visit the website for more information, and consider joining the community or subscribing for future updates on the channel.

  Content of the project's website:
  ${websiteContent}
  `;
}

/**
 * Helper function that will merge the array names of the persons in the conversation in a single sting.
 * @param {string[]} names - The input array of names.
 */
function mergePersonsNames(names: string[]) {
  if (names.length === 1) {
    return names[0];
  }
  if (names.length === 2) {
    return names.join(' and ');
  }

  const lastPersonName = names[names.length - 1];
  const namesWithoutLastPerson = names.slice(0, names.length - 1);
  return namesWithoutLastPerson.join(', ') + ' and ' + lastPersonName;
}
