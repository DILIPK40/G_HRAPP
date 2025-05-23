'use server';

import { generateRecognitionMessage, type GenerateRecognitionMessageInput } from '@/ai/flows/generate-recognition-message';
import { z } from 'zod';

const RecognitionFormSchema = z.object({
  employeeName: z.string().min(1, 'Employee name is required.'),
  achievement: z.string().min(1, 'Achievement is required.'),
  companyValue: z.string().min(1, 'Company value is required.'),
});

export type RecognitionFormState = {
  message: string | null;
  fields?: Partial<GenerateRecognitionMessageInput>;
  issues?: string[]; // For top-level errors or combined field errors
  fieldErrors?: {
    employeeName?: string[];
    achievement?: string[];
    companyValue?: string[];
  };
  generatedMessage?: string;
  success?: boolean;
};

export async function submitRecognitionRequest(
  prevState: RecognitionFormState,
  formData: FormData
): Promise<RecognitionFormState> {
  const validatedFields = RecognitionFormSchema.safeParse({
    employeeName: formData.get('employeeName'),
    achievement: formData.get('achievement'),
    companyValue: formData.get('companyValue'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check the fields below.',
      fields: {
        employeeName: formData.get('employeeName')?.toString() ?? '',
        achievement: formData.get('achievement')?.toString() ?? '',
        companyValue: formData.get('companyValue')?.toString() ?? '',
      },
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    const input: GenerateRecognitionMessageInput = validatedFields.data;
    const result = await generateRecognitionMessage(input);
    return {
      message: 'Recognition message generated successfully!',
      generatedMessage: result.recognitionMessage,
      success: true,
    };
  } catch (error) {
    console.error('Error generating recognition message:', error);
    return {
      message: 'Failed to generate recognition message. An unexpected error occurred.',
      fields: validatedFields.data,
      success: false,
    };
  }
}
