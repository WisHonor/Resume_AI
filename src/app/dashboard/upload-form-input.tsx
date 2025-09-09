"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput ({onSubmit}: UploadFormInputProps)  {
  return (
    <form className='flex flex-col gap-8 text-left text-white' onSubmit={onSubmit}>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-white' htmlFor='jobTitle'>Job Title</label>
            <Input id='jobTitle' type='text' name='jobTitle'  required />
          </div>
          <div className='md:col-span-2 flex flex-col gap-2'>
            <label className='text-sm font-medium text-white' htmlFor='jobDescription'>Job Description</label>
            <Textarea id='jobDescription' name='jobDescription' required rows={6} className='leading-relaxed' />
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:items-end gap-4'>
          <div className='flex-1 max-w-md'>
            <label htmlFor='file' className='text-sm font-medium text-white'>Resume (PDF)</label>
            <Input id='file' type="file" name='file' accept='application/pdf' required className='mt-2' />
          </div>
          <Button type='submit' className='w-full md:w-auto self-stretch md:self-auto'>Start AI Analysis</Button>
        </div>
    </form>
  )
}

