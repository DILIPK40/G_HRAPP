// use server'

/**
 * @fileOverview Generates personalized employee recognition messages based on achievements and company values.
 *
 * - generateRecognitionMessage - A function that generates the recognition message.
 * - GenerateRecognitionMessageInput - The input type for the generateRecognitionMessage function.
 * - GenerateRecognitionMessageOutput - The return type for the generateRecognitionMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecognitionMessageInputSchema = z.object({
  employeeName: z.string().describe('The name of the employee to recognize.'),
  achievement: z.string().describe('A description of the employee\'s achievement.'),
  companyValue: z.string().describe('A company value that the achievement reflects.'),
});

export type GenerateRecognitionMessageInput = z.infer<
  typeof GenerateRecognitionMessageInputSchema
>;

const GenerateRecognitionMessageOutputSchema = z.object({
  recognitionMessage: z
    .string()
    .describe('A personalized recognition message for the employee.'),
});

export type GenerateRecognitionMessageOutput = z.infer<
  typeof GenerateRecognitionMessageOutputSchema
>;

export async function generateRecognitionMessage(
  input: GenerateRecognitionMessageInput
): Promise<GenerateRecognitionMessageOutput> {
  return generateRecognitionMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecognitionMessagePrompt',
  input: {schema: GenerateRecognitionMessageInputSchema},
  output: {schema: GenerateRecognitionMessageOutputSchema},
  prompt: `You are an HR assistant tasked with drafting employee recognition messages.

  Based on the employee's achievement and the company value it reflects, generate a personalized and motivational recognition message.

  Employee Name: {{{employeeName}}}
  Achievement: {{{achievement}}}
  Company Value: {{{companyValue}}}

  Recognition Message:`,
});

const generateRecognitionMessageFlow = ai.defineFlow(
  {
    name: 'generateRecognitionMessageFlow',
    inputSchema: GenerateRecognitionMessageInputSchema,
    outputSchema: GenerateRecognitionMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
