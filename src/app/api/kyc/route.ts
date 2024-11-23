import { NextResponse } from 'next/server';
import { db } from '@/db';
import { kycForm } from '@/db/schema';
import { completeFormSchema } from '@/lib/validation';
import { transformFormDataToDb } from '@/lib/transformers';

export async function POST(request: Request) {
    try {
        const body = await request.json();    
        const validatedData = completeFormSchema.parse(body);
        const dbData = transformFormDataToDb(validatedData);
        const result = await db.insert(kycForm).values(dbData);

        return NextResponse.json({
            success: true,
            message: 'KYC form submitted successfully',
            data: result
        });

    } catch (error) {
        console.error('Error submitting KYC form:', error);
        return NextResponse.json(
            { success: false, message: 'Error submitting KYC form' },
            { status: 500 }
        );
    }
}