import { CompleteFormInputs } from '@/lib/validation';

export const submitKYCForm = async (formData: CompleteFormInputs) => {
  try {
    const response = await fetch('/api/kyc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit KYC form');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in submitKYCForm:', error);
    throw error;
  }
};