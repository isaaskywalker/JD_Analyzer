import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Check } from 'lucide-react';

const PromptGenerator = ({ keywords }) => {
  const [copied, setCopied] = useState(false);

  // 프롬프트 템플릿 생성
  const generatePrompt = () => {
    return `[포트폴리오 맞춤형 프롬프트]

1. 기술 스택 강조
${keywords.required_skills.map(skill => `- ${skill} 기술을 활용한 프로젝트 경험`).join('\n')}

2. 주요 업무 역량
${keywords.responsibilities.map(resp => `- ${resp} 관련 실무 경험`).join('\n')}

3. 필수 자격요건 매칭
${keywords.qualifications.map(qual => `- ${qual} 관련 경험/자격`).join('\n')}

4. 우대사항 부합
${keywords.preferences.map(pref => `- ${pref} 관련 경험`).join('\n')}

프로젝트 구조:
1) 문제 정의 및 목표
  - 해결하고자 했던 문제
  - 달성하고자 했던 목표

2) 해결 방안
  - 채택한 기술과 방법론
  - 적용한 아키텍처/프레임워크

3) 구현 내용
  - 핵심 기능 구현
  - 기술적 난관과 극복 방법

4) 성과 및 결과
  - 정량적 지표 (성능, 처리량 등)
  - 사용자/비즈니스 임팩트

5) 역량 강화
  - 습득한 기술/지식
  - 개선점 및 향후 발전 방향

* 각 섹션에 구체적인 수치와 예시를 포함하세요.
* 해당 직무와 연관성이 높은 프로젝트를 선정하세요.
* 팀 프로젝트의 경우 본인의 기여도를 명확히 기술하세요.`;
  };

  const prompt = generatePrompt();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>포트폴리오 프롬프트</span>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex gap-2 items-center"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                복사됨
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                복사하기
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {prompt ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {prompt}
            </pre>
          </div>
        ) : (
          <Alert>
            <AlertDescription>
              프롬프트 생성에 필요한 키워드가 부족합니다.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="mt-4 text-sm text-gray-500">
          <p>* 이 프롬프트는 제시된 직무 요구사항을 기반으로 생성되었습니다.</p>
          <p>* 실제 경험과 프로젝트에 맞게 내용을 조정하세요.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptGenerator;