import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const JDInput = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">채용공고 입력</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="채용공고 내용을 붙여넣어주세요..."
          className="min-h-[200px] p-4"
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={!text.trim()}
        >
          분석하기
        </Button>
      </form>
    </div>
  );
};

export default JDInput;